import Resume from "../models/Resume.js";

/* ================= CREATE RESUME ================= */
export const createResume = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, template, accent_color } = req.body;

    const resume = await Resume.create({
      userId,
      title: title || "My Resume",
      template: template || "classic",
      accent_color: accent_color || "#22c55e",
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("Create resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL USER RESUMES ================= */
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Resumes retrieved successfully",
      resumes,
    });
  } catch (error) {
    console.error("Get resumes error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SINGLE RESUME BY ID ================= */
export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if user owns the resume or if it's public
    if (resume.userId.toString() !== userId && !resume.public) {
      return res.status(403).json({ message: "Not authorized to view this resume" });
    }

    res.status(200).json({
      message: "Resume retrieved successfully",
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET PUBLIC RESUME ================= */
export const getPublicResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (!resume.public) {
      return res.status(403).json({ message: "This resume is not public" });
    }

    res.status(200).json({
      message: "Resume retrieved successfully",
      resume,
    });
  } catch (error) {
    console.error("Get public resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE RESUME ================= */
export const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;
    const {
      title,
      template,
      accent_color,
      public: isPublic,
      professional_summary,
      skills,
      personal_info,
      experience,
      project,
      education,
    } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this resume" });
    }

    // Update fields
    if (title !== undefined) resume.title = title;
    if (template !== undefined) resume.template = template;
    if (accent_color !== undefined) resume.accent_color = accent_color;
    if (isPublic !== undefined) resume.public = isPublic;
    if (professional_summary !== undefined) resume.professional_summary = professional_summary;
    if (skills !== undefined) resume.skills = skills;
    if (personal_info !== undefined) resume.personal_info = { ...resume.personal_info, ...personal_info };
    if (experience !== undefined) resume.experience = experience;
    if (project !== undefined) resume.project = project;
    if (education !== undefined) resume.education = education;

    await resume.save();

    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE RESUME ================= */
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this resume" });
    }

    await Resume.findByIdAndDelete(resumeId);

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DOWNLOAD RESUME AS PDF ================= */
export const downloadResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to download this resume" });
    }

    // For now, return the resume data - frontend will handle PDF generation
    res.status(200).json({
      message: "Resume data for download",
      resume,
    });
  } catch (error) {
    console.error("Download resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
