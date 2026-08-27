import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  HelpCircle, 
  Bell, 
  Sparkles, 
  ChevronDown, 
  CheckCircle, 
  Info,
  LogOut,
  User as UserIcon,
  LogIn
} from 'lucide-react';
import { APP_NAME } from '../constants';

interface HeaderProps {
  onBackClick?: () => void;
  showBack?: boolean;
  user: any;
  onOpenAuth: () => void;
  onOpenToolkit: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onBackClick, 
  showBack = true, 
  user,
  onOpenAuth,
  onOpenToolkit,
  onLogout,
  onOpenSettings
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 z-30 relative">
      {/* Left Navigation */}
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={onBackClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-all shadow-2xs"
            title="Go back to Upload"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload</span>
          </button>
        )}
        
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
          <FileText className="w-4 h-4 text-orange-600" />
          <span>{APP_NAME} Workspace</span>
        </div>
      </div>

      {/* Right User & Tools Section */}
      <div className="flex items-center gap-3">
        {/* Help Button */}
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" 
          title="Help & SRS Guide"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notifications Button */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative" 
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Sparkle AI Assistant */}
        <button 
          onClick={onOpenToolkit}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors" 
          title="Launch AI Teacher Toolkit"
        >
          <Sparkles className="w-5 h-5 fill-orange-500 text-orange-500" />
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1"></div>

        {/* User Profile Menu */}
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-200 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name?.[0] || 'U'
                )}
              </div>
              <span className="font-bold text-slate-800 text-sm">{user.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl mb-2">
                  <span className="font-extrabold text-slate-900 block text-xs">{user.name}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{user.email}</span>
                  <span className="text-[10px] text-orange-600 font-bold block mt-1">{user.role}</span>
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); onOpenSettings(); }}
                  className="flex items-center gap-2.5 w-full p-2.5 hover:bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </button>
                <button
                  onClick={() => { setShowUserMenu(false); onOpenAuth(); }}
                  className="flex items-center gap-2.5 w-full p-2.5 hover:bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  <span>Switch Account</span>
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={() => { setShowUserMenu(false); onLogout(); }}
                  className="flex items-center gap-2.5 w-full p-2.5 hover:bg-red-50 text-red-600 rounded-xl font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-full shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>

      {/* Notifications Popover */}
      {showNotifications && (
        <div className="absolute top-16 right-16 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="font-bold text-sm text-slate-900">Notifications</span>
            <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">2 New</span>
          </div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Class 10 Biology Unit Test mapped</p>
                <span className="text-[10px] text-slate-400">13 Questions • 100% Bounding Accuracy</span>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Out-of-order answer detected</p>
                <span className="text-[10px] text-slate-400">Question 5 answer found on page 2</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help SRS Guide Modal */}
      {showHelp && (
        <div className="absolute top-16 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-600" />
              {APP_NAME} User Guide
            </span>
            <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong>1. Upload Files:</strong> Drag & drop PDF or Image question papers & student answer sheets.</p>
            <p><strong>2. Side-by-Side Review:</strong> Select any question on the left to highlight its exact handwritten region on the right.</p>
            <p><strong>3. Out-of-Order Answers:</strong> Automatically mapped across pages even if student answered out of sequence.</p>
            <p><strong>4. Interactive Bounding Boxes:</strong> Click green boxes to select question cards, or use "✏️ Draw Box" mode to create custom regions.</p>
          </div>
        </div>
      )}
    </header>
  );
};
