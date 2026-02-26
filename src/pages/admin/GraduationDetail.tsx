import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { GraduationStudent, INITIAL_GRADUATIONS } from './graduationData';

const buildDecisionMessage = (decision: GraduationStudent['decision']) => {
    if (decision === 'Lulus') {
        return 'Lulus dan berhak mendapatkan Sertifikat Kelulusan Patribera.';
    }

    if (decision === 'Tidak Lulus') {
        return 'Tidak lulus. Silakan ulang tahun depan.';
    }

    return 'Belum diputuskan. Keputusan akhir menunggu admin.';
};

const getDecisionClass = (decision: GraduationStudent['decision']) => {
    if (decision === 'Lulus') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (decision === 'Tidak Lulus') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
};

const GraduationDetailPage: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const location = useLocation();

    const stateStudent = (location.state as { student?: GraduationStudent } | null)?.student;
    const fallbackStudent = INITIAL_GRADUATIONS.find((item) => item.id === studentId);
    const selectedStudent = stateStudent && stateStudent.id === studentId ? stateStudent : fallbackStudent;
    const student = selectedStudent
        ? {
            ...selectedStudent,
            k3Violations: selectedStudent.k3Violations ?? [],
        }
        : undefined;
    const [decision, setDecision] = useState<GraduationStudent['decision']>(student?.decision ?? 'Belum Diputuskan');

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Detail Kelulusan Mahasiswa</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Detail indikator tugas dan keputusan kelulusan mahasiswa.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-upn-gold/10 border border-upn-gold/20 text-upn-green">
                        <Award size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Admin</span>
                    </div>
                </div>

                {!student ? (
                    <div className="card p-6 sm:p-8 text-center space-y-3">
                        <p className="text-slate-500">Data mahasiswa tidak ditemukan.</p>
                        <Link to="/admin/kelulusan" className="btn-secondary text-xs">KEMBALI KE MANEJEMEN KELULUSAN</Link>
                    </div>
                ) : (
                    <div className="card p-5 sm:p-6 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-black text-slate-800">{student.menteeName}</h2>
                                <p className="text-sm text-slate-500 mt-1">NIM: {student.nim}</p>
                                <p className="text-sm text-slate-500">Kelompok: {student.group}</p>
                            </div>
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black uppercase ${getDecisionClass(decision)}`}>
                                {decision}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <MetricCard label="Total Tugas" value={student.totalTasks} />
                            <MetricCard label="Tugas Selesai" value={student.completedTasks} />
                            <MetricCard label="Persentase" value={`${Math.round((student.completedTasks / student.totalTasks) * 100)}%`} />
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-black text-slate-800">Laporan Pelanggaran K3</p>
                                <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase ${student.k3Violations.length > 0
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                    {student.k3Violations.length > 0 ? `${student.k3Violations.length} Pelanggaran` : 'Tidak Ada Pelanggaran'}
                                </span>
                            </div>

                            {student.k3Violations.length === 0 ? (
                                <p className="text-xs text-slate-600">Mahasiswa ini tidak memiliki laporan pelanggaran dari divisi K3.</p>
                            ) : (
                                <div className="space-y-2">
                                    {student.k3Violations.map((violation) => (
                                        <div key={violation.id} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs font-black text-red-700">{violation.category}</p>
                                                <span className="text-[10px] font-black uppercase text-red-700">{violation.points} poin</span>
                                            </div>
                                            <p className="text-xs text-red-700 mt-1">{violation.description}</p>
                                            <p className="text-[10px] text-red-600 mt-1">Tanggal laporan: {violation.date}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`rounded-lg border px-3 py-2 text-sm ${getDecisionClass(decision)}`}>
                            {decision === 'Tidak Lulus' ? <XCircle size={16} className="inline mr-2" /> : <CheckCircle2 size={16} className="inline mr-2" />}
                            {buildDecisionMessage(decision)}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setDecision('Lulus')}
                                className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-emerald-700 hover:bg-emerald-100"
                            >
                                <CheckCircle2 size={14} />
                                Lulus
                            </button>
                            <button
                                type="button"
                                onClick={() => setDecision('Tidak Lulus')}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-red-700 hover:bg-red-100"
                            >
                                <XCircle size={14} />
                                Tidak Lulus
                            </button>
                            <button
                                type="button"
                                onClick={() => setDecision('Belum Diputuskan')}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-600 hover:bg-slate-100"
                            >
                                Reset
                            </button>
                        </div>

                        <div>
                            <Link to="/admin/kelulusan" className="btn-secondary text-xs">KEMBALI KE DAFTAR</Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const MetricCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-2xl font-black text-slate-800 mt-2">{value}</p>
    </div>
);

export default GraduationDetailPage;