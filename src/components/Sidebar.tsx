import React from 'react';
import { LayoutDashboard, CheckSquare, Users, Calendar, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserRole } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    userRole: UserRole;
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isCollapsed, setIsCollapsed, onLogout }) => {
    const location = useLocation();

    const menuItems = {
        admin: [
            { name: 'Ringkasan', icon: LayoutDashboard, path: '/admin' },
            { name: 'Manajemen User', icon: Users, path: '/admin/users' },
            { name: 'Manajemen Event', icon: Calendar, path: '/admin/events' },
        ],
        mentor: [
            { name: 'Statistik Grup', icon: LayoutDashboard, path: '/mentor' },
            { name: 'Daftar Mentee', icon: Users, path: '/mentor/group' },
            { name: 'Validasi Tugas', icon: CheckSquare, path: '/mentor/tasks' },
        ],
        mentee: [
            { name: 'Beranda', icon: LayoutDashboard, path: '/mentee' },
            { name: 'Katalog Tugas', icon: CheckSquare, path: '/mentee/tasks' },
            { name: 'Presensi Digital', icon: Calendar, path: '/mentee/presence' },
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
                            {!isCollapsed && <span className="font-semibold text-sm truncate">{item.name}</span>}
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
