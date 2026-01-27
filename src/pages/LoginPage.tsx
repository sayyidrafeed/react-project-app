import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import { Mail, Lock, LogIn, ShieldCheck, RefreshCw } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('mentee');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    // Auto-generate random credentials on mount
    useEffect(() => {
        generateCredentials();
    }, []);

    const generateCredentials = () => {
        const randomId = Math.random().toString(36).substring(2, 8);
        const randomPass = Math.random().toString(36).substring(2, 10);
        setEmail(`user_${randomId}@siera.upnvj.ac.id`);
        setPassword(`pass_${randomPass}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, role);
        navigate(`/${role}`);
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Peran Simulasi</label>
                    <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg">
                        {(['mentee', 'mentor', 'admin'] as UserRole[]).map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={`py-2 text-xs font-bold rounded-md transition-all ${role === r
                                        ? 'bg-upn-green text-upn-gold shadow-sm'
                                        : 'text-slate-500 hover:text-upn-green'
                                    }`}
                            >
                                {r.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400 italic flex items-center gap-1">
                        <ShieldCheck size={12} /> Gunakan simulasi peran untuk testing 0-backend.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email Mahasiswa / Admin"
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50"
                            value={email}
                            readOnly
                            required
                        />
                        <button
                            type="button"
                            onClick={generateCredentials}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-upn-green transition-colors"
                            title="Generate New Credentials"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type="password"
                            placeholder="Kata Sandi"
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50"
                            value={password}
                            readOnly
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                        <input type="checkbox" className="accent-upn-green" /> Ingat saya
                    </label>
                    <a href="#" className="text-upn-green font-bold hover:underline">Lupa sandi?</a>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span className="text-lg">Masuk ke SIERA</span>
                        </>
                    )}
                </button>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
