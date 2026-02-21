import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const location = useLocation();

    if (!user) return null;

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
            {/* Sidebar for Desktop */}
            <div className="hidden md:flex h-full">
                <Sidebar
                    userRole={user.role}
                    isCollapsed={isSidebarCollapsed}
                    setIsCollapsed={setIsSidebarCollapsed}
                    onLogout={logout}
                />
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-10">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="md:hidden text-slate-500 hover:text-upn-green transition-colors"
                        >
                            <span className="font-black text-lg">SIERA</span>
                        </Link>
                        <h2 className="font-bold text-slate-800 tracking-tight hidden sm:block">
                            SIERA <span className="text-upn-green uppercase text-[10px] ml-1 px-1.5 py-0.5 bg-upn-gold/10 rounded border border-upn-gold/20 leading-none">{user.role}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 md:gap-6">
                        <button className="p-2 text-slate-400 hover:text-upn-green hover:bg-slate-50 rounded-full relative transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-upn-gold border-2 border-white rounded-full scale-100 hover:scale-125 transition-transform"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                            <div className="text-right hidden lg:block">
                                <p className="text-xs font-black text-upn-green leading-none">{user.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{user.nim || 'Super Admin'}</p>
                            </div>
                            <div className="w-10 h-10 bg-upn-gold/20 border-2 border-upn-gold/10 rounded-xl flex items-center justify-center text-upn-green font-black shadow-sm overflow-hidden transform hover:rotate-3 transition-transform">
                                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow overflow-auto bg-slate-50/30 p-4 md:p-8 pb-24 md:pb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="max-w-6xl mx-auto"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Bottom Navigation for Mobile */}
                <BottomNav userRole={user.role} onLogout={logout} />
            </div>
        </div>
    );
};

export default DashboardLayout;
