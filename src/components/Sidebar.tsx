import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  FileText, 
  ClipboardList, 
  Clock, 
  Settings, 
  Sparkles, 
  ChevronsRight, 
  PanelLeftClose,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  appName: string;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenToolkit?: () => void;
  userSchool?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  appName = 'Answer Map AI', 
  activeNav, 
  setActiveNav,
  onOpenToolkit,
  userSchool = 'Custom Academy'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutGrid },
    { id: 'classroom', label: 'My Classroom', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: ClipboardList },
    { id: 'library', label: 'My Library', icon: Clock },
  ];

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 z-20 shrink-0 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Top Section */}
      <div className="p-4 flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <span className="bg-gradient-to-tr from-orange-500 to-amber-400 bg-clip-text text-transparent">A</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-base tracking-tight leading-none">{appName}</span>
                <span className="text-[10px] text-orange-600 font-bold tracking-wider uppercase mt-1">AI Assessment Mapping</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftClose className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* AI Teacher's Toolkit Pill */}
        {!isCollapsed ? (
          <button 
            onClick={onOpenToolkit}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-50 to-amber-50 text-slate-900 font-semibold text-xs shadow-sm hover:shadow-md hover:border-orange-500/50 transition-all group cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-3 h-3 fill-orange-400" />
            </div>
            <span>AI Teacher's Toolkit</span>
          </button>
        ) : (
          <button 
            onClick={onOpenToolkit}
            className="w-10 h-10 mx-auto rounded-full bg-slate-900 text-orange-400 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer" 
            title="AI Teacher's Toolkit"
          >
            <Sparkles className="w-4 h-4 fill-orange-400" />
          </button>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 flex flex-col gap-3 border-t border-gray-100">
        <button
          onClick={() => setActiveNav('settings')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeNav === 'settings' 
              ? 'bg-slate-900 text-white' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          {!isCollapsed && <span>Settings & Preferences</span>}
        </button>

        {/* Dynamic School Card */}
        {!isCollapsed ? (
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">{userSchool}</span>
              <span className="text-[11px] text-slate-500 truncate">Verified Institution</span>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700" title={userSchool}>
            <GraduationCap className="w-5 h-5" />
          </div>
        )}

        {/* Collapse toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mt-1 cursor-pointer"
          title="Toggle Sidebar"
        >
          <ChevronsRight className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </aside>
  );
};
