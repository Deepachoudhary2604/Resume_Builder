import mongoose from "mongoose";

const atsReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobDescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobDescription",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    keywordMatchScore: {
      type: Number,
      default: 0,
    },
    skillsMatchScore: {
      type: Number,
      default: 0,
    },
    experienceRelevance: {
      type: Number,
      default: 0,
    },
    educationRelevance: {
      type: Number,
      default: 0,
    },
    missingKeywords: [
      {
        type: String,
      },
    ],
    matchingKeywords: [
      {
        type: String,
      },
    ],
    strengths: [
      {
        type: String,
      },
    ],
    weaknesses: [
      {
        type: String,
      },
    ],
    suggestions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const AtsReport = mongoose.model("AtsReport", atsReportSchema);
export default AtsReport;
