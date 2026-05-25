import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <div id="cta" className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzt1u4gsu/image/upload/v1704253303/grid-dark_x0a0p4.svg')] bg-center [mask-image:linear-gradient(180deg,transparent,white)] opacity-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl p-12 md:p-20 text-center"
        >
          {/* Animated Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-8">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">get hired?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who have already accelerated their careers using our AI-powered resume builder.
            </p>
            
            <Link to="/app">
              <button className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-950 font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Build My Resume for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <p className="mt-6 text-sm text-slate-500">No credit card required. Free forever plan available.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
