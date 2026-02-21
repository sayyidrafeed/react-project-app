import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Mail, Award } from 'lucide-react';

const AdminProfilePage: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Profil Admin</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Kelola profil dan informasi administratif
                        </p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="rounded-2xl p-6 sm:p-8 bg-linear-to-br from-upn-green/10 to-upn-gold/10 dark:from-upn-green/5 dark:to-upn-gold/5 border border-upn-green/20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-upn-green/20 border-4 border-upn-green/30 rounded-2xl flex items-center justify-center text-upn-green font-black text-3xl sm:text-4xl shadow-lg">
                            {user.name[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">{user.name}</h2>
                            <p className="text-xs sm:text-sm text-upn-green font-bold uppercase tracking-widest mt-1">Administrator Aplikasi</p>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black rounded-full uppercase">
                                    Aktif
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Identifier */}
                    <div className="card p-4 sm:p-6">
                        <p className="text-[10px] font-black text-slate-400 dark:text-dark-text-muted uppercase tracking-widest mb-2">
                            ID Admin / NIM
                        </p>
                        <p className="text-lg sm:text-xl font-black text-slate-800 dark:text-dark-text">{user.nim || '-'}</p>
                    </div>

                    {/* Email */}
                    <div className="card p-4 sm:p-6 flex items-start gap-3">
                        <Mail size={20} className="text-upn-green dark:text-upn-gold mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 dark:text-dark-text-muted uppercase tracking-widest mb-1">
                                Email
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-dark-text break-all">{user.email || 'Admin'}</p>
                        </div>
                    </div>

                    {/* Role Badge */}
                    <div className="card p-4 sm:p-6 flex items-start gap-3">
                        <Award size={20} className="text-upn-green dark:text-upn-gold mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 dark:text-dark-text-muted uppercase tracking-widest mb-1">
                                Role
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-upn-green dark:text-upn-gold uppercase">{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-dark-border">
                    <button
                        onClick={logout}
                        className="w-full py-3 sm:py-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-black rounded-2xl transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut size={20} />
                        KELUAR SESI
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminProfilePage;
