import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { MOCK_TASKS, Task } from '../data/mockData';
import { FileText, Clock, CheckCircle2, Upload, X } from 'lucide-react';
import { clsx } from 'clsx';

const TaskCatalog: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState('all');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const savedTasks = localStorage.getItem('siera_tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Failed to parse saved tasks:', error);
                localStorage.removeItem('siera_tasks');
                setTasks(MOCK_TASKS);
            }
        } else {
            setTasks(MOCK_TASKS);
        }
        
        // Cleanup function for StrictMode compliance
        return () => {
            // Any cleanup if needed
        };
    }, []);

    const saveTasks = (updatedTasks: Task[]) => {
        setTasks(updatedTasks);
        localStorage.setItem('siera_tasks', JSON.stringify(updatedTasks));
    };

    const handleUpload = async () => {
        if (!selectedTask) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(i);
            await new Promise(r => setTimeout(r, 150));
        }

        const updatedTasks = tasks.map(t =>
            t.id === selectedTask.id ? { ...t, grade: null, submittedAt: new Date().toISOString() } : t
        );

        saveTasks(updatedTasks);
        setIsUploading(false);
        setSelectedTask(null);
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'all') return true;
        if (filter === 'pending') return t.grade === null;
        if (filter === 'graded') return t.grade !== null;
        return true;
    });

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black">Katalog Tugas</h1>
                        <p className="text-slate-500 font-medium">Kumpulkan tugas tepat waktu untuk mendapatkan skor Bela Negara.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        {['all', 'pending', 'graded'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={clsx(
                                    "px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize",
                                    filter === f ? "bg-upn-green text-upn-gold shadow-md" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTasks.map(task => (
                        <div key={task.id} className="card group hover:border-upn-green transition-all bg-white flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-xl bg-upn-green/10 text-upn-green">
                                    <FileText size={20} />
                                </div>
                                <span className={clsx(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                    task.grade === null ? "bg-upn-gold/5 text-upn-gold border-upn-gold/20" : "bg-upn-green/5 text-upn-green border-upn-green/20"
                                )}>
                                    {task.grade === null ? 'PENDING' : `GRADE: ${task.grade}`}
                                </span>
                            </div>

                            <h3 className="font-black text-lg text-slate-800 leading-tight group-hover:text-upn-green transition-colors">{task.title}</h3>
                            <p className="text-slate-400 text-xs mt-2 line-clamp-2 font-medium leading-relaxed">{task.description}</p>

                            <div className="mt-auto pt-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        <Clock size={14} /> {task.deadline}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-upn-green uppercase">
                                        {task.type}
                                    </div>
                                </div>

                                {task.grade === null && (
                                    <button
                                        onClick={() => setSelectedTask(task)}
                                        className="w-full py-3 bg-upn-green text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-900 transition-all shadow-lg shadow-green-900/10"
                                    >
                                        <Upload size={16} /> SUBMIT SEKARANG
                                    </button>
                                )}
                                {task.grade !== null && (
                                    <div className="w-full py-3 bg-green-50 text-upn-green rounded-xl font-black flex items-center justify-center gap-2 border border-green-100">
                                        <CheckCircle2 size={16} /> GRADE: {task.grade}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upload Modal (Simulation) */}
                {selectedTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isUploading && setSelectedTask(null)} />
                        <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">Submit Tugas</h2>
                                    <p className="text-slate-400 font-medium text-sm mt-1">{selectedTask.title}</p>
                                </div>
                                <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="border-4 border-dashed border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all hover:bg-slate-50 cursor-pointer group">
                                    <div className="w-16 h-16 bg-upn-green/5 rounded-full flex items-center justify-center text-upn-green mb-4 group-hover:scale-110 transition-transform">
                                        <Upload size={32} />
                                    </div>
                                    <p className="font-bold text-slate-600">Drag & drop berkas PDF di sini</p>
                                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Maksimal 5MB • PDF Only</p>
                                </div>

                                {isUploading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-black text-slate-600 uppercase">
                                            <span>Mengunggah Berkas...</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-upn-green transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="w-full btn-primary py-4 font-black text-lg disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isUploading ? 'PLEASE WAIT...' : 'KONFIRMASI PENGIRIMAN'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default TaskCatalog;
