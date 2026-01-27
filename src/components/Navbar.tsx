import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl font-black tracking-tighter text-upn-green drop-shadow-sm">SIERA</span>
                            <span className="text-upn-green text-[10px] font-bold px-2 py-1 bg-upn-gold/20 border border-upn-gold/50 rounded-full tracking-widest backdrop-blur-sm">PATRIBERA</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/" className="text-slate-700 hover:text-upn-green font-medium transition-colors text-sm uppercase tracking-wide">Beranda</a>
                        <a href="/jadwal" className="text-slate-700 hover:text-upn-green font-medium transition-colors text-sm uppercase tracking-wide">Jadwal</a>
                        <a href="/tentang" className="text-slate-700 hover:text-upn-green font-medium transition-colors text-sm uppercase tracking-wide">Tentang</a>
                        <button className="bg-upn-green text-white px-6 py-2.5 rounded-full font-bold hover:bg-green-900 transition-all transform hover:scale-105 shadow-lg shadow-green-900/20 text-sm">
                            Masuk Portal
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 p-2 hover:bg-white/20 rounded-lg transition-colors">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 absolute w-full shadow-2xl">
                    <a href="/" className="block py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">Beranda</a>
                    <a href="/jadwal" className="block py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">Jadwal</a>
                    <a href="/tentang" className="block py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-800 font-medium">Tentang</a>
                    <div className="pt-4 mt-2 border-t border-slate-100">
                        <button className="w-full bg-upn-green text-white py-3 rounded-xl font-bold shadow-lg shadow-upn-green/30">
                            Masuk Portal
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
