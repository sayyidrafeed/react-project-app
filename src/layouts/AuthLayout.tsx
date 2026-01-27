import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-upn-green flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-upn-gold opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-upn-gold opacity-10 rounded-full -ml-32 -mb-32"></div>

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl relative z-10 border border-white/20">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-upn-green">SIERA</h2>
                    <p className="mt-2 text-sm text-slate-500 font-medium tracking-wide border-t border-slate-100 pt-2 uppercase">
                        Sistem Informasi <span className="text-upn-gold font-bold">PATRIBERA</span>
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
