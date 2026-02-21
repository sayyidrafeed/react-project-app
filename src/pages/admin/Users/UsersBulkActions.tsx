import React from 'react';
import { CheckCircle } from 'lucide-react';

interface UsersBulkActionsProps {
    selectedCount: number;
}

export const UsersBulkActions: React.FC<UsersBulkActionsProps> = ({ selectedCount }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="card p-3 sm:p-4 bg-upn-green/5 border-2 border-upn-green/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-upn-green" />
                    <span className="text-sm sm:text-base font-semibold text-slate-800">
                        {selectedCount} user dipilih
                    </span>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                        Kirim Notifikasi
                    </button>
                    <button className="px-3 py-2 btn-primary rounded-lg text-xs sm:text-sm font-semibold">
                        Ubah Role
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersBulkActions;
