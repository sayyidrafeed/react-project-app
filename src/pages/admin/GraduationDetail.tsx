import React from 'react';
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
    const student = stateStudent && stateStudent.id === studentId
        ? stateStudent
        : INITIAL_GRADUATIONS.find((item) => item.id === studentId);

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
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black uppercase ${getDecisionClass(student.decision)}`}>
                                {student.decision}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <MetricCard label="Total Tugas" value={student.totalTasks} />
                            <MetricCard label="Tugas Selesai" value={student.completedTasks} />
                            <MetricCard label="Persentase" value={`${Math.round((student.completedTasks / student.totalTasks) * 100)}%`} />
                        </div>

                        <div className={`rounded-lg border px-3 py-2 text-sm ${getDecisionClass(student.decision)}`}>
                            {student.decision === 'Tidak Lulus' ? <XCircle size={16} className="inline mr-2" /> : <CheckCircle2 size={16} className="inline mr-2" />}
                            {buildDecisionMessage(student.decision)}
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