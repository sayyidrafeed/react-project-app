import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    Users,
    CheckCircle,
    Search,
    Filter,
    MoreVertical,
    ArrowRight,
    X,
    Phone,
    MapPin,
    FileText,
    MessageCircle,
    Instagram,
    Twitter,
    Linkedin,
    Music2,
    Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_MENTEES, type Mentee } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const MentorGroupPage: React.FC = () => {
    const [selectedMentees, setSelectedMentees] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all');
    const [selectAll, setSelectAll] = useState(false);
    const [selectedMenteeProfile, setSelectedMenteeProfile] = useState<Mentee | null>(null);

    const filteredMentees = MOCK_MENTEES.filter((mentee) => {
        const matchesSearch =
            mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentee.nim.includes(searchQuery) ||
            mentee.major.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        switch (filter) {
            case 'active':
                return mentee.averageGrade > 0;
            case 'pending':
                return mentee.averageGrade === 0;
            default:
                return true;
        }
    });

    const totalMentees = filteredMentees.length;
    const activeMentees = filteredMentees.filter((m) => m.averageGrade > 0).length;
    const pendingMentees = filteredMentees.filter((m) => m.averageGrade === 0).length;

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedMentees(new Set());
        } else {
            setSelectedMentees(new Set(filteredMentees.map((m) => m.id)));
        }
        setSelectAll(!selectAll);
    };

    const handleMenteeSelect = (id: string) => {
        const newSelected = new Set(selectedMentees);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedMentees(newSelected);
    };

    const getMenteeStatus = (mentee: Mentee) => {
        if (mentee.averageGrade > 0) {
            return { label: 'Aktif', color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' };
        }
        return { label: 'Pending', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' };
    };

    const handleOpenProfile = (mentee: Mentee) => {
        setSelectedMenteeProfile(mentee);
    };

    const handleCloseProfile = () => {
        setSelectedMenteeProfile(null);
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Daftar Mentee</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Kelola dan pantau progres mentee Anda
                        </p>
                    </div>
                    <Link
                        to="/mentor/statistik-grup"
                        className="flex items-center gap-2 px-4 py-2.5 bg-upn-green/10 dark:bg-upn-gold/10 text-upn-green dark:text-upn-gold rounded-xl font-semibold text-sm hover:bg-upn-green/20 dark:hover:bg-upn-gold/20 transition-colors"
                    >
                        <span>Lihat Statistik Grup</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama, NIM, atau jurisdiction..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                            count={totalMentees}
                            label="Semua"
                        />
                        <FilterButton
                            active={filter === 'active'}
                            onClick={() => setFilter('active')}
                            count={activeMentees}
                            label="Aktif"
                            color="green"
                        />
                        <FilterButton
                            active={filter === 'pending'}
                            onClick={() => setFilter('pending')}
                            count={pendingMentees}
                            label="Pending"
                            color="yellow"
                        />
                    </div>
                </div>

                {selectedMentees.size > 0 && (
                    <div className="card p-3 sm:p-4 bg-upn-green/5 dark:bg-upn-green/10 border-2 border-upn-green/20 dark:border-upn-green/30">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={20} className="text-upn-green dark:text-upn-gold" />
                                <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-dark-text">
                                    {selectedMentees.size} mentee dipilih
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-dark-text-muted hover:bg-slate-50 dark:hover:bg-dark-border transition-all">
                                    Kirim Pengingat
                                </button>
                                <button className="px-3 py-2 btn-primary rounded-lg text-xs sm:text-sm font-semibold">
                                    Validasi Tugas
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="card p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text">Daftar Mentee</h3>
                        <label
                            htmlFor="select-all-mentees"
                            className="flex items-center gap-2 text-xs text-slate-600 dark:text-dark-text-muted cursor-pointer"
                        >
                            <input
                                id="select-all-mentees"
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="accent-upn-green w-4 h-4"
                            />
                            <span>Pilih Semua</span>
                        </label>
                    </div>

                    <div className="space-y-3">
                        {filteredMentees.map((mentee) => {
                            const status = getMenteeStatus(mentee);
                            const isSelected = selectedMentees.has(mentee.id);

                            return (
                                <div
                                    key={mentee.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleOpenProfile(mentee)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            handleOpenProfile(mentee);
                                        }
                                    }}
                                    className={cn(
                                        'flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 dark:bg-dark-bg rounded-xl border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-upn-green/40 dark:focus:ring-upn-gold/40',
                                        isSelected
                                            ? 'border-upn-green dark:border-upn-gold'
                                            : 'border-transparent hover:border-slate-200 dark:hover:border-dark-border'
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleMenteeSelect(mentee.id)}
                                        onClick={(event) => event.stopPropagation()}
                                        className="accent-upn-green w-5 h-5 shrink-0"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text truncate">
                                                        {mentee.name}
                                                    </h4>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted">
                                                    {mentee.nim} | {mentee.major}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleOpenProfile(mentee);
                                                    }}
                                                    className="flex items-center gap-1 px-2 py-1.5 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-dark-text-muted hover:bg-slate-100 dark:hover:bg-dark-border transition-colors"
                                                >
                                                    <Eye size={14} />
                                                    <span>Profil</span>
                                                </button>
                                                <button
                                                    onClick={(event) => event.stopPropagation()}
                                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                                                >
                                                    <MoreVertical size={16} className="text-slate-400 dark:text-dark-text-muted" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                            <StatBox
                                                label="Grade"
                                                value={mentee.averageGrade === 0 ? '-' : mentee.averageGrade}
                                                color="blue"
                                            />
                                            <StatBox
                                                label="Tugas"
                                                value={`${mentee.tasksCompleted}/${mentee.tasksCompleted + mentee.tasksPending}`}
                                                color="green"
                                            />
                                            <StatBox
                                                label="Kehadiran"
                                                value={`${mentee.attendanceRate}%`}
                                                color="purple"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredMentees.length === 0 && (
                        <div className="text-center py-8 sm:py-12 border-2 border-dashed border-slate-200 dark:border-dark-border rounded-xl bg-slate-50/50 dark:bg-dark-bg/50">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-4">
                                <Users size={32} />
                            </div>
                            <p className="text-base sm:text-lg text-slate-400 dark:text-dark-text-muted font-bold">
                                {searchQuery ? 'Tidak ada mentee yang cocok' : 'Tidak ada mentee'}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 dark:text-dark-text-muted mt-2">
                                {searchQuery ? 'Coba kata kunci lain' : 'Semua mentee sudah ditampilkan'}
                            </p>
                        </div>
                    )}
                </div>

                {filteredMentees.length > 0 && (
                    <div className="text-center py-4">
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted">
                            Menampilkan <span className="font-bold text-upn-green dark:text-upn-gold">{filteredMentees.length}</span> dari <span className="font-bold">{MOCK_MENTEES.length}</span> mentee
                        </p>
                    </div>
                )}
            </div>
            <MenteeProfileDrawer
                mentee={selectedMenteeProfile}
                isOpen={selectedMenteeProfile !== null}
                onClose={handleCloseProfile}
            />
        </DashboardLayout>
    );
};

const FilterButton: React.FC<{
    active: boolean;
    onClick: () => void;
    count: number;
    label: string;
    color?: 'green' | 'yellow';
}> = ({ active, onClick, count, label, color }) => {
    const getActiveClass = () => {
        if (color) {
            return {
                green: 'bg-green-600 text-white',
                yellow: 'bg-yellow-500 text-white',
            }[color];
        }
        return 'bg-upn-green text-upn-gold';
    };

    const getInactiveClass = () => {
        if (color) {
            return {
                green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
                yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
            }[color];
        }
        return 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface';
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${active ? getActiveClass() : getInactiveClass()}`}
        >
            <Filter size={14} className="sm:size-16" />
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20' : 'bg-slate-200 dark:bg-dark-surface'}`}>
                {count}
            </span>
        </button>
    );
};

const StatBox: React.FC<{
    label: string;
    value: string | number;
    color: 'blue' | 'green' | 'purple';
}> = ({ label, value, color }) => {
    const colorClasses = {
        blue: 'text-primary-blue bg-primary-blue/10',
        green: 'text-upn-green dark:text-upn-gold bg-upn-green/10 dark:bg-upn-gold/10',
        purple: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-900/20',
    };

    return (
        <div className={`bg-white dark:bg-dark-surface rounded-lg p-2 sm:p-3 text-center ${colorClasses[color]}`}>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-bold uppercase">{label}</p>
            <p className="text-lg sm:text-xl font-black">{value}</p>
        </div>
    );
};

const MenteeProfileDrawer: React.FC<{
    mentee: Mentee | null;
    isOpen: boolean;
    onClose: () => void;
}> = ({ mentee, isOpen, onClose }) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const handleMediaChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleMediaChange);
        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, []);

    if (!isOpen || !mentee) return null;

    const phone = mentee.profile?.phone ?? '-';
    const address = mentee.profile?.address ?? 'Belum tersedia';
    const bio = mentee.profile?.bio ?? 'Belum ada bio.';
    const avatar = mentee.profile?.avatar;

    const socialItems = [
        { key: 'instagram', href: mentee.socialLinks?.instagram, label: 'Instagram', icon: Instagram },
        { key: 'twitter', href: mentee.socialLinks?.twitter, label: 'Twitter', icon: Twitter },
        { key: 'linkedin', href: mentee.socialLinks?.linkedin, label: 'LinkedIn', icon: Linkedin },
        { key: 'tiktok', href: mentee.socialLinks?.tiktok, label: 'TikTok', icon: Music2 },
    ].filter((item): item is { key: string; href: string; label: string; icon: typeof Instagram } => Boolean(item.href));

    const numericPhone = (mentee.profile?.phone ?? '').replace(/[^\d+]/g, '');
    const callLink = numericPhone ? `tel:${numericPhone}` : '#';
    const messageLink = numericPhone ? `https://wa.me/${numericPhone.replace(/\D/g, '')}` : '#';

    const content = (
        <div className="space-y-5">
            <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-upn-green/15 dark:bg-upn-gold/15 border border-upn-green/20 dark:border-upn-gold/30 shrink-0">
                    {avatar ? (
                        <img src={avatar} alt={mentee.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-upn-green dark:text-upn-gold text-xl font-black">
                            {mentee.name[0]?.toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-dark-text truncate">{mentee.name}</h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mt-1">
                        {mentee.nim} | {mentee.major}
                    </p>
                </div>
            </div>

            <div className="space-y-3 border-t border-b border-slate-200 dark:border-dark-border py-4">
                <ProfileRow icon={Phone} label="Telepon" value={phone} />
                <ProfileRow icon={MapPin} label="Alamat" value={address} />
                <ProfileRow icon={FileText} label="Bio" value={bio} />
            </div>

            <div>
                <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500 dark:text-dark-text-muted mb-2">
                    Social Links
                </p>
                {socialItems.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {socialItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-dark-bg border border-slate-200 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-dark-text hover:bg-slate-200 dark:hover:bg-dark-border transition-colors"
                                >
                                    <Icon size={14} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-slate-400 dark:text-dark-text-muted">Belum ada social link.</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                    href={messageLink}
                    target={messageLink === '#' ? undefined : '_blank'}
                    rel={messageLink === '#' ? undefined : 'noreferrer'}
                    className={cn(
                        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors',
                        messageLink === '#'
                            ? 'bg-slate-100 dark:bg-dark-border text-slate-400 dark:text-dark-text-muted cursor-not-allowed pointer-events-none'
                            : 'bg-upn-green text-white hover:bg-green-800'
                    )}
                >
                    <MessageCircle size={16} />
                    <span>Kirim Pesan</span>
                </a>
                <a
                    href={callLink}
                    className={cn(
                        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors border',
                        callLink === '#'
                            ? 'bg-slate-50 dark:bg-dark-bg border-slate-200 dark:border-dark-border text-slate-400 dark:text-dark-text-muted cursor-not-allowed pointer-events-none'
                            : 'bg-white dark:bg-dark-surface border-upn-green/30 dark:border-upn-gold/40 text-upn-green dark:text-upn-gold hover:bg-upn-green/10 dark:hover:bg-upn-gold/10'
                    )}
                >
                    <Phone size={16} />
                    <span>Telepon</span>
                </a>
            </div>
        </div>
    );

    if (!isMobile) {
        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="sm"
                title="Detail Mentee"
                className="max-w-[480px] dark:bg-dark-surface dark:border dark:border-dark-border"
            >
                {content}
            </Modal>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden" role="dialog" aria-modal="true">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                aria-label="Tutup drawer"
            />
            <div className="relative w-full rounded-t-3xl bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border shadow-2xl max-h-[88vh] overflow-y-auto p-5 pb-6">
                <div className="w-12 h-1.5 bg-slate-300 dark:bg-dark-border rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-black text-slate-800 dark:text-dark-text">Detail Mentee</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-bg transition-colors"
                        aria-label="Tutup"
                    >
                        <X size={18} className="text-slate-500 dark:text-dark-text-muted" />
                    </button>
                </div>
                {content}
            </div>
        </div>
    );
};

const ProfileRow: React.FC<{
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
}> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-2.5">
        <Icon size={16} className="mt-0.5 text-upn-green dark:text-upn-gold shrink-0" />
        <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-dark-text-muted">{label}</p>
            <p className="text-sm text-slate-800 dark:text-dark-text break-words">{value}</p>
        </div>
    </div>
);

export default MentorGroupPage;
