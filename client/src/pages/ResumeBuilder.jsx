import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, FileText, User, Briefcase, GraduationCap, 
  FolderIcon, Sparkles, Download, Save, Eye, EyeOff, LayoutTemplate
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

// Mocking imports for components that already existed
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ProjectsForm from "../components/ProjectsForm";
import SkillsForm from "../components/SkillsForm";
import EducationForm from "../components/EducationForm";
import ExperienceForm from "../components/ExperienceForm";
import PersonalInfoForm from "../components/PersonalInfoForm";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ResumePreview from "../components/ResumePreview";
import dummyResumeData from "../data/dummyResumeData";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../configs/config";
import { Loader } from "../components/ui/Loader";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useAuth();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [resumeData, setResumeData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const sections = [
    { id: "personal_info", name: "Personal Info", icon: User, component: PersonalInfoForm },
    { id: "professional_summary", name: "Summary", icon: FileText, component: ProfessionalSummaryForm },
    { id: "experience", name: "Experience", icon: Briefcase, component: ExperienceForm },
    { id: "education", name: "Education", icon: GraduationCap, component: EducationForm },
    { id: "project", name: "Projects", icon: FolderIcon, component: ProjectsForm },
    { id: "skills", name: "Skills", icon: Sparkles, component: SkillsForm },
  ];

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/resumes/${resumeId}`, { headers: { Authorization: `Bearer ${token}` } });
        setResumeData(res.data.resume || dummyResumeData[0]);
      } catch (error) {
        console.error(error);
        setResumeData(dummyResumeData[0]);
      }
    };
    fetchResume();
  }, [resumeId, token]);

  const saveResume = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_BASE_URL}/api/resumes/${resumeId}`, resumeData, { headers: { Authorization: `Bearer ${token}` } });
      setTimeout(() => setSaving(false), 800);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai/autofill`, formData, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });
      setResumeData((prev) => ({ ...prev, ...res.data.data }));
      alert("Autofill complete!");
    } catch (error) {
      alert("Autofill failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAtsScore = async () => {
    window.open(`/app/ats-analyzer?id=${resumeId}`, "_blank");
  };

  if (!resumeData) {
    return <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader size="lg" text="Loading Workspace..." /></div>;
  }

  const ActiveComponent = sections[activeSectionIndex].component;
  const ActiveIcon = sections[activeSectionIndex].icon;

  return (
    <div className="flex h-screen print:h-auto print:block bg-slate-50 dark:bg-slate-950 overflow-hidden print:overflow-visible">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-20 lg:w-64 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 print:hidden">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/app" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden lg:block font-medium">Dashboard</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 lg:px-4 space-y-2">
          {sections.map((section, idx) => {
            const SectionIcon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSectionIndex(idx)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  activeSectionIndex === idx 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <SectionIcon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden lg:block text-sm">{section.name}</span>
              </button>
            )
          })}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <Button variant="primary" className="w-full justify-center" onClick={saveResume} isLoading={saving}>
            <Save className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">Save</span>
          </Button>
          <Button variant="outline" className="w-full justify-center" onClick={() => window.print()}>
            <Download className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col xl:flex-row h-screen print:h-auto print:block relative print:overflow-visible">
        
        {/* Mobile Toggle */}
        <div className="xl:hidden h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 z-10 shadow-sm print:hidden">
          <Button variant="secondary" className="w-full max-w-sm" onClick={() => setShowPreviewMobile(!showPreviewMobile)}>
            {showPreviewMobile ? "Edit Form" : "View Preview"}
          </Button>
        </div>

        {/* EDITOR PANEL */}
        <div className={`flex-1 xl:w-1/2 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-y-auto ${showPreviewMobile ? 'hidden' : 'flex'} print:hidden`}>
          
          {/* Top Actions */}
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 lg:p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 flex flex-wrap gap-4 items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <ActiveIcon className="w-5 h-5 text-indigo-500" />
              {sections[activeSectionIndex].name}
            </h2>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors cursor-pointer border border-purple-200 dark:border-purple-800">
                <Sparkles className="w-4 h-4" />
                {isUploading ? "Uploading..." : "AI Autofill"}
                <input type="file" accept=".pdf" hidden onChange={handleFileUpload} disabled={isUploading} />
              </label>
              <Button variant="outline" size="sm" onClick={handleGetAtsScore}>
                ATS Check
              </Button>
            </div>
          </div>

          <div className="p-4 lg:p-8 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSectionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6">
                  <ActiveComponent 
                    data={resumeData[sections[activeSectionIndex].id]} 
                    onChange={(newData) => setResumeData(prev => ({ ...prev, [sections[activeSectionIndex].id]: newData }))} 
                    fullData={resumeData}
                  />
                </Card>

                {activeSectionIndex === 0 && (
                  <Card className="mt-6 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                      <LayoutTemplate className="w-5 h-5 text-indigo-500" />
                      Appearance
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <TemplateSelector selectedTemplate={resumeData.template} onChange={(t) => setResumeData(p => ({...p, template: t}))} />
                      <ColorPicker selectedColor={resumeData.accent_color} onChange={(c) => setResumeData(p => ({...p, accent_color: c}))} />
                    </div>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className={`xl:w-[55%] h-full bg-slate-200/50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto p-4 lg:p-8 ${!showPreviewMobile ? 'hidden xl:block' : 'block'} print:block print:w-full print:h-auto print:overflow-visible print:p-0 print:border-none print:bg-white`}>
          <div className="sticky top-0 bg-white dark:bg-slate-950 w-full rounded-lg shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/10 mx-auto max-w-3xl transform origin-top transition-transform print:shadow-none print:ring-0 print:overflow-visible">
             <ResumePreview 
               data={resumeData} 
               template={resumeData?.template} 
               accentColor={resumeData?.accent_color} 
             />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeBuilder;
