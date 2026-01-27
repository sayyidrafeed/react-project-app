import React, { useState, useTransition } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, Instagram, Twitter, ExternalLink, UserPlus, MessageCircle, X, Shield } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_STUDENTS = [
    { id: '1', name: 'Budi Santoso', faculty: 'Teknik', major: 'Informatika', interest: 'Web Development', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Siti Aminah', faculty: 'Kedokteran', major: 'Kedokteran Umum', interest: 'Public Health', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Andi Wijaya', faculty: 'Hukum', major: 'Ilmu Hukum', interest: 'Debate', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'Dewi Lestari', faculty: 'Ekonomi', major: 'Manajemen', interest: 'Entrepreneurship', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: '5', name: 'Rizky Pratama', faculty: 'FISIP', major: 'Ilmu Komunikasi', interest: 'Photography', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400' },
    { id: '6', name: 'Nina Kartika', faculty: 'Ilmu Kesehatan', major: 'Keperawatan', interest: 'Social Service', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?auto=format&fit=crop&q=80&w=400' },
];

const DiscoveryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('All');
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    const faculties = ['All', 'Teknik', 'Kedokteran', 'Hukum', 'Ekonomi', 'FISIP', 'Ilmu Kesehatan'];

    const filteredStudents = MOCK_STUDENTS.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.interest.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFaculty = selectedFaculty === 'All' || s.faculty === selectedFaculty;
        return matchesSearch && matchesFaculty;
    });

    const handleSearch = (term: string) => {
        startTransition(() => {
            setSearchTerm(term);
        });
    };

    const handleFilter = (faculty: string) => {
        startTransition(() => {
            setSelectedFaculty(faculty);
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black">Temukan Teman</h1>
                        <p className="text-slate-500 font-medium">Cari dan jalin koneksi dengan sesama mahasiswa baru UPNVJ.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full no-scrollbar">
                        {faculties.map(f => (
                            <button
                                key={f}
                                onClick={() => handleFilter(f)}
                                className={clsx(
                                    "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap",
                                    selectedFaculty === f ? "bg-upn-green text-upn-gold shadow-md" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative mb-8">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama, hobi, atau minat..."
                        className="w-full pl-16 pr-8 py-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/20 outline-none focus:ring-2 focus:ring-upn-green focus:border-transparent transition-all text-lg font-medium"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {isPending && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-upn-green"></div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map(student => (
                        <div
                            key={student.id}
                            className="card group hover:border-upn-green p-0 overflow-hidden bg-white transition-all hover:shadow-2xl hover:shadow-green-900/10 cursor-pointer"
                            onClick={() => setSelectedStudent(student)}
                        >
                            <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${student.banner})` }}>
                                <div className="w-full h-full bg-slate-900/20"></div>
                            </div>
                            <div className="px-6 pb-6 relative">
                                <div className="w-20 h-20 rounded-2xl border-4 border-white bg-white absolute -top-10 overflow-hidden shadow-lg shadow-black/10">
                                    <img src={student.avatar} className="w-full h-full object-cover" />
                                </div>
                                <div className="pt-12">
                                    <h3 className="font-black text-xl text-slate-800">{student.name}</h3>
                                    <p className="text-xs font-bold text-upn-green uppercase tracking-wider">{student.faculty}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{student.major}</p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-black text-slate-500 uppercase tracking-tighter italic">#{student.interest}</span>
                                    </div>

                                    <div className="mt-8 flex gap-3 border-t border-slate-50 pt-5">
                                        <button className="flex-grow py-3 bg-upn-green text-upn-gold rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-900 transition-colors">LIHAT PROFIL</button>
                                        <button className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:text-upn-green transition-colors"><MessageCircle size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Profile Modal */}
                {selectedStudent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${selectedStudent.banner})` }}>
                                <div className="w-full h-full bg-gradient-to-t from-black/40 p-12 flex items-end justify-between">
                                    <div className="flex gap-4">
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-colors"><Instagram size={20} /></button>
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-colors"><Twitter size={20} /></button>
                                    </div>
                                    <button onClick={() => setSelectedStudent(null)} className="p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white hover:bg-black/40 transition-colors"><X size={20} /></button>
                                </div>
                            </div>

                            <div className="px-10 pb-10 relative">
                                <div className="w-32 h-32 rounded-[2rem] border-[10px] border-white bg-white absolute -top-16 shadow-2xl">
                                    <img src={selectedStudent.avatar} className="w-full h-full object-cover rounded-[1.5rem]" />
                                </div>

                                <div className="pt-20 flex justify-between items-start">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                                            {selectedStudent.name}
                                            <Shield size={24} className="text-upn-gold" />
                                        </h2>
                                        <p className="text-sm font-black text-upn-green uppercase tracking-widest mt-1">Mahasiswa Baru @ 2026</p>
                                    </div>
                                    <div className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
                                        <p className="text-[10px] font-black text-upn-green uppercase tracking-widest">Score Bela Negara</p>
                                        <p className="text-2xl font-black text-upn-green text-center leading-none mt-1">125</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mt-10">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AKADEMIK</h4>
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-800">{selectedStudent.faculty}</p>
                                            <p className="text-xs font-bold text-slate-500">{selectedStudent.major}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MINAT & BAKAT</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 bg-upn-gold/10 border border-upn-gold/20 rounded-xl text-[10px] font-black text-upn-green uppercase">#{selectedStudent.interest}</span>
                                            <span className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase">#Music</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <button className="flex-grow py-5 btn-primary font-black text-lg flex items-center justify-center gap-3">
                                        <UserPlus size={24} /> KONEKSI BARU
                                    </button>
                                    <button className="w-20 py-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 hover:text-upn-green transition-all">
                                        <ExternalLink size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DiscoveryPage;
