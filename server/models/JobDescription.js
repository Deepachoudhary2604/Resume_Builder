import mongoose from "mongoose";

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    extractedKeywords: [
      {
        type: String,
      },
    ],
    extractedSkills: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const JobDescription = mongoose.model("JobDescription", jobDescriptionSchema);
export default JobDescription;
