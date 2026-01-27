import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('mentee');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, role);
        navigate(`/${role}`);
    };

    return (
        <AuthLayout
            title="Selamat Datang"
            subtitle="Masuk untuk mengakses platform SIERA"
        >
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Role Selection */}
                <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                        Pilih Peran (Simulasi)
                    </label>
                    <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-dark-border rounded-lg">
                        {(['mentee', 'mentor', 'admin'] as UserRole[]).map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={`py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold rounded-md transition-all ${role === r
                                    ? 'bg-upn-green text-upn-gold shadow-sm'
                                    : 'text-slate-500 dark:text-dark-text-muted hover:text-upn-green dark:hover:text-upn-gold'
                                    }`}
                            >
                                {r.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400 dark:text-dark-text-muted italic flex items-center gap-1">
                        <ShieldCheck size={12} /> Gunakan simulasi peran untuk testing (0-backend)
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 sm:top-3.5 text-slate-400 dark:text-dark-text-muted" size={18} />
                        <input
                            type="email"
                            placeholder="Email Mahasiswa / Admin"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 sm:top-3.5 text-slate-400 dark:text-dark-text-muted" size={18} />
                        <input
                            type="password"
                            placeholder="Kata Sandi"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-slate-500 dark:text-dark-text-muted cursor-pointer">
                        <input type="checkbox" className="accent-upn-green w-4 h-4" /> Ingat saya
                    </label>
                    <a href="#" className="text-upn-green dark:text-upn-gold font-bold hover:underline">Lupa sandi?</a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3.5 sm:py-4 flex items-center justify-center gap-2 group disabled:opacity-70 text-sm sm:text-base"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span>Masuk ke SIERA</span>
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
