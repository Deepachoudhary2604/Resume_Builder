import express from 'express';
import {
  createResume,
  getUserResumes,
  getResumeById,
  getPublicResume,
  updateResume,
  deleteResume,
  downloadResume
} from '../controllers/resumeControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createResume);
router.get('/', protect, getUserResumes);
router.get('/:resumeId', protect, getResumeById);
router.put('/:resumeId', protect, updateResume);
router.delete('/:resumeId', protect, deleteResume);
router.get('/:resumeId/download', protect, downloadResume);
router.get('/public/:resumeId', getPublicResume);

export default router;
