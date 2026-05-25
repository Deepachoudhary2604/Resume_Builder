import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["classic", "modern", "creative", "minimalist"],
      default: "classic",
    },
    thumbnailUrl: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    layoutConfig: {
      type: mongoose.Schema.Types.Mixed, 
      default: {},
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
