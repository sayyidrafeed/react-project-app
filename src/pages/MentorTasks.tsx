import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { MOCK_MENTEES } from '../data/mockData';
import { StatsCard } from '../components/StatsCard';
import { CheckCircle2, XCircle, Clock, Eye, Filter, Search, UserCheck, FileText } from 'lucide-react';
import { clsx } from 'clsx';

const MentorTasks: React.FC = () => {
    const [mentees, setMentees] = useState(MOCK_MENTEES);
    const [selectedMentee, setSelectedMentee] = useState<any>(null);
    const [grade, setGrade] = useState<number>(0);

    const handleUpdateStatus = (id: string, gradeValue: number) => {
        setMentees(mentees.map(m => m.id === id ? { ...m, averageGrade: gradeValue } : m));
        setSelectedMentee(null);
        setGrade(0);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-black">Validasi Tugas</h1>
                    <p className="text-slate-500 font-medium italic">Review dan berikan penilaian untuk tugas Mahasiswa Baru.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Belum Dinilai" value={mentees.filter(m => m.averageGrade === 0).length} icon={Clock} variant="gold" />
                    <StatsCard title="Sudah Selesai" value={mentees.filter(m => m.averageGrade > 0).length} icon={CheckCircle2} />
                    <StatsCard title="Rata-rata Grade" value={`${Math.round(mentees.reduce((acc, m) => acc + m.averageGrade, 0) / mentees.length)}%`} icon={XCircle} />
                </div>

                <div className="card bg-white p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full max-w-md">
                            <Search size={18} className="text-slate-400" />
                            <input placeholder="Cari Nama / NIM Mentee..." className="bg-transparent text-sm outline-none w-full" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-xs font-black text-slate-500 hover:text-upn-green">
                            <Filter size={16} /> FILTER STATUS
                        </button>
                    </div>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <th className="px-8 py-4">Nama Mentee</th>
                                <th className="px-4 py-4">Program Studi</th>
                                <th className="px-4 py-4">Tugas Terakhir</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mentees.map((mentee) => (
                                <tr key={mentee.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="font-bold text-slate-800">{mentee.name}</p>
                                        <p className="text-[10px] font-medium text-slate-400">{mentee.nim}</p>
                                    </td>
                                    <td className="px-4 py-5 text-sm font-medium text-slate-600">{mentee.major}</td>
                                    <td className="px-4 py-5 font-bold text-xs text-upn-green">Resume PKKMB Day 1</td>
                                    <td className="px-4 py-5">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                                            mentee.averageGrade === 0 ? "bg-upn-gold/5 text-upn-gold border-upn-gold/20" : "bg-upn-green/5 text-upn-green border-upn-green/20"
                                        )}>
                                            {mentee.averageGrade === 0 ? 'PENDING' : `GRADE: ${mentee.averageGrade}`}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => setSelectedMentee(mentee)}
                                            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-upn-green transition-all"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Validation Modal */}
                {selectedMentee && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedMentee(null)} />
                        <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
                            <div className="h-48 bg-upn-green p-8 flex items-end justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-upn-gold">{selectedMentee.name}</h2>
                                    <p className="text-green-50/70 font-bold uppercase text-[10px] tracking-widest mt-1">Reviewing: Resume PKKMB Day 1</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdateStatus(selectedMentee.id, 0)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-red-500 transition-colors"><XCircle size={20} /></button>
                                    <button onClick={() => handleUpdateStatus(selectedMentee.id, grade)} className="px-6 h-10 bg-upn-gold text-upn-green font-black text-xs rounded-xl hover:bg-yellow-400 transition-colors flex items-center gap-2 tracking-widest">SET GRADE <UserCheck size={18} /></button>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
                                    <FileText size={48} className="mb-2" />
                                    <p className="font-bold text-sm">Pratinjau Dokumen (PDF)</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nilai Tugas (0-100)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={grade}
                                        onChange={(e) => setGrade(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-2xl font-black text-center focus:ring-2 focus:ring-upn-green outline-none"
                                        placeholder="0-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MentorTasks;
