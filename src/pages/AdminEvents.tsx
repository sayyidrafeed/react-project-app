import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Calendar, Plus } from 'lucide-react';

const AdminEvents: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-upn-green">Manajemen Event</h1>
                        <p className="text-slate-500 font-medium">Atur jadwal kegiatan PKKMB-U.</p>
                    </div>
                    <button className="btn-primary py-3 px-8 text-sm font-black flex items-center gap-2">
                        <Plus size={18} /> TAMBAH EVENT
                    </button>
                </div>

                <div className="card text-center py-20 bg-slate-50 border-dashed border-2 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                        <Calendar size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Belum Ada Event</h3>
                    <p className="text-slate-400 mt-2 max-w-sm mx-auto">Silakan tambahkan event baru untuk memulai jadwal kegiatan PKKMB-U tahun ini.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminEvents;
