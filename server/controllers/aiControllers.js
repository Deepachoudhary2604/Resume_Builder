import OpenAI from "openai";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

let _openai = null;
let _openaiInitAttempted = false;

const getOpenAI = () => {
  if (_openaiInitAttempted) return _openai;
  _openaiInitAttempted = true;
  
  try {
    if (process.env.OPENAI_API_KEY) {
      _openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      });
      console.log("OpenAI client initialized successfully.");
    } else {
      console.warn("OPENAI_API_KEY is not defined in process.env.");
    }
  } catch (error) {
    console.warn("OpenAI API key not configured or invalid.", error.message);
  }
  return _openai;
};

export const parseResume = async (req, res) => {
  try {
    console.log("parseResume hit", req.file ? "File found" : "No file", req.file?.fieldname);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const mimetype = req.file.mimetype;
    let textContent = "";

    if (mimetype === "application/pdf") {
      const data = await pdfParse(fileBuffer);
      textContent = data.text;
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({ buffer: fileBuffer });
      textContent = data.value;
    } else {
      return res.status(400).json({ message: "Unsupported file format. Use PDF or DOCX." });
    }

    const openai = getOpenAI();
    if (!openai) {
      console.warn("OpenAI not configured, returning simulated parsed data");
      return res.status(200).json({
        message: "Simulated parse success",
        data: {
          personal_info: { first_name: "John", last_name: "Doe", email: "john@example.com", phone: "123-456-7890" },
          professional_summary: "A highly motivated professional...",
          skills: ["JavaScript", "React"],
          experience: [],
          education: []
        }
      });
    }

    const prompt = `
    Extract the following details from this resume text and format it as a valid JSON object.
    Do not include any markdown formatting, just return raw JSON.
    Fields to extract:
    - personal_info: { first_name, last_name, email, phone, linkedin, github }
    - professional_summary: string
    - skills: array of strings
    - experience: array of objects with { title, company, start_date, end_date, description }
    - education: array of objects with { degree, institution, year }
    
    Resume Text:
    ${textContent}
    `;

    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const aiContent = response.choices[0].message.content;
    let parsedData;
    try {
      parsedData = JSON.parse(aiContent);
    } catch (err) {
      const cleaned = aiContent.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleaned);
    }

    res.status(200).json({
      message: "Resume parsed successfully",
      data: parsedData,
    });
  } catch (error) {
    console.error("Parse resume error:", error);
    res.status(500).json({ message: "Error parsing resume: " + (error.message || error) });
  }
};

