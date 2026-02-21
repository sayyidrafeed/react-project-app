import React from 'react';
import { Download } from 'lucide-react';

export const UsersHeader: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Manajemen User</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Kelola pengguna, role, dan akses platform
                </p>
            </div>
            <div className="flex gap-2">
                <button className="btn-secondary text-xs sm:text-sm">
                    <Download size={16} className="mr-1" />
                    Unduh Laporan
                </button>
                <button className="btn-primary text-xs sm:text-sm">
                    + Tambah User
                </button>
            </div>
        </div>
    );
};

export default UsersHeader;
