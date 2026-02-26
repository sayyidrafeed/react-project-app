import React from 'react';
import { AdminSubRole, PanitiaSubRole, UserRole } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { getNavigationMenu } from './navigationMenu';

interface BottomNavProps {
    userRole: UserRole;
    userSubRole?: PanitiaSubRole | AdminSubRole;
    onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ userRole, userSubRole, onLogout: _onLogout }) => {
    const location = useLocation();

    const currentMenu = getNavigationMenu(userRole, userSubRole);

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
                                aria-label={item.name}
                                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 ${isActive
                                    ? 'text-upn-green dark:text-upn-gold'
                                    : 'text-slate-400 dark:text-dark-text-muted hover:text-slate-600'
                                    }`}
                            >
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </Link>
                        );
                    }

                    // Item sisi kanan (Tugas, Profil)
                    if (userRole === 'mentee' && index > 2) {
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                aria-label={item.name}
                                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 ${isActive
                                    ? 'text-upn-green dark:text-upn-gold'
                                    : 'text-slate-400 dark:text-dark-text-muted hover:text-slate-600'
                                    }`}
                            >
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </Link>
                        );
                    }

                    // Other roles (admin, panitia)
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            aria-label={item.name}
                            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 ${isActive
                                ? 'text-upn-green dark:text-upn-gold'
                                : 'text-slate-400 dark:text-dark-text-muted'
                                }`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
