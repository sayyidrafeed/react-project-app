import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { FileText, Plus, Trash2, CheckCircle, XCircle, Calendar as CalendarIcon, Save, Upload, X } from 'lucide-react';

const TaskBuilderPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [taskType, setTaskType] = useState<'individual' | 'group'>('individual');
    const [fileTypes, setFileTypes] = useState<string[]>(['PDF', 'DOC', 'DOCX', 'ZIP', 'JPG', 'PNG']);
    const [isPublished, setIsPublished] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!title.trim()) return;
        setIsSaving(true);
        // Mock save delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setIsPublished(true);
        alert('Template tugas berhasil disimpan! (Simulasi)');
    };

    const handleAddFileType = (type: string) => {
        if (fileTypes.includes(type)) {
            setFileTypes(fileTypes.filter(t => t !== type));
        } else {
            setFileTypes([...fileTypes, type]);
        }
    };

    const handleRemoveFileType = (type: string) => {
        setFileTypes(fileTypes.filter(t => t !== type));
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Template Builder</h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Buat template tugas baru untuk PKKMB-U
                    </p>
                </div>

                <div className="card p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Judul Tugas
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan judul tugas..."
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                placeholder="Jelaskan tugas secara singkat..."
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400 resize-none"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Task Type */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Jenis Tugas
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="taskType"
                                        checked={taskType === 'individual'}
                                        onChange={() => setTaskType('individual')}
                                        className="accent-upn-green w-4 h-4"
                                    />
                                    <span className="text-sm font-semibold text-slate-700">Individu</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="taskType"
                                        checked={taskType === 'group'}
                                        onChange={() => setTaskType('group')}
                                        className="accent-upn-green w-4 h-4"
                                    />
                                    <span className="text-sm font-semibold text-slate-700">Kelompok</span>
                                </label>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Deadline
                            </label>
                            <input
                                type="date"
                                placeholder="Pilih tanggal deadline..."
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>

                        {/* File Types */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Jenis File yang Diterima
                            </label>
                            <div className="flex flex flex-wrap gap-2">
                                {['PDF', 'DOC', 'DOCX', 'ZIP', 'JPG', 'PNG'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleAddFileType(type)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${fileTypes.includes(type)
                                            ? 'bg-upn-green text-upn-gold border-2 border-upn-green'
                                            : 'bg-slate-100 text-slate-600 border-2 border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <button
                                onClick={handleSave}
                                disabled={!title.trim() || isSaving}
                                className="flex-1 btn-primary py-3 rounded-xl text-sm sm:text-base font-semibold items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : isPublished ? (
                                    <>
                                        <CheckCircle size={18} />
                                        <span>Simpan</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>Simpan Template</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Card */}
                {isPublished && (
                    <div className="card p-4 sm:p-6 bg-upn-green/5 border-2 border-upn-green/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                                <FileText size={18} className="text-upn-green" />
                                Template Disimpan
                            </h3>
                            <button
                                onClick={() => setIsPublished(false)}
                                className="p-1.5 hover:bg-upn-green/20 rounded-lg transition-colors text-upn-green"
                                title="Tutup"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-slate-800 text-sm">{title}</p>
                                    <p className="text-xs text-slate-500">{description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs font-semibold text-upn-green">
                                            {taskType === 'individual' ? 'Individu' : 'Kelompok'}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {fileTypes.join(', ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout >
    );
};

export default TaskBuilderPage;
