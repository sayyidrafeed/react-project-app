import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { GraduationDecision, GraduationStudent, INITIAL_GRADUATIONS } from './graduationData';

const buildDecisionMessage = (decision: GraduationDecision) => {
    if (decision === 'Lulus') {
        return 'Lulus dan berhak mendapatkan Sertifikat Kelulusan Patribera.';
    }

    if (decision === 'Tidak Lulus') {
        return 'Tidak lulus. Silakan ulang tahun depan.';
    }

    return 'Belum diputuskan. Keputusan akhir menunggu admin.';
};

const getDecisionClass = (decision: GraduationDecision) => {
    if (decision === 'Lulus') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (decision === 'Tidak Lulus') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
};

const getIndicatorClass = (ratio: number) => {
    if (ratio >= 100) return 'bg-emerald-100 text-emerald-700';
    if (ratio >= 80) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
};

const AdminCertificationManagementPage: React.FC = () => {
    const [graduations, setGraduations] = useState<GraduationStudent[]>(INITIAL_GRADUATIONS);
    const navigate = useNavigate();

    const totalPassed = useMemo(
        () => graduations.filter((item) => item.decision === 'Lulus').length,
        [graduations],
    );

    const totalUndecided = useMemo(
        () => graduations.filter((item) => item.decision === 'Belum Diputuskan').length,
        [graduations],
    );

    const totalFailed = useMemo(
        () => graduations.filter((item) => item.decision === 'Tidak Lulus').length,
        [graduations],
    );

    const handleDecision = (id: string, decision: GraduationDecision) => {
        setGraduations((prev) => prev.map((item) => {
            if (item.id !== id) return item;
            return { ...item, decision };
        }));
    };

    const handleRowClick = (student: GraduationStudent) => {
        navigate(`/admin/kelulusan/${student.id}`, { state: { student } });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Manajemen Kelulusan</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Tabel menampilkan seluruh mahasiswa. Tugas menjadi indikator, keputusan lulus/tidak lulus tetap oleh admin.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-upn-gold/10 border border-upn-gold/20 text-upn-green">
                        <Award size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Admin</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <SummaryCard title="Lulus" value={totalPassed} variant="success" />
                    <SummaryCard title="Belum Diputuskan" value={totalUndecided} variant="pending" />
                    <SummaryCard title="Tidak Lulus" value={totalFailed} variant="danger" />
                </div>

                <div className="card p-4 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-base font-black text-slate-800">Daftar Kelulusan Mahasiswa</h2>
                        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Klik nama mahasiswa untuk lihat detail</p>
                    </div>

                    <div className="overflow-auto rounded-xl border border-slate-100">
                        <table className="w-full min-w-245">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-black px-4 py-3">Mahasiswa</th>
                                    <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-black px-4 py-3">Kelompok</th>
                                    <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-black px-4 py-3">Progress Tugas</th>
                                    <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-black px-4 py-3">Indikator</th>
                                    <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-black px-4 py-3">Keputusan</th>
                                    <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 font-black px-4 py-3">Aksi Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {graduations.map((student) => {
                                    const ratio = Math.round((student.completedTasks / student.totalTasks) * 100);

                                    return (
                                        <tr
                                            key={student.id}
                                            className={`border-t border-slate-100 cursor-pointer transition-colors ${student.decision === 'Lulus'
                                                ? 'bg-emerald-50/50 hover:bg-emerald-50'
                                                : student.decision === 'Tidak Lulus'
                                                    ? 'bg-red-50/50 hover:bg-red-50'
                                                    : 'hover:bg-slate-50'
                                                }`}
                                            onClick={() => handleRowClick(student)}
                                        >
                                            <td className="px-4 py-3">
                                                <p className="text-sm font-bold text-slate-800">{student.menteeName}</p>
                                                <p className="text-[11px] text-slate-500">NIM: {student.nim}</p>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{student.group}</td>
                                            <td className="px-4 py-3">
                                                <p className="text-sm font-semibold text-slate-700">{student.completedTasks}/{student.totalTasks}</p>
                                                <div className="mt-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                                    <div className="h-full bg-upn-green" style={{ width: `${ratio}%` }} />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase ${getIndicatorClass(ratio)}`}>
                                                    {ratio}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-black uppercase ${getDecisionClass(student.decision)}`}>
                                                    {student.decision}
                                                </span>
                                                <p className="text-[11px] text-slate-500 mt-1 max-w-57.5">{buildDecisionMessage(student.decision)}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDecision(student.id, 'Lulus')}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-black uppercase text-emerald-700 hover:bg-emerald-100"
                                                    >
                                                        <CheckCircle2 size={12} />
                                                        ACC
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDecision(student.id, 'Tidak Lulus')}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10px] font-black uppercase text-red-700 hover:bg-red-100"
                                                    >
                                                        <XCircle size={12} />
                                                        Tolak
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const SummaryCard: React.FC<{ title: string; value: number; variant: 'success' | 'pending' | 'danger' }> = ({ title, value, variant }) => {
    const variantClass = variant === 'success'
        ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
        : variant === 'pending'
            ? 'text-amber-700 bg-amber-50 border-amber-100'
            : 'text-red-700 bg-red-50 border-red-100';

    return (
        <div className={`card p-4 sm:p-5 border ${variantClass}`}>
            <p className="text-xs uppercase tracking-widest font-black opacity-75">{title}</p>
            <p className="text-2xl font-black mt-2">{value}</p>
        </div>
    );
};

export default AdminCertificationManagementPage;
