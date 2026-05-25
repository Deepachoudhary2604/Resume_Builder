import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../configs/config';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle, Target, TrendingUp, BookOpen, Briefcase } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';

const AtsAnalyzer = () => {
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [step, setStep] = useState(1); // 1 = fetch resume & input JD, 2 = analyzing, 3 = result
  const [atsResult, setAtsResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const resumeId = searchParams.get('id');
  const { token } = useAuth();

  useEffect(() => {
    if (!resumeId) {
      setError('No resume selected for analysis.');
      setLoading(false);
      return;
    }

    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/resumes/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResumeData(res.data.resume);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch resume.');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [resumeId, token]);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }
    
    setStep(2);
    try {
      const resumeText = JSON.stringify(resumeData);
      const res = await axios.post(`${API_BASE_URL}/api/ai/ats-score`, 
        { resumeText, jobDescription }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      let scoreData = res.data.data;
      if (typeof scoreData === 'string') {
        try { scoreData = JSON.parse(scoreData); } catch(e) {}
      }
      setAtsResult(scoreData);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume.');
      setStep(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader size="lg" text="Loading resume data..." />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader size="lg" text="Scanning with AI ATS Engine..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Analysis Failed</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
        <Button variant="primary" onClick={() => navigate('/app')}>Return to Dashboard</Button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-2xl p-8 bg-white dark:bg-slate-900 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <Link to={`/app/builder/${resumeId}`} className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Editor
            </Link>
            <Sparkles className="text-indigo-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">ATS Resume Scanner</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Paste the job description you are targeting to get an AI-powered compatibility score and personalized recommendations.</p>
          
          <textarea 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10} 
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white mb-6 resize-none focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
            placeholder="Paste Job Description here..."
          />
          
          <Button variant="primary" className="w-full py-4 text-lg font-semibold" onClick={handleAnalyze}>
            Analyze My Resume
          </Button>
        </Card>
      </div>
    );
  }

  const score = atsResult.atsScore || 0;
  const matchLevel = atsResult.matchLevel || 'Unknown';
  let scoreColor = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';
  let scoreRing = score >= 80 ? 'stroke-green-500' : score >= 60 ? 'stroke-yellow-500' : 'stroke-red-500';

  const metrics = [
    { label: 'Keyword Match', value: atsResult.keywordMatch || 0, icon: Target },
    { label: 'Skills Match', value: atsResult.skillsMatch || 0, icon: Sparkles },
    { label: 'Experience Match', value: atsResult.experienceMatch || 0, icon: Briefcase },
    { label: 'Education Match', value: atsResult.educationMatch || 0, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-6 lg:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/app/builder/${resumeId}`} className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Editor
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-500" />
              ATS Analysis Report
            </h1>
          </div>
          <Button variant="outline" onClick={() => window.print()}>Export PDF</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: OVERALL SCORE */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="p-8 flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-slate-900">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-6">Overall ATS Score</h2>
              
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" className="stroke-slate-100 dark:stroke-slate-800" />
                  <motion.circle
                    initial={{ strokeDasharray: '0 300' }}
                    animate={{ strokeDasharray: `${(score / 100) * 283} 300` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    cx="50" cy="50" r="45" fill="none" strokeWidth="8" strokeLinecap="round"
                    className={scoreRing}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${scoreColor}`}>{score}</span>
                  <span className="text-sm text-slate-400 font-medium mt-1">/ 100</span>
                </div>
              </div>
              
              <div className={`mt-6 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : score >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {matchLevel}
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-slate-900">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                Category Breakdown
              </h3>
              <div className="space-y-4">
                {metrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <m.icon className="w-4 h-4 opacity-70" />
                        {m.label}
                      </span>
                      <span className="text-slate-900 dark:text-white">{m.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="bg-indigo-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Keywords */}
            <Card className="p-6 bg-white dark:bg-slate-900">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">Keyword Analysis</h3>
              
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 mb-3 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" /> Matching Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.matchingSkills?.length ? atsResult.matchingSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-lg text-sm">
                      {skill}
                    </span>
                  )) : <p className="text-sm text-slate-400 italic">No matching skills identified.</p>}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 mb-3 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.missingKeywords?.length ? atsResult.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg text-sm">
                      {kw}
                    </span>
                  )) : <p className="text-sm text-slate-400 italic">No critical keywords missing.</p>}
                </div>
              </div>
            </Card>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white dark:bg-slate-900 border-t-4 border-t-green-500">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Core Strengths</h3>
                <ul className="space-y-3">
                  {atsResult.strengths?.map((str, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-white dark:bg-slate-900 border-t-4 border-t-orange-500">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Areas to Improve</h3>
                <ul className="space-y-3">
                  {atsResult.weaknesses?.map((wk, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Suggestions */}
            <Card className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Improvement Suggestions
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-indigo-800 dark:text-indigo-200">
                {atsResult.suggestions?.map((sug, i) => (
                  <li key={i} className="text-sm">{sug}</li>
                ))}
              </ul>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AtsAnalyzer;
