import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertTriangle, Send, Bell, Clock, X } from 'lucide-react';

interface Alert {
    id: number;
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    time: string;
    active: boolean;
}

const BroadcastPage: React.FC = () => {
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [targetAudience, setTargetAudience] = useState<'all' | 'mentee' | 'mentor' | 'admin'>('all');
    const [isSending, setIsSending] = useState(false);
    const [activeAlerts, setActiveAlerts] = useState<Alert[]>([
        { id: 1, title: 'Jadwal Tambahan', message: 'Jadwal kegiatan PKKMB Day 2 telah diperbarui', priority: 'medium', time: '5 menit yang lalu', active: true },
        { id: 2, title: 'Peringatan Deadline', message: 'Tugas Day 1 akan berakhir dalam 24 jam', priority: 'high', time: '1 jam yang lalu', active: true },
        { id: 3, title: 'Kegiatan Baru', message: 'Workshop Kepemimpinan ditambahkan ke jadwal', priority: 'low', time: '30 menit yang lalu', active: true },
    ]);

    const handleSend = async () => {
        if (!message.trim()) return;
        setIsSending(true);
        // Mock sending delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newAlert = {
            id: activeAlerts.length + 1,
            title: priority === 'high' ? 'Darurat' : priority === 'medium' ? 'Penting' : 'Informasi',
            message,
            priority,
            time: 'Baru saja',
            active: true,
        };
        setActiveAlerts([newAlert, ...activeAlerts]);
        setMessage('');
        setIsSending(false);
    };

    const handleDeleteAlert = (id: number) => {
        setActiveAlerts(activeAlerts.filter(alert => alert.id !== id));
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Broadcast Pesan</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                        Kirim notifikasi darurat ke seluruh pengguna platform
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Broadcast Form */}
                    <div className="card p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-4 flex items-center gap-2">
                            <Send size={18} className="text-upn-green dark:text-upn-gold" />
                            Buat Pesan Baru
                        </h3>

                        <div className="space-y-4">
                            {/* Priority Selection */}
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                                    Tingkat Prioritas
                                </label>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="priority"
                                            checked={priority === 'high'}
                                            onChange={() => setPriority('high')}
                                            className="accent-red-500 w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Tinggi</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="priority"
                                            checked={priority === 'medium'}
                                            onChange={() => setPriority('medium')}
                                            className="accent-yellow-500 w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Sedang</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="priority"
                                            checked={priority === 'low'}
                                            onChange={() => setPriority('low')}
                                            className="accent-blue-500 w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Rendah</span>
                                    </label>
                                </div>
                            </div>

                            {/* Target Audience */}
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                                    Target Audiens
                                </label>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="audience"
                                            checked={targetAudience === 'all'}
                                            onChange={() => setTargetAudience('all')}
                                            className="accent-upn-green w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Semua</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="audience"
                                            checked={targetAudience === 'mentee'}
                                            onChange={() => setTargetAudience('mentee')}
                                            className="accent-upn-green w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Mentee</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="audience"
                                            checked={targetAudience === 'mentor'}
                                            onChange={() => setTargetAudience('mentor')}
                                            className="accent-upn-green w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Mentor</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="audience"
                                            checked={targetAudience === 'admin'}
                                            onChange={() => setTargetAudience('admin')}
                                            className="accent-upn-green w-4 h-4"
                                        />
                                        <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Admin</span>
                                    </label>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                                    Pesan
                                </label>
                                <textarea
                                    placeholder="Tulis pesan notifikasi di sini..."
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted resize-none"
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            {/* Send Button */}
                            <button
                                onClick={handleSend}
                                disabled={!message.trim() || isSending}
                                className="w-full btn-primary py-3.5 sm:py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Mengirim...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Kirim Broadcast</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Live Pulse Feed */}
                    <div className="card p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text flex items-center gap-2">
                                <Bell size={18} className="text-upn-green dark:text-upn-gold animate-pulse" />
                                Live Pulse - Alert Aktif
                            </h3>
                            <span className="text-xs text-slate-500 dark:text-dark-text-muted">
                                {activeAlerts.length} notifikasi aktif
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {activeAlerts.length === 0 ? (
                            <div className="text-center py-8 sm:py-12 border-2 border-dashed border-slate-200 dark:border-dark-border rounded-xl bg-slate-50/50 dark:bg-dark-bg">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-4">
                                    <Bell size={32} />
                                </div>
                                <p className="text-sm sm:text-base text-slate-400 dark:text-dark-text-muted font-bold">
                                    Belum ada notifikasi aktif
                                </p>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mt-2">
                                    Buat notifikasi baru untuk mengirim pesan darurat
                                </p>
                            </div>
                        ) : (
                            activeAlerts.map(alert => (
                                <AlertCard
                                    key={alert.id}
                                    alert={alert}
                                    onDelete={() => handleDeleteAlert(alert.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

// Alert Card Component
interface AlertCardProps {
    alert: Alert;
    onDelete: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onDelete }) => {
    const priorityColors: Record<'low' | 'medium' | 'high', string> = {
        high: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
        medium: 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20',
        low: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
    };

    const priorityIconColors: Record<'low' | 'medium' | 'high', string> = {
        high: 'text-red-600 dark:text-red-400',
        medium: 'text-yellow-600 dark:text-yellow-400',
        low: 'text-blue-600 dark:text-blue-400',
    };

    return (
        <div className={`card p-3 sm:p-4 border-2 ${priorityColors[alert.priority]} hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-grow">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${alert.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                            alert.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                        <AlertTriangle size={18} className={priorityIconColors[alert.priority]} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                            <p className="font-bold text-slate-800 dark:text-dark-text text-sm">{alert.title}</p>
                            <p className="text-xs text-slate-500 dark:text-dark-text-muted">{alert.message}</p>
                        </div>
                        <button
                            onClick={onDelete}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                            title="Hapus notifikasi"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-xs text-slate-400 dark:text-dark-text-muted flex items-center gap-1">
                        <Clock size={12} />
                        <span>{alert.time}</span>
                    </div>
                    {alert.active && (
                        <span className="flex items-center gap-1 ml-2">
                            <span className="w-2 h-2 bg-upn-green rounded-full animate-pulse"></span>
                            <span className="text-upn-green dark:text-upn-gold font-bold">Aktif</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BroadcastPage;
