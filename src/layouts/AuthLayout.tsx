import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden bg-gradient-to-br from-upn-green via-upn-green/90 to-upn-green/80">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-upn-gold opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-upn-gold opacity-10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-blue opacity-5 rounded-full blur-3xl"></div>

            {/* Main content card */}
            <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-2xl relative z-10 border border-white/20">
                <div className="text-center">
                    <Link to="/" className="inline-block hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-upn-green rounded-xl flex items-center justify-center text-upn-gold font-bold text-xl shadow-lg shadow-green-900/20">
                                S
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-upn-green dark:text-upn-gold tracking-tight">
                                SIERA
                            </h1>
                        </div>
                    </Link>
                    <p className="text-sm sm:text-base text-slate-600 font-medium tracking-wide border-t border-slate-100 pt-3 uppercase">
                        Sistem Informasi <span className="text-upn-gold font-bold">PATRIBERA 2026</span>
                    </p>
                    {title && (
                        <h2 className="mt-4 text-xl sm:text-2xl font-bold text-slate-800">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                <p className="text-xs text-white/60">
                    © 2026 UPN "Veteran" Jakarta. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
