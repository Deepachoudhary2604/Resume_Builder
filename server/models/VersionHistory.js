import mongoose from "mongoose";

const versionHistorySchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    versionNumber: {
      type: Number,
      required: true,
    },
    changesDescription: {
      type: String,
      default: "Auto-saved version",
    },
    dataSnapshot: {
      type: mongoose.Schema.Types.Mixed, // The entire resume data at this point in time
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure that a resume can only have unique version numbers
versionHistorySchema.index({ resumeId: 1, versionNumber: 1 }, { unique: true });

const VersionHistory = mongoose.model("VersionHistory", versionHistorySchema);
export default VersionHistory;
