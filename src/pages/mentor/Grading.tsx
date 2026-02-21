import React, { useState } from 'react';
import { LazyMotion, m, AnimatePresence, domAnimation } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    Users,
    CheckSquare,
    Clock,
    GraduationCap,
    Mail,
    X,
    Calendar,
    TrendingUp,
    Star,
    ArrowRight,
    FileText,
    FileImage,
    FileArchive,
    Download,
} from 'lucide-react';
import { MOCK_MENTEES, type Mentee } from '../../data/mockData';

type SubmissionFileType = 'pdf' | 'doc' | 'docx' | 'zip' | 'jpg' | 'png';

interface SubmissionFileInfo {
    name: string;
    type: SubmissionFileType;
    size: string;
    url: string;
}

interface AttendanceHistoryRecord {
    date: string;
    event: string;
    status: 'present' | 'absent';
}

interface TaskHistoryRecord {
    title: string;
    grade: number | null;
    submittedAt: string | null;
    gradedAt: string | null;
    submissionFile?: SubmissionFileInfo;
}

const getFileTypeIcon = (type: SubmissionFileType) => {
    switch (type) {
        case 'jpg':
        case 'png':
            return FileImage;
        case 'zip':
            return FileArchive;
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
        default:
            return 'FILE';
    }
};

const GradingPage: React.FC = () => {
    const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = (mentee: Mentee) => {
        setSelectedMentee(mentee);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedMentee(null), 300);
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Daftar Mentee</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                        Klik pada mentee untuk melihat detail dan riwayat
                    </p>
                </div>

                {/* Mentee Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {MOCK_MENTEES.map(mentee => (
                        <MenteeCard
                            key={mentee.id}
                            mentee={mentee}
                            onClick={() => openDrawer(mentee)}
                        />
                    ))}
                </div>
            </div>

            {/* Drawer/Modal for Student Profile */}
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {isDrawerOpen && selectedMentee && (
                        <>
                            {/* Overlay */}
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeDrawer}
                                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
                            />

                            {/* Drawer (Mobile) */}
                            <m.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface rounded-t-3xl shadow-2xl z-50 md:hidden max-h-[85vh] overflow-y-auto"
                            >
                                <MenteeProfileContent mentee={selectedMentee} onClose={closeDrawer} />
                            </m.div>

                            {/* Modal (Desktop) */}
                            <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={closeDrawer}
                                className="hidden md:flex fixed inset-0 items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50"
                            >
                                <m.div
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4"
                                >
                                    <MenteeProfileContent mentee={selectedMentee} onClose={closeDrawer} />
                                </m.div>
                            </m.div>
                        </>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </DashboardLayout>
    );
};

