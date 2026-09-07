const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
    unit: String,
    min: Number,
    max: Number,
    status: String,
    explanation: String,
  },
  {
    _id: false,
  }
);

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    report: {
      type: [resultSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);