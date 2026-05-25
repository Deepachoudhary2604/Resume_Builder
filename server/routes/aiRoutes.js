import express from "express";
import multer from "multer";
import { 
  parseResume, 
  optimizeResume, 
  getAtsScore,
  generateSummary,
  generateAchievements,
  recommendSkills,
  generateCareerObjective
} from "../controllers/aiControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/parse", protect, upload.single("resumePdf"), parseResume);
router.post("/optimize", protect, optimizeResume);
router.post("/summary", protect, generateSummary);
router.post("/achievements", protect, generateAchievements);
router.post("/skills", protect, recommendSkills);
router.post("/objective", protect, generateCareerObjective);
router.post("/ats-score", protect, getAtsScore);

export default router;
