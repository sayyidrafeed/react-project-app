import React from 'react';
import { LayoutDashboard, CheckSquare, Users, Calendar, LogOut, Home, FileText, MapPin, Users2, BarChart3 } from 'lucide-react';
import { UserRole } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
    userRole: UserRole;
    onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ userRole, onLogout }) => {
    const location = useLocation();

    const menuItems = {
        admin: [
            { name: 'Dashboard', icon: BarChart3, path: '/admin' },
            { name: 'Users', icon: Users, path: '/admin/users' },
            { name: 'Events', icon: Calendar, path: '/admin/events' },
        ],
        mentor: [
            { name: 'Stats', icon: BarChart3, path: '/mentor' },
            { name: 'Mentees', icon: Users2, path: '/mentor' },
            { name: 'Tasks', icon: CheckSquare, path: '/mentor/tasks' },
        ],
        mentee: [
            { name: 'Home', icon: Home, path: '/mentee' },
            { name: 'Tasks', icon: FileText, path: '/mentee/tasks' },
            { name: 'Presence', icon: MapPin, path: '/mentee/presence' },
            { name: 'Social', icon: Users2, path: '/mentee/social' },
        ]
    };

    const currentMenu = menuItems[userRole];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border md:hidden z-50 safe-area-bottom">
            <div className="flex items-center justify-around h-16 px-2">
                {currentMenu.map((item) => {
                    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 ${isActive
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
