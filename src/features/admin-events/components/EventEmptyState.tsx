import React from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../ui/Card';

interface EventEmptyStateProps {
    hasFilters: boolean;
}

export const EventEmptyState: React.FC<EventEmptyStateProps> = ({ hasFilters }) => {
    return (
        <Card className="text-center py-20 bg-slate-50 border-dashed border-2">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-sm mx-auto">
                <Calendar size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
                {hasFilters ? 'Tidak Ada Event Ditemukan' : 'Belum Ada Event'}
            </h3>
            <p className="text-slate-400 mt-2 max-w-sm mx-auto">
                {hasFilters
                    ? 'Coba ubah filter pencarian Anda untuk menemukan event yang sesuai.'
                    : 'Silakan tambahkan event baru untuk memulai jadwal kegiatan PKKMB-U tahun ini.'}
            </p>
        </Card>
    );
};

export default EventEmptyState;
