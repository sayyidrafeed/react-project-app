import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { Calendar, CheckSquare, Users, Star, Bell, TrendingUp } from 'lucide-react';
import { MOCK_TASKS, MOCK_EVENTS } from '../data/mockData';

export const MenteeHome: React.FC = () => {
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [events, _setEvents] = useState(MOCK_EVENTS);

    useEffect(() => {
        const savedTasks = localStorage.getItem('siera_tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Failed to parse saved tasks:', error);
            }
        }
    }, []);

    const completedTasks = tasks.filter(t => t.grade !== null);
    const averageGrade = completedTasks.length > 0
        ? Math.round(completedTasks.reduce((acc, t) => acc + (t.grade || 0), 0) / completedTasks.length)
        : 0;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="relative overflow-hidden bg-upn-green rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-green-900/40">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-upn-gold/20 text-upn-gold rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-upn-gold/30">
                                <Star size={12} /> Mahasiswa Bela Negara
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Selamat Berjuang, <span className="text-upn-gold">PATRIVER!</span>
                            </h1>
                            <p className="mt-4 text-green-50/70 text-lg">
                                Satu portal untuk memantau progres PKKMB-U kamu. Pastikan semua tugas dan kehadiran terverifikasi.
                            </p>
                        </div>
                        <div className="hidden lg:block w-48 h-48 bg-upn-gold/10 rounded-full blur-3xl absolute -right-12 -top-12"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <StatsCard title="Total Tugas" value={`${completedTasks.length}/${tasks.length}`} icon={CheckSquare} description="Update terakhir hari ini" />
                    <StatsCard title="Rata-rata Grade" value={`${averageGrade}`} icon={Star} description={`Peringkat #${averageGrade >= 80 ? '1' : averageGrade >= 60 ? '2' : '3'}`} variant="gold" />
                    <StatsCard title="Notifikasi" value="0" icon={Bell} description="Tidak ada pesan baru" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xl font-black flex items-center gap-2">
                            <TrendingUp size={20} className="text-upn-gold" /> Agenda Mendatang
                        </h3>
                        <div className="card p-6 space-y-4">
                            {events.slice(0, 3).map(event => (
                                <div key={event.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="w-12 h-12 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green shrink-0">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-slate-800 text-sm">{event.title}</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1">{event.date} • {event.time}</p>
                                        <p className="text-[10px] text-upn-green font-black">{event.location}</p>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && (
                                <div className="card text-center py-12 border-dashed border-2 flex flex-col items-center justify-center bg-white/50">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                                        <Calendar size={32} />
                                    </div>
                                    <p className="text-slate-400 font-bold">Belum ada agenda terjadwal hari ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-black">Informasi Mentor</h3>
                        <div className="card bg-white p-6 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-upn-green/5 rounded-2xl border border-upn-green/10 flex items-center justify-center text-upn-green mb-4">
                                <Users size={32} />
                            </div>
                            <h4 className="font-black text-upn-green">Kak Mentor TBA</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Grup 21 - PATRIBERA</p>
                            <button className="mt-6 w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-100 transition-all">
                                KIRIM PESAN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export const MentorHome: React.FC = () => {
    const [mentees, _setMentees] = useState([
        { id: 'm1', name: 'Ahmad Fauzi', nim: '2010123456', major: 'S1 Informatika', averageGrade: 85, tasksCompleted: 4, tasksPending: 2, attendanceRate: 92 },
        { id: 'm2', name: 'Siti Aminah', nim: '2010123457', major: 'S1 Sistem Informasi', averageGrade: 78, tasksCompleted: 3, tasksPending: 3, attendanceRate: 88 },
        { id: 'm3', name: 'Budi Santoso', nim: '2010123458', major: 'S1 Teknik Elektro', averageGrade: 90, tasksCompleted: 5, tasksPending: 1, attendanceRate: 95 },
        { id: 'm4', name: 'Dewi Lestari', nim: '2010123459', major: 'S1 Informatika', averageGrade: 82, tasksCompleted: 4, tasksPending: 2, attendanceRate: 90 },
        { id: 'm5', name: 'Eko Prasetyo', nim: '2010123460', major: 'S1 Sistem Informasi', averageGrade: 75, tasksCompleted: 3, tasksPending: 3, attendanceRate: 85 },
        { id: 'm6', name: 'Fitri Handayani', nim: '2010123461', major: 'S1 Teknik Elektro', averageGrade: 88, tasksCompleted: 5, tasksPending: 1, attendanceRate: 93 }
    ]);

    const totalMentees = mentees.length;
    const activeMentees = mentees.filter(m => m.averageGrade > 0).length;
    const pendingMentees = mentees.filter(m => m.averageGrade === 0).length;
    const averageAttendance = Math.round(mentees.reduce((acc, m) => acc + m.attendanceRate, 0) / mentees.length);
    const pendingTasks = mentees.reduce((acc, m) => acc + m.tasksPending, 0);

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-1">Ringkasan Grup</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Kelompok 21 - PATRIBERA</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => alert('Fitur Unduh Laporan akan segera tersedia!')} className="btn-secondary text-xs">UNDUH LAPORAN</button>
                        <button onClick={() => alert('Fitur Broadcast Pesan akan segera tersedia!')} className="btn-primary text-xs">BROADCAST PESAN</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatsCard title="Total Mentee" value={totalMentees} icon={Users} description={`${activeMentees} Aktif, ${pendingMentees} Pending`} />
                    <StatsCard title="Validasi Tugas" value={pendingTasks} icon={CheckSquare} description="Butuh verifikasi segera" variant="white" trend={{ value: 3, isUp: true }} />
                    <StatsCard title="Avg. Kehadiran" value={`${averageAttendance}%`} icon={TrendingUp} description={averageAttendance >= 90 ? 'Sangat Baik' : averageAttendance >= 80 ? 'Baik' : 'Perlu Perhatian'} variant={averageAttendance >= 90 ? 'green' : 'white'} />
                </div>

                <div className="card p-6">
                    <h3 className="font-black text-lg mb-4">Daftar Mentee</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mentees.map(mentee => (
                            <div key={mentee.id} className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green shrink-0">
                                        <Users size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-slate-800">{mentee.name}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{mentee.nim} • {mentee.major}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-white rounded-lg p-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Grade</p>
                                        <p className="text-xl font-black">{mentee.averageGrade === 0 ? '-' : mentee.averageGrade}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Tugas</p>
                                        <p className="text-xl font-black">{mentee.tasksCompleted}/{mentee.tasksCompleted + mentee.tasksPending}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Kehadiran</p>
                                        <p className="text-xl font-black">{mentee.attendanceRate}%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export const AdminHome: React.FC = () => {
    const [users, _setUsers] = useState([
        { id: 'u1', name: 'Admin Utama', email: 'admin@upnvj.ac.id', role: 'admin', status: 'Active' },
        { id: 'u2', name: 'Kak Mentor Budi', email: 'mentor1@upnvj.ac.id', role: 'mentor', status: 'Active' },
        { id: 'u3', name: 'Kak Mentor Siti', email: 'mentor2@upnvj.ac.id', role: 'mentor', status: 'Active' },
        { id: 'u4', name: 'Ahmad Fauzi', email: 'mentee1@upnvj.ac.id', role: 'mentee', status: 'Active' },
        { id: 'u5', name: 'Siti Aminah', email: 'mentee2@upnvj.ac.id', role: 'mentee', status: 'Active' },
        { id: 'u6', name: 'Budi Santoso', email: 'mentee3@upnvj.ac.id', role: 'mentee', status: 'Active' },
        { id: 'u7', name: 'Dewi Lestari', email: 'mentee4@upnvj.ac.id', role: 'mentee', status: 'Active' },
        { id: 'u8', name: 'Admin Cadangan', email: 'admin2@upnvj.ac.id', role: 'admin', status: 'Inactive' }
    ]);

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const adminCount = users.filter(u => u.role === 'admin').length;
    const mentorCount = users.filter(u => u.role === 'mentor').length;
    const menteeCount = users.filter(u => u.role === 'mentee').length;

    const activities = [
        { id: 1, action: 'User Baru', detail: 'Ahmad Fauzi ditambahkan', time: '2 jam yang lalu' },
        { id: 2, action: 'Update Role', detail: 'Siti Aminah diubah ke Mentor', time: '3 jam yang lalu' },
        { id: 3, action: 'Tugas Baru', detail: 'Day 1 Resume dibuat', time: '4 jam yang lalu' },
        { id: 4, action: 'Event Baru', detail: 'Pembukaan PKKMB-U dijadwal', time: '5 jam yang lalu' }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <h1 className="text-4xl font-black">Admin Oversight</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard title="Total Pengguna" value={totalUsers} icon={Users} description={`${activeUsers} Aktif, ${totalUsers - activeUsers} Inaktif`} trend={{ value: 5, isUp: true }} />
                    <StatsCard title="Admin" value={adminCount} icon={Users} description="Pengelola sistem" variant="gold" />
                    <StatsCard title="Mentor" value={mentorCount} icon={Users} description="Membimbing kelompok" />
                    <StatsCard title="Mentee" value={menteeCount} icon={Users} description="Mahasiswa baru" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 card p-6">
                        <h3 className="font-black text-lg mb-4">Statistik Peran</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-upn-green/10 rounded-xl p-4 text-center">
                                <p className="text-3xl font-black text-upn-green">{adminCount}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase mt-2">Admin</p>
                            </div>
                            <div className="bg-upn-gold/10 rounded-xl p-4 text-center">
                                <p className="text-3xl font-black text-upn-gold">{mentorCount}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase mt-2">Mentor</p>
                            </div>
                            <div className="bg-blue-500/10 rounded-xl p-4 text-center">
                                <p className="text-3xl font-black text-blue-600">{menteeCount}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase mt-2">Mentee</p>
                            </div>
                        </div>
                    </div>
                    <div className="card space-y-6">
                        <h3 className="font-black text-lg border-b border-slate-100 pb-4">Log Aktivitas Terbaru</h3>
                        <div className="space-y-4">
                            {activities.map(activity => (
                                <div key={activity.id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black shrink-0">ADM</div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">{activity.action}</p>
                                        <p className="text-[10px] text-slate-400">{activity.detail}</p>
                                        <p className="text-[10px] text-slate-400">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
