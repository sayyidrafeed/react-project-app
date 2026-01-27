import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Upload, FileText, CheckCircle, X, ArrowLeft, Download, AlertCircle, Clock, Send } from 'lucide-react';
import { MOCK_TASKS } from '../../data/mockData';

const TaskSubmission: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock task data
    const task = MOCK_TASKS.find(t => t.id === id) || MOCK_TASKS[0];

    // Mock feedback data
    const hasFeedback = task.grade !== null;
    const feedbackData = hasFeedback ? {
        grade: task.grade,
        mentor: 'Kak Mentor Budi',
        feedback: 'Tugas yang baik! Perlu sedikit perbaikan pada bagian penutup.',
        gradedAt: '2026-08-16',
        status: 'returned' // returned, approved
    } : null;

    const handleFileSelect = (file: File) => {
        setUploadedFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!uploadedFile) return;
        setIsSubmitting(true);
        // Mock submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        alert('Tugas berhasil dikirim! (Simulasi)');
        navigate('/mentee/tasks');
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/mentee/tasks')}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-dark-text">Submit Tugas</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Unggah dan kirim tugas Anda
                        </p>
                    </div>
                </div>

                {/* Task Info Card */}
                <div className="card p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green dark:text-upn-gold shrink-0">
                            <FileText size={24} />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text">{task.title}</h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mt-1 line-clamp-2">{task.description}</p>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={12} className="text-slate-400 dark:text-dark-text-muted" />
                                    <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                        Deadline: {task.deadline}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FileText size={12} className="text-slate-400 dark:text-dark-text-muted" />
                                    <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                        {task.type === 'individual' ? 'Individu' : 'Kelompok'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Card (if returned) */}
                {feedbackData && (
                    <div className="card p-4 sm:p-6 border-2 border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                <AlertCircle size={20} />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm sm:text-base font-bold text-orange-800 dark:text-orange-400">
                                        Tugas Dikembalikan
                                    </h3>
                                    <span className="px-2 py-1 bg-orange-600 text-white rounded-full text-[10px] font-bold uppercase">
                                        Grade: {feedbackData.grade}/100
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 dark:text-dark-text-muted mb-2">
                                    {feedbackData.feedback}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted">
                                    <span className="font-semibold">Dinilai oleh:</span>
                                    <span>{feedbackData.mentor}</span>
                                    <span className="mx-2">•</span>
                                    <span className="font-semibold">Tanggal:</span>
                                    <span>{feedbackData.gradedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Area */}
                <div className="card p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text mb-4">
                        Unggah File Tugas
                    </h3>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-all ${isDragging
                                ? 'border-upn-green bg-upn-green/5 dark:bg-upn-green/10'
                                : 'border-slate-300 dark:border-dark-border hover:border-upn-green dark:hover:border-upn-gold hover:bg-slate-50 dark:hover:bg-dark-bg'
                            }`}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    handleFileSelect(files[0]);
                                }
                            }}
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-upn-green/10 dark:bg-upn-green/20 rounded-full flex items-center justify-center text-upn-green dark:text-upn-gold mx-auto mb-4">
                                <Upload size={32} />
                            </div>
                            <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-dark-text mb-2">
                                {uploadedFile ? uploadedFile.name : 'Drag & drop file atau klik untuk pilih'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-dark-text-muted">
                                Format yang didukung: PDF, DOC, DOCX, ZIP (Max 10MB)
                            </p>
                        </label>
                    </div>

                    {/* Selected File Preview */}
                    {uploadedFile && (
                        <div className="mt-4 p-3 sm:p-4 bg-slate-50 dark:bg-dark-bg rounded-xl border border-slate-200 dark:border-dark-border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green dark:text-upn-gold">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-dark-text truncate max-w-[200px] sm:max-w-[300px]">
                                            {uploadedFile.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-dark-text-muted">
                                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setUploadedFile(null)}
                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button (Sticky) */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border md:static md:bg-transparent md:border-0 md:p-0 z-40">
                    <div className="max-w-6xl mx-auto">
                        <button
                            onClick={handleSubmit}
                            disabled={!uploadedFile || isSubmitting}
                            className="w-full btn-primary py-3.5 sm:py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Mengirim...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Kirim Tugas</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Spacer for mobile sticky button */}
                <div className="h-20 md:hidden"></div>
            </div>
        </DashboardLayout>
    );
};

export default TaskSubmission;
