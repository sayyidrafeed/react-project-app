import React from 'react';
import { Home, Eye, Camera, FileText, User, LogOut, ChevronLeft, ChevronRight, Users, BarChart3 } from 'lucide-react';
import { UserRole } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    userRole: UserRole;
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isCollapsed, setIsCollapsed, onLogout }) => {
    const location = useLocation();

    const shouldShowMentorBadge = (name: string) => {
        return userRole === 'panitia' && ['Daftar Mentee', 'Statistik Grup', 'Validasi Tugas'].includes(name);
    };

    const menuItems = {
        admin: [
            { name: 'Ringkasan', icon: Home, path: '/admin' },
            { name: 'Manajemen User', icon: User, path: '/admin/users' },
            { name: 'Manajemen Event', icon: Camera, path: '/admin/events' },
        ],
        panitia: [
            { name: 'Ringkasan', icon: Home, path: '/panitia' },
            { name: 'Daftar Mentee', icon: Users, path: '/panitia/group' },
            { name: 'Statistik Grup', icon: BarChart3, path: '/panitia/statistik-grup' },
            { name: 'Validasi Tugas', icon: FileText, path: '/panitia/tasks' },
            { name: 'Profil', icon: User, path: '/panitia/profile' },
        ],
        mentee: [
            { name: 'Beranda', icon: Home, path: '/mentee' },
            { name: 'Jelajah', icon: Eye, path: '/mentee/discover' },
            { name: 'Presensi', icon: Camera, path: '/mentee/presence' },
            { name: 'Tugas', icon: FileText, path: '/mentee/tasks' },
            { name: 'Profil', icon: User, path: '/mentee/profile' },
        ]
    };

    const currentMenu = menuItems[userRole];

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 shadow-sm transition-all duration-300 flex flex-col z-20`}>
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-upn-green rounded-lg flex items-center justify-center text-upn-gold font-bold flex-shrink-0 shadow-lg shadow-green-900/10">S</div>
                    {!isCollapsed && <span className="font-extrabold text-upn-green tracking-tight">SIERA</span>}
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 md:flex hidden"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-grow p-4 space-y-1.5 mt-4 overflow-y-auto">
                {currentMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${isActive
                                ? 'bg-upn-green text-upn-gold shadow-md'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-upn-green'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-upn-gold' : 'text-slate-400 group-hover:text-upn-green'} />
                            {!isCollapsed && (
                                <div className="flex items-center justify-between grow gap-2 min-w-0">
                                    <span className="font-semibold text-sm truncate">{item.name}</span>
                                    {shouldShowMentorBadge(item.name) && (
                                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${isActive
                                            ? 'border-upn-gold/40 bg-upn-gold/15 text-upn-gold'
                                            : 'border-upn-gold/30 bg-upn-gold/10 text-upn-green'
                                            }`}>
                                            Mentor
                                        </span>
                                    )}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-semibold"
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="text-sm">Keluar Sesi</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
