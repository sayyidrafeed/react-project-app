/**
 * TaskValidation Page
 * Enhanced mentor task validation with comprehensive validation framework
 * Fully responsive with mobile-first design and accessibility
 */

import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MOCK_MENTEES, type Mentee } from '../../data/mockData';
import { ValidatedForm, FormField, FormActions, FormSection } from '../../components/forms/ValidatedForm';
import { ValidationSchema } from '../../types/validation';
import { taskValidationRules, commonRules } from '../../utils/validation';
import {
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    Search,
    UserCheck,
    FileText,
    Star,
    Send,
    Save,
    Download,
    FileArchive,
    FileImage,
    FileVideo,
} from 'lucide-react';
import { clsx } from 'clsx';

type SubmissionFileType = 'pdf' | 'doc' | 'docx' | 'zip' | 'jpg' | 'png' | 'mp4';

interface SubmissionFile {
    name: string;
    size: string;
    type: SubmissionFileType;
    url: string;
}

const MENTEE_SUBMISSION_FILES: Record<string, SubmissionFile> = {
    m1: {
        name: 'resume-pkkmb-day-1.pdf',
        size: '2.3 MB',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    m2: {
        name: 'dokumentasi-kegiatan.png',
        size: '1.8 MB',
        type: 'png',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1280&q=80',
    },
    m3: {
        name: 'laporan-harian.docx',
        size: '856 KB',
        type: 'docx',
        url: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,VGhpcyBpcyBhIG1vY2sgRE9DWCBmaWxl',
    },
    m4: {
        name: 'arsip-kelompok.zip',
        size: '5.1 MB',
        type: 'zip',
        url: 'data:application/zip;base64,UEsDBAoAAAAAA',
    },
    m5: {
        name: 'video-presentasi.mp4',
        size: '10.4 MB',
        type: 'mp4',
        url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    },
    m6: {
        name: 'foto-kegiatan.jpg',
        size: '1.2 MB',
        type: 'jpg',
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1280&q=80',
    },
};

const getFileIcon = (type: SubmissionFileType) => {
    switch (type) {
        case 'zip':
            return FileArchive;
        case 'jpg':
        case 'png':
            return FileImage;
        case 'mp4':
            return FileVideo;
        default:
            return FileText;
    }
};

const getFileTypeLabel = (type: SubmissionFileType) => {
    switch (type) {
        case 'pdf':
            return 'PDF';
        case 'doc':
            return 'DOC';
        case 'docx':
            return 'DOCX';
        case 'zip':
            return 'ZIP';
        case 'jpg':
            return 'JPG';
        case 'png':
            return 'PNG';
        case 'mp4':
            return 'MP4';
        default:
            return 'FILE';
    }
};

const TaskValidation: React.FC = () => {
    const [mentees, setMentees] = useState(MOCK_MENTEES);
    const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    // Validation schema for task grading
    const validationSchema: ValidationSchema = {
        menteeId: taskValidationRules.menteeId,
        taskId: taskValidationRules.taskId,
        grade: taskValidationRules.grade,
        feedback: [
            commonRules.minLength(10, 'Feedback must be at least 10 characters'),
            commonRules.maxLength(500, 'Feedback cannot exceed 500 characters'),
        ],
    };

    // Filter mentees
    const filteredMentees = mentees.filter(mentee => {
        const matchesSearch = mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentee.nim.includes(searchQuery);
        if (!matchesSearch) return false;

        switch (filter) {
            case 'pending':
                return mentee.averageGrade === 0;
            case 'completed':
                return mentee.averageGrade > 0;
            default:
                return true;
        }
    });

    const pendingCount = mentees.filter(m => m.averageGrade === 0).length;
    const completedCount = mentees.filter(m => m.averageGrade > 0).length;
    const averageGrade = mentees.length > 0
        ? Math.round(mentees.reduce((acc, m) => acc + m.averageGrade, 0) / mentees.length)
        : 0;

    // Handle form submission
    const handleSubmit = async (values: Record<string, any>) => {
        // Update mentee grade
        setMentees(mentees.map(m =>
            m.id === values.menteeId
                ? { ...m, averageGrade: values.grade }
                : m
        ));

        setSelectedMentee(null);

        // Show success notification (in real app, this would be a toast)
        alert(`Grade ${values.grade} submitted successfully for ${selectedMentee?.name}`);
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">
                        Validasi Tugas
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                        Review dan berikan penilaian untuk tugas Mahasiswa Baru
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <StatCard
                        title="Belum Dinilai"
                        value={pendingCount}
                        icon={Clock}
                        color="gold"
                    />
                    <StatCard
                        title="Sudah Selesai"
                        value={completedCount}
                        icon={CheckCircle2}
                        color="green"
                    />
                    <StatCard
                        title="Rata-rata Grade"
                        value={`${averageGrade}%`}
                        icon={Star}
                        color="blue"
                    />
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Cari Nama / NIM Mentee..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search mentees"
                        />
                    </div>
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                            label="Semua"
                            count={mentees.length}
                        />
                        <FilterButton
                            active={filter === 'pending'}
                            onClick={() => setFilter('pending')}
                            label="Pending"
                            count={pendingCount}
                            color="gold"
                        />
                        <FilterButton
                            active={filter === 'completed'}
                            onClick={() => setFilter('completed')}
                            label="Selesai"
                            count={completedCount}
                            color="green"
                        />
                    </div>
                </div>

                {/* Mentee List */}
                <div className="card bg-white dark:bg-dark-surface p-0 overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-dark-border">
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text">
                            Daftar Mentee
                        </h3>
                    </div>

                    <div className="divide-y divide-slate-50 dark:divide-dark-border">
                        {filteredMentees.map((mentee) => (
                            <MenteeRow
                                key={mentee.id}
                                mentee={mentee}
                                onClick={() => setSelectedMentee(mentee)}
                            />
                        ))}
                    </div>

                    {filteredMentees.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-4">
                                <Search size={32} />
                            </div>
                            <p className="text-base sm:text-lg text-slate-400 dark:text-dark-text-muted font-bold">
                                {searchQuery ? 'Tidak ada mentee yang cocok' : 'Tidak ada mentee'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Validation Modal */}
                {selectedMentee && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setSelectedMentee(null)}
                            aria-hidden="true"
                        />
                        <div className="bg-white dark:bg-dark-surface w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <ValidatedForm
                                schema={validationSchema}
                                initialValues={{
                                    menteeId: selectedMentee.id,
                                    taskId: 'task-1',
                                    grade: selectedMentee.averageGrade || 0,
                                    feedback: '',
                                }}
                                onSubmit={handleSubmit}
                                showProgress
                                showSummary
                                className="p-6 sm:p-8"
                            >
                                {/* Header */}
                                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-dark-border">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-dark-text">
                                                {selectedMentee.name}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                                                {selectedMentee.nim} • {selectedMentee.major}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMentee(null)}
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                                            aria-label="Close modal"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Task Preview */}
                                <FormSection
                                    title="Pratinjau Tugas"
                                    description="Review tugas yang dikirim oleh mentee"
                                >
                                    <TaskSubmissionPreview submissionFile={MENTEE_SUBMISSION_FILES[selectedMentee.id]} />
                                </FormSection>

                                {/* Grade Input */}
                                <FormSection
                                    title="Penilaian"
                                    description="Berikan nilai dan feedback untuk tugas ini"
                                >
                                    <FormField
                                        name="grade"
                                        type="number"
                                        label="Nilai Tugas"
                                        placeholder="0-100"
                                        required
                                        hint="Masukkan nilai antara 0-100"
                                        size="lg"
                                    />

                                    <FormField
                                        name="feedback"
                                        type="textarea"
                                        label="Feedback"
                                        placeholder="Tulis feedback untuk mentee..."
                                        required
                                        maxLength={500}
                                        characterCount
                                        autoResize
                                        minHeight="120px"
                                        maxHeight="300px"
                                        hint="Berikan feedback yang membantu mentee untuk meningkatkan kualitas tugas"
                                    />
                                </FormSection>

                                {/* Form Actions */}
                                <FormActions align="space-between">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedMentee(null)}
                                        className="px-4 sm:px-6 py-3 bg-slate-100 dark:bg-dark-border text-slate-700 dark:text-dark-text rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-dark-surface transition-all"
                                    >
                                        Batal
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="px-4 sm:px-6 py-3 bg-upn-green/10 dark:bg-upn-green/20 text-upn-green dark:text-upn-gold rounded-xl font-semibold hover:bg-upn-green/20 dark:hover:bg-upn-green/30 transition-all flex items-center gap-2"
                                        >
                                            <Save size={18} />
                                            <span className="hidden sm:inline">Simpan Draft</span>
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 sm:px-6 py-3 btn-primary rounded-xl font-semibold flex items-center gap-2"
                                        >
                                            <Send size={18} />
                                            <span>Kirim Nilai</span>
                                        </button>
                                    </div>
                                </FormActions>
                            </ValidatedForm>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const TaskSubmissionPreview: React.FC<{ submissionFile?: SubmissionFile }> = ({ submissionFile }) => {
    if (!submissionFile) {
        return (
            <div className="bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-dashed border-slate-200 dark:border-dark-border p-6 text-center">
                <FileText size={36} className="mx-auto mb-3 text-slate-400 dark:text-dark-text-muted" />
                <p className="text-sm font-semibold text-slate-600 dark:text-dark-text-muted">
                    Belum ada file submission
                </p>
            </div>
        );
    }

    const Icon = getFileIcon(submissionFile.type);
    const isPdf = submissionFile.type === 'pdf';
    const isImage = submissionFile.type === 'jpg' || submissionFile.type === 'png';
    const isVideo = submissionFile.type === 'mp4';

    return (
        <div className="space-y-3">
            <div className="w-full rounded-2xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-bg overflow-hidden">
                {isPdf && (
                    <iframe
                        src={submissionFile.url}
                        title={submissionFile.name}
                        className="w-full h-[320px] sm:h-[420px]"
                    />
                )}

                {isImage && (
                    <div className="w-full max-h-[70vh] sm:max-h-[420px] overflow-auto bg-black/5 dark:bg-black/20">
                        <img
                            src={submissionFile.url}
                            alt={submissionFile.name}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                )}

                {isVideo && (
                    <video controls className="w-full h-[220px] sm:h-[420px] bg-black">
                        <source src={submissionFile.url} type="video/mp4" />
                        Browser Anda tidak mendukung video preview.
                    </video>
                )}

                {!isPdf && !isImage && !isVideo && (
                    <div className="p-6 sm:p-10 text-center">
                        <Icon size={40} className="mx-auto mb-3 text-slate-500 dark:text-dark-text-muted" />
                        <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-dark-text">
                            Pratinjau tidak tersedia untuk {getFileTypeLabel(submissionFile.type)}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mt-1">
                            Gunakan tombol unduh untuk membuka file.
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-surface">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-upn-green/10 dark:bg-upn-green/20 text-upn-green dark:text-upn-gold flex items-center justify-center shrink-0">
                        <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-dark-text truncate">
                            {submissionFile.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-dark-text-muted">
                            {getFileTypeLabel(submissionFile.type)} | {submissionFile.size}
                        </p>
                    </div>
                </div>
                <a
                    href={submissionFile.url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-upn-green text-upn-gold hover:bg-upn-green/90 transition-colors text-sm font-semibold"
                >
                    <Download size={16} />
                    Unduh File
                </a>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard: React.FC<{
    title: string;
    value: number | string;
    icon: React.ElementType;
    color: 'gold' | 'green' | 'blue';
}> = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        gold: 'bg-upn-gold/10 text-upn-gold',
        green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold',
        blue: 'bg-primary-blue/10 text-primary-blue',
    };

    return (
        <div className="card p-4 sm:p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <Icon size={18} className="sm:size-20" />
                </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-medium mt-1 uppercase">
                {title}
            </p>
        </div>
    );
};

// Filter Button Component
const FilterButton: React.FC<{
    active: boolean;
    onClick: () => void;
    label: string;
    count: number;
    color?: 'gold' | 'green';
}> = ({ active, onClick, label, count, color }) => {
    const getActiveClass = () => {
        if (color) {
            return {
                gold: 'bg-upn-gold text-upn-green',
                green: 'bg-upn-green text-upn-gold',
            }[color];
        }
        return 'bg-upn-green text-upn-gold';
    };

    const getInactiveClass = () => {
        if (color) {
            return {
                gold: 'bg-upn-gold/10 text-upn-gold hover:bg-upn-gold/20',
                green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold hover:bg-upn-green/20',
            }[color];
        }
        return 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface';
    };

    return (
        <button
            onClick={onClick}
            className={clsx(
                'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0',
                active ? getActiveClass() : getInactiveClass()
            )}
        >
            <span>{label}</span>
            <span className={clsx(
                'px-2 py-0.5 rounded-full text-[10px]',
                active ? 'bg-white/20' : 'bg-slate-200 dark:bg-dark-surface'
            )}>
                {count}
            </span>
        </button>
    );
};

// Mentee Row Component
const MenteeRow: React.FC<{
    mentee: Mentee;
    onClick: () => void;
}> = ({ mentee, onClick }) => {
    const isPending = mentee.averageGrade === 0;

    return (
        <button
            onClick={onClick}
            className="w-full p-4 sm:p-5 text-left hover:bg-slate-50 dark:hover:bg-dark-bg transition-colors group flex items-start gap-3 sm:gap-4"
        >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-upn-green/10 rounded-xl flex items-center justify-center text-upn-green dark:text-upn-gold shrink-0">
                <UserCheck size={24} />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text truncate">
                        {mentee.name}
                    </h4>
                    <span className={clsx(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                        isPending
                            ? 'bg-upn-gold/10 text-upn-gold'
                            : 'bg-upn-green/10 text-upn-green dark:text-upn-gold'
                    )}>
                        {isPending ? 'PENDING' : `GRADE: ${mentee.averageGrade}`}
                    </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted">
                    {mentee.nim} • {mentee.major}
                </p>
            </div>
            <Eye size={18} className="text-slate-300 dark:text-dark-text-muted group-hover:text-upn-green dark:group-hover:text-upn-gold transition-colors shrink-0" />
        </button>
    );
};

export default TaskValidation;
