import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Search, Filter, Users, GraduationCap, MapPin, Mail, ArrowRight } from 'lucide-react';

const SocialPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
    const [selectedInterest, setSelectedInterest] = useState<string>('all');

    // Mock student data
    const students = [
        { id: 1, name: 'Ahmad Fauzi', nim: '2010123456', major: 'S1 Informatika', faculty: 'Teknik', interests: ['Programming', 'Gaming', 'Music'], avatar: 'AF' },
        { id: 2, name: 'Siti Aminah', nim: '2010123457', major: 'S1 Sistem Informasi', faculty: 'Teknik', interests: ['Design', 'Photography', 'Traveling'], avatar: 'SA' },
        { id: 3, name: 'Budi Santoso', nim: '2010123458', major: 'S1 Teknik Elektro', faculty: 'Teknik', interests: ['Sports', 'Technology', 'Business'], avatar: 'BS' },
        { id: 4, name: 'Dewi Lestari', nim: '2010123459', major: 'S1 Informatika', faculty: 'Teknik', interests: ['Reading', 'Art', 'Volunteering'], avatar: 'DL' },
        { id: 5, name: 'Eko Prasetyo', nim: '2010123460', major: 'S1 Sistem Informasi', faculty: 'Teknik', interests: ['Programming', 'Cooking', 'Music'], avatar: 'EP' },
        { id: 6, name: 'Fitri Handayani', nim: '2010123461', major: 'S1 Teknik Elektro', faculty: 'Teknik', interests: ['Sports', 'Dancing', 'Art'], avatar: 'FH' },
        { id: 7, name: 'Rina Wijaya', nim: '2010123462', major: 'S1 Manajemen', faculty: 'Ekonomi', interests: ['Business', 'Traveling', 'Writing'], avatar: 'RW' },
        { id: 8, name: 'Dedi Kurniawan', nim: '2010123463', major: 'S1 Akuntansi', faculty: 'Ekonomi', interests: ['Technology', 'Reading', 'Sports'], avatar: 'DK' },
        { id: 9, name: 'Maya Sari', nim: '2010123464', major: 'S1 Ilmu Hukum', faculty: 'Hukum', interests: ['Volunteering', 'Art', 'Music'], avatar: 'MS' },
        { id: 10, name: 'Andi Pratama', nim: '2010123465', major: 'S1 Ilmu Komunikasi', faculty: 'Ilmu Komunikasi', interests: ['Photography', 'Design', 'Writing'], avatar: 'AP' },
        { id: 11, name: 'Citra Lestari', nim: '2010123466', major: 'S1 Ilmu Komunikasi', faculty: 'Ilmu Komunikasi', interests: ['Music', 'Dancing', 'Traveling'], avatar: 'CL' },
        { id: 12, name: 'Fajar Nugraha', nim: '2010123467', major: 'S1 FISIP', faculty: 'FISIP', interests: ['Business', 'Volunteering', 'Sports'], avatar: 'FN' },
    ];

    const faculties = ['all', 'Teknik', 'Ekonomi', 'Hukum', 'Ilmu Komunikasi', 'FISIP'];
    const interests = ['all', 'Programming', 'Design', 'Music', 'Sports', 'Photography', 'Gaming', 'Reading', 'Traveling', 'Cooking', 'Art', 'Technology', 'Business', 'Volunteering', 'Dancing', 'Writing'];

    const filteredStudents = students.filter(student => {
        // Search filter
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.nim.includes(searchQuery);
        if (!matchesSearch) return false;

        // Faculty filter
        if (selectedFaculty !== 'all' && student.faculty !== selectedFaculty) return false;

        // Interest filter
        if (selectedInterest !== 'all' && !student.interests.includes(selectedInterest)) return false;

        return true;
    });

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Teman Sebaya</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                        Temukan dan terhubung dengan mahasiswa baru
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama, NIM, atau jurusan..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Chips - Faculty */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={16} className="text-slate-400 dark:text-dark-text-muted" />
                        <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text">Fakultas</h3>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {faculties.map(faculty => (
                            <button
                                key={faculty}
                                onClick={() => setSelectedFaculty(faculty)}
                                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${selectedFaculty === faculty
                                        ? 'bg-upn-green text-upn-gold'
                                        : 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface'
                                    }`}
                            >
                                {faculty === 'all' ? 'Semua' : faculty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Chips - Interests */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={16} className="text-slate-400 dark:text-dark-text-muted" />
                        <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text">Minat</h3>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {interests.map(interest => (
                            <button
                                key={interest}
                                onClick={() => setSelectedInterest(interest)}
                                className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all shrink-0 ${selectedInterest === interest
                                        ? 'bg-upn-gold text-upn-green'
                                        : 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface'
                                    }`}
                            >
                                {interest === 'all' ? 'Semua' : interest}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Student Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {filteredStudents.length === 0 ? (
                        <div className="col-span-full card p-8 sm:p-12 text-center border-2 border-dashed border-slate-200 dark:border-dark-border">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-4">
                                <Users size={32} />
                            </div>
                            <p className="text-base sm:text-lg text-slate-400 dark:text-dark-text-muted font-bold">
                                {searchQuery ? 'Tidak ada hasil pencarian' : 'Tidak ada mahasiswa'}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 dark:text-dark-text-muted mt-2">
                                {searchQuery ? 'Coba kata kunci lain' : 'Semua mahasiswa sudah ditampilkan'}
                            </p>
                        </div>
                    ) : (
                        filteredStudents.map(student => (
                            <StudentCard key={student.id} student={student} />
                        ))
                    )}
                </div>

                {/* Results Count */}
                {filteredStudents.length > 0 && (
                    <div className="text-center py-4">
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted">
                            Menampilkan <span className="font-bold text-upn-green dark:text-upn-gold">{filteredStudents.length}</span> dari <span className="font-bold">{students.length}</span> mahasiswa
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

// Student Card Component
const StudentCard: React.FC<{ student: any }> = ({ student }) => {
    const getAvatarColor = (initials: string) => {
        const colors = [
            'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500',
            'bg-teal-500', 'bg-orange-500', 'bg-cyan-500', 'bg-rose-500',
        ];
        const index = student.id % colors.length;
        return colors[index];
    };

    return (
        <div className="card p-3 sm:p-4 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {/* Background Image/Avatar */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-upn-green/20 to-upn-gold/20 dark:from-upn-green/30 dark:to-upn-gold/30 rounded-xl overflow-hidden mb-3">
                <div className={`absolute inset-0 flex items-center justify-center ${getAvatarColor(student.avatar)}`}>
                    <span className="text-white text-xl sm:text-2xl font-black">{student.avatar}</span>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 dark:bg-dark-surface/90 rounded-full text-[10px] font-bold text-upn-green dark:text-upn-gold">
                    {student.faculty}
                </div>
            </div>

            {/* Student Info */}
            <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text truncate">
                    {student.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                    {student.nim}
                </p>
                <p className="text-[10px] sm:text-xs text-upn-green dark:text-upn-gold font-semibold mt-1 truncate">
                    {student.major}
                </p>

                {/* Interests */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {student.interests.slice(0, 3).map((interest: string, i: number) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 bg-upn-green/10 dark:bg-upn-green/20 text-upn-green dark:text-upn-gold rounded-full text-[9px] font-medium"
                        >
                            {interest}
                        </span>
                    ))}
                    {student.interests.length > 3 && (
                        <span className="text-[9px] text-slate-400 dark:text-dark-text-muted">
                            +{student.interests.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-3 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl text-xs font-bold text-slate-600 dark:text-dark-text-muted hover:bg-upn-green hover:text-upn-gold hover:border-upn-green dark:hover:border-upn-gold transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                <Mail size={14} />
                <span>Hubungi</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        </div>
    );
};

export default SocialPage;