export const optimizeResume = async (req, res) => {
  try {
    const openai = getOpenAI();
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    if (!openai) {
      return res.status(200).json({ message: "Simulated", optimizedContent: `[Optimized]: ${content}` });
    }

    const prompt = `Rewrite and optimize the following resume bullet point to make it more professional and ATS-friendly. Use strong action verbs.\n\nOriginal:\n${content}`;
    const response = await openai.chat.completions.create({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.5 });

    res.status(200).json({ message: "Success", optimizedContent: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("AI Optimize Error:", error);
    res.status(500).json({ message: "Error optimizing content" });
  }
};

export const generateSummary = async (req, res) => {
  try {
    const openai = getOpenAI();
    const { role, experience, skills } = req.body;
    if (!openai) return res.status(200).json({ summary: "A dedicated professional." });

    const prompt = `Generate a professional resume summary (3-4 lines) for a ${role} with ${experience} years of experience and skills in ${skills.join(", ")}.`;
    const response = await openai.chat.completions.create({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.7 });

    res.status(200).json({ summary: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("AI Summary Error:", error);
    res.status(500).json({ message: "Error generating summary" });
  }
};

export const generateAchievements = async (req, res) => {
  try {
    const openai = getOpenAI();
    const { role, responsibilities } = req.body;
    if (!openai) return res.status(200).json({ achievements: ["Increased efficiency by 20%."] });

    const prompt = `Turn these responsibilities into 3 strong, metric-driven achievements for a ${role}:\n${responsibilities}`;
    const response = await openai.chat.completions.create({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.7 });

    res.status(200).json({ achievements: response.choices[0].message.content.split("\n").filter(a => a.trim() !== "") });
  } catch (error) {
    console.error("AI Achievements Error:", error);
    res.status(500).json({ message: "Error generating achievements" });
  }
};

export const recommendSkills = async (req, res) => {
  try {
    const openai = getOpenAI();
    const { role, currentSkills } = req.body;
    if (!openai) return res.status(200).json({ skills: ["Leadership", "Communication"] });

    const prompt = `Given the role ${role} and current skills: ${currentSkills.join(", ")}, recommend 5-10 additional in-demand skills for a resume. Return as a comma-separated list.`;
    const response = await openai.chat.completions.create({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.5 });

    const recommended = response.choices[0].message.content.split(",").map(s => s.trim());
    res.status(200).json({ skills: recommended });
  } catch (error) {
    console.error("AI Skills Error:", error);
    res.status(500).json({ message: "Error recommending skills" });
  }
};

export const generateCareerObjective = async (req, res) => {
  try {
    const openai = getOpenAI();
    const { targetRole, background } = req.body;
    if (!openai) return res.status(200).json({ objective: "Looking for a challenging role." });

    const prompt = `Write a short, compelling career objective for someone targeting a ${targetRole} role, with a background in ${background}.`;
    const response = await openai.chat.completions.create({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.7 });

    res.status(200).json({ objective: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("AI Objective Error:", error);
    res.status(500).json({ message: "Error generating objective" });
  }
};

export const getAtsScore = async (req, res) => {
  try {
    const openai = getOpenAI();
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) return res.status(400).json({ message: "Missing data" });

    if (!openai) {
      return res.status(200).json({
        data: {
          atsScore: 85,
          matchLevel: "Strong Match",
          keywordMatch: 80,
          skillsMatch: 90,
          experienceMatch: 80,
          educationMatch: 100,
          projectMatch: 80,
          matchingKeywords: ["React", "Node.js"],
          missingKeywords: ["AWS", "Docker"],
          matchingSkills: ["JavaScript", "HTML/CSS"],
          missingSkills: ["Kubernetes", "GraphQL"],
          strengths: ["Strong frontend experience", "Good project portfolio"],
          weaknesses: ["Missing cloud deployment experience"],
          suggestions: ["Consider adding AWS or Docker to your skills"],
          summary: "This is a simulated response because OpenAI is not configured."
        }
      });
    }

    const prompt = `You are an advanced Applicant Tracking System (ATS) and Senior Technical Recruiter.

Your task is to analyze a candidate's resume against a given job description and generate a realistic ATS compatibility report.

Resume:
${resumeText}

Job Description:
${jobDescription}

Instructions:
1. Extract the most important keywords, skills, technologies, qualifications, and responsibilities from the Job Description.
2. Compare them against the Resume.
3. Identify Matching and Missing Skills, Technologies, and Qualifications.
4. Evaluate Relevance of Skills, Experience, Education, Projects, and Keywords.
5. Generate an ATS score (0-100) using weights: Keyword (40%), Skills (25%), Experience (15%), Education (10%), Project (10%).
6. Rules: 90-100=Excellent, 80-89=Strong, 70-79=Good, 60-69=Average, <60=Weak.
7. Provide actionable recommendations.
8. Do not invent details not in the resume.
9. Return ONLY valid JSON exactly in this format:
{
  "atsScore": 0,
  "matchLevel": "",
  "keywordMatch": 0,
  "skillsMatch": 0,
  "experienceMatch": 0,
  "educationMatch": 0,
  "projectMatch": 0,
  "matchingKeywords": [],
  "missingKeywords": [],
  "matchingSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "summary": ""
}`;
    const response = await openai.chat.completions.create({ 
      model: "llama-3.1-8b-instant", 
      messages: [{ role: "user", content: prompt }], 
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const aiContent = response.choices[0].message.content;
    let result;
    try {
      result = JSON.parse(aiContent.replace(/```json/g, "").replace(/```/g, "").trim());
    } catch (e) {
      console.warn("Failed to parse ATS response", aiContent);
      result = { 
        atsScore: 70, 
        matchLevel: "Good Match", 
        missingSkills: ["Unable to parse AI response"], 
        suggestions: ["AI returned malformed JSON"],
        missingKeywords: [], matchingKeywords: [], matchingSkills: [], strengths: [], weaknesses: []
      };
    }

    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    console.error("ATS Score Error: ", error);
    res.status(500).json({ message: "Error ATS score: " + (error.message || error) });
  }
};
