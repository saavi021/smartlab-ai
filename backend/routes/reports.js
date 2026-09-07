const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");

const Report = require("../models/Report");

const parseReport = require("../services/parser");
const generateExplanation = require("../services/ai");

const authenticateToken = require("../middleware/auth");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post(
  "/upload",
  authenticateToken,
  upload.single("report"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No report uploaded.",
        });
      }

      const pdfBuffer = fs.readFileSync(req.file.path);

      const parser = new PDFParse({
        data: pdfBuffer,
      });

      const result = await parser.getText();

      const parsedReport = parseReport(result.text);

      const analyzedReport =
        generateExplanation(parsedReport);

      await parser.destroy();

      const savedReport = await Report.create({
        userId: new mongoose.Types.ObjectId(req.user.userId),
        filename: req.file.originalname,
        size: req.file.size,
        report: analyzedReport,
      });

      res.status(200).json({
        message: "Report analyzed and saved successfully.",
        reportId: savedReport._id.toString(),
        filename: savedReport.filename,
        size: savedReport.size,
        report: savedReport.report,
      });
    } catch (error) {
      console.error("Report upload error:", error);

      res.status(500).json({
        message: "Failed to process report.",
      });
    }
  }
);

router.get(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      const reports = await Report.find({
        userId: req.user.userId,
      })
        .sort({ createdAt: -1 })
        .select("filename size report createdAt");

      res.json({
        reports,
      });
    } catch (error) {
      console.error("History error:", error);

      res.status(500).json({
        message: "Unable to load report history.",
      });
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const report = await Report.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!report) {
        return res.status(404).json({
          message: "Report not found.",
        });
      }

      res.json({
        report,
      });
    } catch (error) {
      console.error("Report lookup error:", error);

      res.status(500).json({
        message: "Unable to load report.",
      });
    }
  }
);

module.exports = router;