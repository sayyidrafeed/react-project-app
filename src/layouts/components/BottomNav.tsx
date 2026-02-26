import React from 'react';
import { Users, Calendar, Home, FileText, BarChart3, Camera, Eye, User, ShieldAlert, ClipboardList, Award } from 'lucide-react';
import { AdminSubRole, PanitiaSubRole, UserRole } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
    userRole: UserRole;
    userSubRole?: PanitiaSubRole | AdminSubRole;
    onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ userRole, userSubRole, onLogout: _onLogout }) => {
    const location = useLocation();

    const menuItems = {
        admin: [
            { name: 'Ringkasan', icon: BarChart3, path: '/admin' },
            { name: 'Manajemen User', icon: Users, path: '/admin/users' },
            { name: 'Manajemen Event', icon: Calendar, path: '/admin/events' },
            { name: 'Lulus', icon: Award, path: '/admin/kelulusan' },
            { name: 'Profil', icon: User, path: '/admin/profile' },
        ],
        panitia: [
            { name: 'Ringkasan', icon: Home, path: '/panitia' },
            { name: 'Daftar Mentee', icon: Users, path: '/panitia/group' },
            { name: 'Statistik Grup', icon: BarChart3, path: '/panitia/statistik-grup' },
            { name: 'Validasi Tugas', icon: FileText, path: '/panitia/tasks' },
            { name: 'PPM', icon: ClipboardList, path: '/panitia/ppm' },
            { name: 'Keamanan', icon: ShieldAlert, path: '/panitia/k3' },
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

    const getCurrentMenu = () => {
        if (userRole === 'panitia') {
            if (userSubRole === 'k3') {
                return [
                    { name: 'Keamanan', icon: ShieldAlert, path: '/panitia/k3' },
                    { name: 'Profil', icon: User, path: '/panitia/profile' },
                ];
            }

            if (userSubRole === 'ppm') {
                return [
                    { name: 'PPM', icon: ClipboardList, path: '/panitia/ppm' },
                    { name: 'Profil', icon: User, path: '/panitia/profile' },
                ];
            }

            return menuItems.panitia;
        }

        if (userRole === 'admin') {
            if (userSubRole === 'project-officer') {
                return [
                    { name: 'Event', icon: Calendar, path: '/admin/events' },
                    { name: 'Profil', icon: User, path: '/admin/profile' },
                ];
            }

            if (userSubRole === 'univ-kemahasiswaan') {
                return [
                    { name: 'Lulus', icon: Award, path: '/admin/kelulusan' },
                    { name: 'Profil', icon: User, path: '/admin/profile' },
                ];
            }

            return menuItems.admin;
        }

        return menuItems.mentee;
    };

    const currentMenu = getCurrentMenu();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border md:hidden z-50 safe-area-bottom">
            <div className="flex items-center justify-between h-20 px-3 relative">
                {currentMenu.map((item, index) => {
                    const isRootPath = ['/mentee', '/admin', '/panitia'].includes(item.path);
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

                    // Item sisi kiri (Beranda, Jelajah)
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

                    // Item sisi kanan (Tugas, Profil)
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

                    // Other roles (admin, panitia)
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
