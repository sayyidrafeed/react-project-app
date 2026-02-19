import React from 'react';
import Navbar from './components/Navbar';

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-12 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">SIERA</h3>
                        <p className="text-sm">Sistem Informasi PATRIBERA UPN Veteran Jakarta.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Tautan Penting</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-upn-gold transition-colors">UPNVJ Official</a></li>
                            <li><a href="#" className="hover:text-upn-gold transition-colors">Panduan Maba</a></li>
                            <li><a href="#" className="hover:text-upn-gold transition-colors">Kontak Panitia</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
                        <div className="flex justify-center md:justify-start gap-4">
                            <span className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-upn-green hover:text-white cursor-pointer transition-all">IG</span>
                            <span className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-upn-green hover:text-white cursor-pointer transition-all">TW</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs">
                    &copy; 2026 UPN "Veteran" Jakarta. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
