import React from 'react';
import { Users, Calendar, Home, FileText, BarChart3, Camera, Eye, User } from 'lucide-react';
import { UserRole } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
    userRole: UserRole;
    onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ userRole, onLogout: _onLogout }) => {
    const location = useLocation();

    const menuItems = {
        admin: [
            { name: 'Ringkasan', icon: BarChart3, path: '/admin' },
            { name: 'Manajemen User', icon: Users, path: '/admin/users' },
            { name: 'Manajemen Event', icon: Calendar, path: '/admin/events' },
            { name: 'Profil', icon: User, path: '/admin/profile' },
        ],
        mentor: [
            { name: 'Ringkasan', icon: Home, path: '/mentor' },
            { name: 'Daftar Mentee', icon: Users, path: '/mentor/group' },
            { name: 'Statistik Grup', icon: BarChart3, path: '/mentor/statistik-grup' },
            { name: 'Validasi Tugas', icon: FileText, path: '/mentor/tasks' },
            { name: 'Profil', icon: User, path: '/mentor/profile' },
        ],
        mentee: [
            { name: 'Home', icon: Home, path: '/mentee' },
            { name: 'Discover', icon: Eye, path: '/mentee/discover' },
            { name: 'Presensi', icon: Camera, path: '/mentee/presence' },
            { name: 'Tasks', icon: FileText, path: '/mentee/tasks' },
            { name: 'Profile', icon: User, path: '/mentee/profile' },
        ]
    };

    const currentMenu = menuItems[userRole];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border md:hidden z-50 safe-area-bottom">
            <div className="flex items-center justify-between h-20 px-3 relative">
                {currentMenu.map((item, index) => {
                    const isRootPath = ['/mentee', '/admin', '/mentor'].includes(item.path);
                    const isActive = location.pathname === item.path ||
                        (!isRootPath && location.pathname.startsWith(item.path));


                    // Center item (Camera/Presensi for mentee)
                    if (userRole === 'mentee' && index === 2) {
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="absolute left-1/2 -translate-x-1/2 -top-8 z-10"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-upn-green/30 transition-all duration-200 ${isActive
                                    ? 'bg-upn-green text-white scale-110'
                                    : 'bg-upn-green text-white hover:scale-105'
                                    }`}>
                                    <item.icon size={28} strokeWidth={2.5} />
                                </div>
                            </Link>
                        );
                    }

                    // Left side items (Home, Discover)
                    if (userRole === 'mentee' && index < 2) {
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 ${isActive
                                    ? 'text-upn-green dark:text-upn-gold'
                                    : 'text-slate-400 dark:text-dark-text-muted hover:text-slate-600'
                                    }`}
                            >
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className={`text-[9px] font-semibold mt-1 ${isActive ? 'text-upn-green' : ''}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    }

                    // Right side items (Tasks, Profile)
                    if (userRole === 'mentee' && index > 2) {
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 ${isActive
                                    ? 'text-upn-green dark:text-upn-gold'
                                    : 'text-slate-400 dark:text-dark-text-muted hover:text-slate-600'
                                    }`}
                            >
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className={`text-[9px] font-semibold mt-1 ${isActive ? 'text-upn-green' : ''}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    }

                    // Other roles (admin, mentor)
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 ${isActive
                                ? 'text-upn-green dark:text-upn-gold'
                                : 'text-slate-400 dark:text-dark-text-muted'
                                }`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'font-semibold' : ''}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
