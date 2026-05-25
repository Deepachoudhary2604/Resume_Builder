import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Moon, Sun, User, Mail, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50 dark:bg-[#020617] min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              Account Profile
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your personal information and preferences.</p>
          </div>
          <Link to="/app">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Profile Card */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white shadow-xl shadow-indigo-500/20">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>

            {/* Form Section */}
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  defaultValue={user?.name || ''} 
                  readOnly 
                />
                <Input 
                  label="Email Address" 
                  defaultValue={user?.email || ''} 
                  readOnly 
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-indigo-500" />
                  Security
                </h3>
                <Button variant="secondary">Change Password</Button>
              </div>
            </div>

          </div>
        </Card>

        {/* Preferences Card */}
        <Card className="p-8">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-500" />
            App Preferences
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">Theme Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark mode</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:shadow-md transition-all"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-indigo-600" />}
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Profile;
