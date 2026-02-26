import React from 'react';
import { ClipboardList } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { INITIAL_TASKS, PPMTask } from './ppmTaskData';

const PPMTaskDetailPage: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const location = useLocation();

    const taskFromState = (location.state as { task?: PPMTask } | null)?.task;
    const task = taskFromState && taskFromState.id === taskId
        ? taskFromState
        : INITIAL_TASKS.find((item) => item.id === taskId);

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Detail Tugas PPM</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Endpoint detail untuk melihat informasi lengkap tiap tugas PPM.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                        <ClipboardList size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Divisi PPM</span>
                    </div>
                </div>

                {!task ? (
                    <div className="card p-6 sm:p-8 text-center space-y-3">
                        <p className="text-slate-500">Data tugas tidak ditemukan.</p>
                        <Link to="/panitia/ppm" className="btn-secondary text-xs">KEMBALI KE DAFTAR TUGAS</Link>
                    </div>
                ) : (
                    <div className="card p-5 sm:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-black text-slate-800">{task.title}</h2>
                                <p className="text-sm text-slate-500 mt-1">Target: {task.target}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${task.category === 'Kelompok'
                                    ? 'bg-upn-gold/15 text-upn-green'
                                    : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {task.category}
                                </span>
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${task.status === 'Aktif'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-slate-200 text-slate-600'
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Deskripsi Tugas</p>
                            <p className="text-sm text-slate-700">{task.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="rounded-xl border border-slate-100 p-4 bg-white">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">ID Tugas</p>
                                <p className="text-sm font-semibold text-slate-700 mt-1">{task.id}</p>
                            </div>
                            <div className="rounded-xl border border-slate-100 p-4 bg-white">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tenggat</p>
                                <p className="text-sm font-semibold text-slate-700 mt-1">{task.deadline}</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link to="/panitia/ppm" className="btn-secondary text-xs">KEMBALI KE DAFTAR TUGAS</Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default PPMTaskDetailPage;