// Mentee Card Component
const MenteeCard: React.FC<{
    mentee: Mentee;
    onClick: () => void;
}> = ({ mentee, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="card p-4 sm:p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
        >
            <div className="flex items-start gap-3 sm:gap-4 mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-upn-green/10 rounded-xl flex items-center justify-center text-upn-green dark:text-upn-gold shrink-0">
                    <Users size={24} />
                </div>
                <div className="flex-grow">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text truncate">
                        {mentee.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mt-1">
                        {mentee.nim} • {mentee.major}
                    </p>
                </div>
                <ArrowRight size={18} className="text-slate-300 dark:text-dark-text-muted group-hover:text-upn-green dark:group-hover:text-upn-gold transition-colors shrink-0" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <StatBox
                    label="Grade"
                    value={mentee.averageGrade === 0 ? '-' : mentee.averageGrade}
                    color={mentee.averageGrade >= 80 ? 'green' : mentee.averageGrade >= 60 ? 'yellow' : 'red'}
                />
                <StatBox
                    label="Tugas"
                    value={`${mentee.tasksCompleted}/${mentee.tasksCompleted + mentee.tasksPending}`}
                    color="blue"
                />
                <StatBox
                    label="Kehadiran"
                    value={`${mentee.attendanceRate}%`}
                    color="purple"
                />
            </div>
        </button>
    );
};

// Mentee Profile Content Component
const MenteeProfileContent: React.FC<{
    mentee: Mentee;
    onClose: () => void;
}> = ({ mentee, onClose }) => {
    const attendanceHistory: AttendanceHistoryRecord[] = [
        { date: '2026-08-14', event: 'Pembukaan PKKMB-U', status: 'present' },
        { date: '2026-08-15', event: 'Senam Pagi', status: 'present' },
        { date: '2026-08-16', event: 'Kunjungan Museum', status: 'present' },
        { date: '2026-08-17', event: 'Olahraga Bersama', status: 'present' },
        { date: '2026-08-18', event: 'Workshop Kepemimpinan', status: 'present' },
        { date: '2026-08-19', event: 'Malam Keakraban', status: 'present' },
    ];

    const taskHistory: TaskHistoryRecord[] = [
        {
            title: 'Resume PKKMB Day 1',
            grade: 85,
            submittedAt: '2026-08-15',
            gradedAt: '2026-08-16',
            submissionFile: {
                name: 'resume-pkkmb-day-1.pdf',
                type: 'pdf',
                size: '2.3 MB',
                url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            },
        },
        {
            title: 'Yel-yel Kelompok',
            grade: 90,
            submittedAt: '2026-08-17',
            gradedAt: '2026-08-18',
            submissionFile: {
                name: 'yel-yel-kelompok.zip',
                type: 'zip',
                size: '5.1 MB',
                url: 'data:application/zip;base64,UEsDBAoAAAAAA',
            },
        },
        {
            title: 'Esai Bela Negara',
            grade: 78,
            submittedAt: '2026-08-18',
            gradedAt: '2026-08-19',
            submissionFile: {
                name: 'esai-bela-negara.docx',
                type: 'docx',
                size: '890 KB',
                url: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,VGhpcyBpcyBhIG1vY2sgRE9DWCBmaWxl',
            },
        },
        { title: 'Foto Kegiatan Kelompok', grade: null, submittedAt: null, gradedAt: null },
        { title: 'Presentasi Mini', grade: null, submittedAt: null, gradedAt: null },
    ];

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-dark-border">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-upn-green/10 rounded-xl flex items-center justify-center text-upn-green dark:text-upn-gold">
                            <Users size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-dark-text">
                                {mentee.name}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mt-1">
                                {mentee.nim} • {mentee.major}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <OverviewStat
                        label="Rata-rata Grade"
                        value={`${mentee.averageGrade}`}
                        icon={Star}
                        color="gold"
                    />
                    <OverviewStat
                        label="Tugas Selesai"
                        value={mentee.tasksCompleted}
                        icon={CheckSquare}
                        color="green"
                    />
                    <OverviewStat
                        label="Tugas Pending"
                        value={mentee.tasksPending}
                        icon={Clock}
                        color="yellow"
                    />
                    <OverviewStat
                        label="Kehadiran"
                        value={`${mentee.attendanceRate}%`}
                        icon={TrendingUp}
                        color="blue"
                    />
                </div>

                {/* Attendance History */}
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-3 flex items-center gap-2">
                        <Calendar size={18} className="text-upn-green dark:text-upn-gold" />
                        Riwayat Kehadiran
                    </h3>
                    <div className="space-y-2">
                        {attendanceHistory.map((record) => (
                            <AttendanceRecord key={record.date} record={record} />
                        ))}
                    </div>
                </div>

                {/* Task History */}
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-3 flex items-center gap-2">
                        <CheckSquare size={18} className="text-upn-green dark:text-upn-gold" />
                        Riwayat Tugas
                    </h3>
                    <div className="space-y-2">
                        {taskHistory.map((task) => (
                            <TaskRecord key={task.title} task={task} />
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="card p-4 sm:p-6 bg-upn-green/5 dark:bg-upn-green/10 border-upn-green/20">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-3 flex items-center gap-2">
                        <Mail size={18} className="text-upn-green dark:text-upn-gold" />
                        Hubungi Mentee
                    </h3>
                    <button className="w-full btn-primary py-3 rounded-xl text-sm sm:text-base font-semibold">
                        Kirim Pesan
                    </button>
                </div>
            </div>
        </div>
    );
};

// Overview Stat Component
const OverviewStat: React.FC<{
    label: string;
    value: string | number;
    icon: React.ElementType;
    color: 'gold' | 'green' | 'yellow' | 'blue';
}> = ({ label, value, icon: Icon, color }) => {
    const colorClasses = {
        gold: 'bg-upn-gold/10 text-upn-gold',
        green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold',
        yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
        blue: 'bg-primary-blue/10 text-primary-blue',
    };

    return (
        <div className="bg-slate-50 dark:bg-dark-bg rounded-xl p-3 sm:p-4 text-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${colorClasses[color]}`}>
                <Icon size={18} className="sm:size-20" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-bold uppercase mt-1">{label}</p>
        </div>
    );
};

// Attendance Record Component
const AttendanceRecord: React.FC<{ record: AttendanceHistoryRecord }> = ({ record }) => {
    const statusClasses = {
        present: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
        absent: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    };

    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 ${statusClasses[record.status as keyof typeof statusClasses]}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${record.status === 'present' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                {record.status === 'present' ? (
                    <CheckSquare size={18} className="text-white" />
                ) : (
                    <X size={18} className="text-white" />
                )}
            </div>
            <div className="flex-grow">
                <p className="font-bold text-slate-800 dark:text-dark-text text-sm">{record.event}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted">{record.date}</p>
            </div>
        </div>
    );
};

// Task Record Component
const TaskRecord: React.FC<{ task: TaskHistoryRecord }> = ({ task }) => {
    const getGradeColor = (grade: number | null) => {
        if (grade === null) return 'text-slate-400 dark:text-dark-text-muted';
        if (grade >= 80) return 'text-green-600 dark:text-green-400';
        if (grade >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getGradeBg = (grade: number | null) => {
        if (grade === null) return 'bg-slate-100 dark:bg-dark-border';
        if (grade >= 80) return 'bg-green-100 dark:bg-green-900/20';
        if (grade >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
        return 'bg-red-100 dark:bg-red-900/20';
    };

    return (
        <div className="card p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-grow">
                    <h4 className="font-bold text-slate-800 dark:text-dark-text text-sm sm:text-base truncate">
                        {task.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {task.submittedAt && (
                            <div className="flex items-center gap-1.5">
                                <GraduationCap size={12} className="text-slate-400 dark:text-dark-text-muted" />
                                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                    Dikirim: {task.submittedAt}
                                </span>
                            </div>
                        )}
                        {task.gradedAt && (
                            <div className="flex items-center gap-1.5">
                                <Star size={12} className="text-slate-400 dark:text-dark-text-muted" />
                                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                    Dinilai: {task.gradedAt}
                                </span>
                            </div>
                        )}
                        {task.submissionFile && (
                            <div className="flex items-center gap-1.5">
                                {(() => {
                                    const FileIcon = getFileTypeIcon(task.submissionFile.type);
                                    return <FileIcon size={12} className="text-slate-400 dark:text-dark-text-muted" />;
                                })()}
                                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                    {getFileTypeLabel(task.submissionFile.type)} | {task.submissionFile.size}
                                </span>
                                <a
                                    href={task.submissionFile.url}
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-upn-green dark:text-upn-gold hover:underline"
                                >
                                    <Download size={10} />
                                    Unduh
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-sm sm:text-base font-bold ${getGradeBg(task.grade)} ${getGradeColor(task.grade)}`}>
                    {task.grade === null ? 'Pending' : `${task.grade}/100`}
                </div>
            </div>
        </div>
    );
};

// Stat Box Component
const StatBox: React.FC<{
    label: string;
    value: string | number;
    color: 'gold' | 'green' | 'yellow' | 'blue' | 'purple' | 'red';
}> = ({ label, value, color }) => {
    const colorClasses = {
        gold: 'text-upn-gold bg-upn-gold/10',
        green: 'text-upn-green dark:text-upn-gold bg-upn-green/10 dark:bg-upn-gold/10',
        yellow: 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-900/20',
        blue: 'text-primary-blue bg-primary-blue/10',
        purple: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-900/20',
        red: 'text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-900/20',
    };

    return (
        <div className={`bg-white dark:bg-dark-surface rounded-lg p-2 sm:p-3 text-center ${colorClasses[color]}`}>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-bold uppercase">{label}</p>
            <p className="text-lg sm:text-xl font-black">{value}</p>
        </div>
    );
};

export default GradingPage;
