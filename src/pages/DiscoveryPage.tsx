import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_STUDENTS = [
    { id: '1', name: 'Budi Santoso', faculty: 'Teknik', major: 'Informatika', interests: ['Web Development', 'UI/UX Design', 'Machine Learning'], avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Siti Aminah', faculty: 'Kedokteran', major: 'Kedokteran Umum', interests: ['Public Health', 'Community Service', 'Research'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Andi Wijaya', faculty: 'Hukum', major: 'Ilmu Hukum', interests: ['Debate', 'Law Practice', 'Legal Writing'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'Dewi Lestari', faculty: 'Ekonomi', major: 'Manajemen', interests: ['Entrepreneurship', 'Business Strategy', 'Finance'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: '5', name: 'Rizky Pratama', faculty: 'FISIP', major: 'Ilmu Komunikasi', interests: ['Photography', 'Content Creation', 'Social Media'], avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400' },
    { id: '6', name: 'Nina Kartika', faculty: 'Ilmu Kesehatan', major: 'Keperawatan', interests: ['Social Service', 'Healthcare', 'Community Development'], avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', banner: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?auto=format&fit=crop&q=80&w=400' },
];

const DiscoveryPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('All');
    const [isPending, startTransition] = useTransition();

    const faculties = ['All', 'Teknik', 'Kedokteran', 'Hukum', 'Ekonomi', 'FISIP', 'Ilmu Kesehatan'];

    const filteredStudents = MOCK_STUDENTS.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredStudents.map(student => (
                        <div
                            key={student.id}
                            className="rounded-2xl overflow-hidden relative h-80 bg-slate-200 cursor-pointer group hover:shadow-2xl transition-all"
                            onClick={() => navigate(`/mentee/discover/${student.id}`)}
                        >
                            {/* Background Image */}
                            <img 
                                src={student.avatar} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                alt={student.name}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            
                            {/* Student Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="font-black text-lg leading-tight">{student.name}</h3>
                                <p className="text-xs font-bold opacity-90">{student.major}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DiscoveryPage;
