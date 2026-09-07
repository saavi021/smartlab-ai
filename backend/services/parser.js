function getStatus(value, min, max) {
    if (value < min) {
      return "Low";
    }
  
    if (value > max) {
      return "High";
    }
  
    return "Normal";
  }
  
  function parseReport(text) {
    const report = [];
  
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  
    for (const line of lines) {
      let match;
  
      // Hemoglobin
      match = line.match(
        /^Hemoglobin\s+([0-9.]+)\s+g\/dL\s+([0-9.]+)\s*[-–]\s*([0-9.]+)$/i
      );
  
      if (match) {
        const value = Number(match[1]);
        const min = Number(match[2]);
        const max = Number(match[3]);
  
        report.push({
          name: "Hemoglobin",
          value,
          unit: "g/dL",
          min,
          max,
          status: getStatus(value, min, max),
        });
  
        continue;
      }
  
      // White Blood Cell Count
      match = line.match(
        /^White Blood Cell Count\s+([0-9.]+)\s+cells\/uL\s+([0-9.]+)\s*[-–]\s*([0-9.]+)$/i
      );
  
      if (match) {
        const value = Number(match[1]);
        const min = Number(match[2]);
        const max = Number(match[3]);
  
        report.push({
          name: "White Blood Cell Count",
          value,
          unit: "cells/uL",
          min,
          max,
          status: getStatus(value, min, max),
        });
  
        continue;
      }
  
      // Platelet Count
      match = line.match(
        /^Platelet Count\s+([0-9.]+)\s+cells\/uL\s+([0-9.]+)\s*[-–]\s*([0-9.]+)$/i
      );
  
      if (match) {
        const value = Number(match[1]);
        const min = Number(match[2]);
        const max = Number(match[3]);
  
        report.push({
          name: "Platelet Count",
          value,
          unit: "cells/uL",
          min,
          max,
          status: getStatus(value, min, max),
        });
  
        continue;
      }
  
      // Fasting Glucose
      match = line.match(
        /^Glucose \(Fasting\)\s+([0-9.]+)\s+mg\/dL\s+([0-9.]+)\s*[-–]\s*([0-9.]+)$/i
      );
  
      if (match) {
        const value = Number(match[1]);
        const min = Number(match[2]);
        const max = Number(match[3]);
  
        report.push({
          name: "Glucose (Fasting)",
          value,
          unit: "mg/dL",
          min,
          max,
          status: getStatus(value, min, max),
        });
  
        continue;
      }
  
      // Total Cholesterol
      match = line.match(
        /^Total Cholesterol\s+([0-9.]+)\s+mg\/dL\s+Below\s+([0-9.]+)$/i
      );
  
      if (match) {
        const value = Number(match[1]);
        const max = Number(match[2]);
  
        report.push({
          name: "Total Cholesterol",
          value,
          unit: "mg/dL",
          min: 0,
          max,
          status: value > max ? "High" : "Normal",
        });
  
        continue;
      }
  
      // Vitamin D
      match = line.match(
        /^Vitamin D\s+([0-9.]+)\s+ng\/mL\s+([0-9.]+)\s*[-–]\s*([0-9.]+)$/i
      );
  
      if (match) {
        const value = Number(match[1]);
        const min = Number(match[2]);
        const max = Number(match[3]);
  
        report.push({
          name: "Vitamin D",
          value,
          unit: "ng/mL",
          min,
          max,
          status: getStatus(value, min, max),
        });
      }
    }
  
    return report;
  }
  
  module.exports = parseReport;