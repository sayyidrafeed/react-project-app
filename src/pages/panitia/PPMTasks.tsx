import React, { useMemo, useState } from 'react';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { INITIAL_TASKS, PPMTask, TaskCategory } from './ppmTaskData';

const PPMTasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<PPMTask[]>(INITIAL_TASKS);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<TaskCategory>('Kelompok');
    const [target, setTarget] = useState('Seluruh Kelompok');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState<'Draft' | 'Aktif'>('Draft');
    const [description, setDescription] = useState('');

    const totalKelompok = useMemo(
        () => tasks.filter((task) => task.category === 'Kelompok').length,
        [tasks],
    );

    const totalIndividu = useMemo(
        () => tasks.filter((task) => task.category === 'Individu').length,
        [tasks],
    );

    const handleAddTask = () => {
        if (!title.trim() || !deadline || !description.trim()) return;

        const newTask: PPMTask = {
            id: `ppm-${Date.now()}`,
            title: title.trim(),
            category,
            target: target.trim() || (category === 'Kelompok' ? 'Seluruh Kelompok' : 'Seluruh Mentee'),
            deadline,
            status,
            description: description.trim(),
        };

        setTasks((prev) => [newTask, ...prev]);
        setTitle('');
        setCategory('Kelompok');
        setTarget('Seluruh Kelompok');
        setDeadline('');
        setStatus('Draft');
        setDescription('');
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Divisi PPM - Manajemen Tugas</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Buat dan kelola tugas kategori kelompok maupun individu untuk mentee.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                        <ClipboardList size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Divisi PPM</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <SummaryCard title="Total Tugas" value={tasks.length} />
                    <SummaryCard title="Kategori Kelompok" value={totalKelompok} />
                    <SummaryCard title="Kategori Individu" value={totalIndividu} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 card p-4 sm:p-6 space-y-4">
                        <h2 className="text-base font-black text-slate-800">Daftar Tugas PPM</h2>

                        <div className="space-y-3 max-h-150 overflow-auto pr-1">
                            {tasks.map((task) => (
                                <div key={task.id} className="rounded-xl border border-slate-100 p-4 bg-slate-50/70">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-black text-slate-800">{task.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">Target: {task.target}</p>
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

                                    <p className="text-sm text-slate-600 mt-3">{task.description}</p>
                                    <p className="text-[11px] text-slate-400 mt-2">Tenggat: {task.deadline}</p>
                                    <div className="mt-3">
                                        <Link
                                            to={`/panitia/ppm/${task.id}`}
                                            state={{ task }}
                                            className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-600 hover:bg-slate-100"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card p-4 sm:p-6 space-y-4">
                        <h3 className="text-base font-black text-slate-800">Tambah Tugas (Simulasi)</h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Judul Tugas</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Contoh: Resume Materi Kebangsaan"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
                                <select
                                    value={category}
                                    onChange={(event) => {
                                        const nextCategory = event.target.value as TaskCategory;
                                        setCategory(nextCategory);
                                        setTarget(nextCategory === 'Kelompok' ? 'Seluruh Kelompok' : 'Seluruh Mentee');
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                                >
                                    <option value="Kelompok">Kelompok</option>
                                    <option value="Individu">Individu</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Status</label>
                                <select
                                    value={status}
                                    onChange={(event) => setStatus(event.target.value as 'Draft' | 'Aktif')}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Aktif">Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Target</label>
                            <input
                                type="text"
                                value={target}
                                onChange={(event) => setTarget(event.target.value)}
                                placeholder={category === 'Kelompok' ? 'Contoh: Kelompok 21 & 22' : 'Contoh: Seluruh Mentee'}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Tenggat</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(event) => setDeadline(event.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Tuliskan instruksi tugas secara ringkas dan jelas..."
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green resize-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleAddTask}
                            disabled={!title.trim() || !deadline || !description.trim()}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-upn-green text-white text-sm font-black uppercase tracking-wide disabled:opacity-50"
                        >
                            <PlusCircle size={16} />
                            Tambah Tugas
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const SummaryCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
    <div className="card p-4 sm:p-5 bg-white">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-black">{title}</p>
        <p className="text-2xl font-black text-slate-800 mt-2">{value}</p>
    </div>
);

export default PPMTasksPage;