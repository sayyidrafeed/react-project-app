import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ArrowLeft, Instagram, Twitter, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface Student {
    id: string;
    name: string;
    faculty: string;
    major: string;
    interests: string[];
    skills: string[];
    group?: string;
    avatar: string;
    banner: string;
    email?: string;
    phone?: string;
    address?: string;
    bio?: string;
    belanegScore?: number;
}

const MOCK_STUDENTS: Student[] = [
    {
        id: '1',
        name: 'Budi Santoso',
        faculty: 'Teknik',
        major: 'Informatika',
        group: '42',
        interests: ['Web Development', 'UI/UX Design', 'Machine Learning'],
        skills: ['React', 'TypeScript', 'Node.js', 'Python'],
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
        banner: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=800',
        email: 'budi.santoso@upnvj.ac.id',
        phone: '+62 812-3456-7890',
        address: 'Jakarta, Indonesia',
        bio: 'Passionate developer yang suka eksplorasi teknologi terbaru',
        belanegScore: 125
    },
    {
        id: '2',
        name: 'Siti Aminah',
        faculty: 'Kedokteran',
        major: 'Kedokteran Umum',
        group: '157',
        interests: ['Public Health', 'Community Service', 'Research'],
        skills: ['Patient Care', 'Medical Research', 'Communication'],
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        banner: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=800',
        email: 'siti.aminah@upnvj.ac.id',
        phone: '+62 812-3456-7891',
        address: 'Jakarta, Indonesia',
        bio: 'Dokter muda yang peduli kesehatan masyarakat',
        belanegScore: 132
    },
    {
        id: '3',
        name: 'Andi Wijaya',
        faculty: 'Hukum',
        major: 'Ilmu Hukum',
        group: '89',
        interests: ['Debate', 'Law Practice', 'Legal Writing'],
        skills: ['Public Speaking', 'Legal Research', 'Negotiation'],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800',
        email: 'andi.wijaya@upnvj.ac.id',
        phone: '+62 812-3456-7892',
        address: 'Jakarta, Indonesia',
        bio: 'Advokat muda dengan passion untuk keadilan',
        belanegScore: 128
    },
    {
        id: '4',
        name: 'Dewi Lestari',
        faculty: 'Ekonomi',
        major: 'Manajemen',
        group: '176',
        interests: ['Entrepreneurship', 'Business Strategy', 'Finance'],
        skills: ['Business Planning', 'Financial Analysis', 'Leadership'],
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
        banner: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=800',
        email: 'dewi.lestari@upnvj.ac.id',
        phone: '+62 812-3456-7893',
        address: 'Jakarta, Indonesia',
        bio: 'Entrepreneur muda dengan visi mengubah industri',
        belanegScore: 120
    },
    {
        id: '5',
        name: 'Rizky Pratama',
        faculty: 'FISIP',
        major: 'Ilmu Komunikasi',
        group: '63',
        interests: ['Photography', 'Content Creation', 'Social Media'],
        skills: ['Photography', 'Video Editing', 'Creative Writing'],
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        email: 'rizky.pratama@upnvj.ac.id',
        phone: '+62 812-3456-7894',
        address: 'Jakarta, Indonesia',
        bio: 'Content creator yang mencintai storytelling visual',
        belanegScore: 118
    },
    {
        id: '6',
        name: 'Nina Kartika',
        faculty: 'Ilmu Kesehatan',
        major: 'Keperawatan',
        group: '134',
        interests: ['Social Service', 'Healthcare', 'Community Development'],
        skills: ['Nursing', 'Patient Support', 'Health Education'],
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
        banner: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?auto=format&fit=crop&q=80&w=800',
        email: 'nina.kartika@upnvj.ac.id',
        phone: '+62 812-3456-7895',
        address: 'Jakarta, Indonesia',
        bio: 'Perawat dengan dedikasi tinggi untuk pasien',
        belanegScore: 130
    }
];

const StudentProfileDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const student = MOCK_STUDENTS.find(s => s.id === id);

    if (!student) {
        return (
            <DashboardLayout>
                <div className="text-center py-12">
                    <h1 className="text-2xl font-black text-slate-800">Profil tidak ditemukan</h1>
                    <button
                        onClick={() => navigate('/mentee/discover')}
                        className="mt-6 px-6 py-3 bg-upn-green text-white rounded-xl font-black"
                    >
                        Kembali ke Discover
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/mentee/discover')}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-dark-text">Profil Teman</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Lihat dan pelajari lebih lanjut
                        </p>
                    </div>
                </div>

                {/* Banner & Avatar */}
                <div className="rounded-2xl overflow-hidden relative">
                    <div
                        className="h-40 sm:h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${student.banner})` }}
                    >
                        <div className="w-full h-full bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Avatar */}
                    <div className="px-6 sm:px-8 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 relative z-10 mb-6">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden">
                                <img
                                    src={student.avatar}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text flex items-center gap-2">
                                    {student.name}
                                    <Shield size={28} className="text-upn-gold" />
                                </h2>
                                <p className="text-sm font-black text-upn-green uppercase tracking-widest mt-1">
                                    {student.faculty} • {student.major}
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-6">
                            <button className="p-3 bg-slate-100 dark:bg-dark-border hover:bg-upn-green/10 dark:hover:bg-upn-green/10 rounded-xl text-slate-600 dark:text-dark-text-muted hover:text-upn-green transition-colors">
                                <Instagram size={20} />
                            </button>
                            <button className="p-3 bg-slate-100 dark:bg-dark-border hover:bg-upn-green/10 dark:hover:bg-upn-green/10 rounded-xl text-slate-600 dark:text-dark-text-muted hover:text-upn-green transition-colors">
                                <Twitter size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {student.bio && (
                    <div className="card p-6">
                        <h3 className="text-lg font-black text-slate-800 dark:text-dark-text mb-3">Tentang</h3>
                        <p className="text-slate-600 dark:text-dark-text-muted leading-relaxed">{student.bio}</p>
                    </div>
                )}

                {/* Group */}
                {student.group && (
                    <div className="card p-6 bg-upn-gold/5 dark:bg-upn-gold/10 border-l-4 border-upn-gold">
                        <h3 className="text-lg font-black text-slate-800 dark:text-dark-text mb-3">Kelompok</h3>
                        <p className="text-3xl font-black text-upn-green dark:text-upn-gold">{student.group}</p>
                    </div>
                )}

                {/* Contact & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {student.email && (
                        <div className="card p-4 flex items-start gap-3">
                            <Mail size={20} className="text-upn-green mt-1 shrink-0" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                    Email
                                </p>
                                <p className="text-sm font-semibold text-slate-800 dark:text-dark-text break-all">
                                    {student.email}
                                </p>
                            </div>
                        </div>
                    )}
                    {student.phone && (
                        <div className="card p-4 flex items-start gap-3">
                            <Phone size={20} className="text-upn-green mt-1 shrink-0" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                    Telepon
                                </p>
                                <p className="text-sm font-semibold text-slate-800 dark:text-dark-text">
                                    {student.phone}
                                </p>
                            </div>
                        </div>
                    )}
                    {student.address && (
                        <div className="card p-4 flex items-start gap-3">
                            <MapPin size={20} className="text-upn-green mt-1 shrink-0" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                    Lokasi
                                </p>
                                <p className="text-sm font-semibold text-slate-800 dark:text-dark-text">
                                    {student.address}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Interests */}
                <div className="card p-6">
                    <h3 className="text-lg font-black text-slate-800 dark:text-dark-text mb-4">Minat & Passion</h3>
                    <div className="flex flex-wrap gap-3">
                        {student.interests.map((interest, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-upn-green/10 dark:bg-upn-green/20 border border-upn-green/30 dark:border-upn-green/40 rounded-full text-sm font-black text-upn-green dark:text-upn-gold"
                            >
                                #{interest}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                {student.skills && student.skills.length > 0 && (
                    <div className="card p-6">
                        <h3 className="text-lg font-black text-slate-800 dark:text-dark-text mb-4">Keahlian</h3>
                        <div className="flex flex-wrap gap-3">
                            {student.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default StudentProfileDetail;
