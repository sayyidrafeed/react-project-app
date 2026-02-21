import React from 'react';
import { XCircle, CheckCircle, Phone, GraduationCap, Calendar as CalendarIcon, Users } from 'lucide-react';
import type { InfoCardProps, UserModalProps } from './types';

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600 uppercase">{title}</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-800">{value}</p>
        </div>
    );
};

const getStatusColor = (status: string) => {
    return status === 'Active' ? 'text-green-600' : 'text-red-600';
};

const getStatusBg = (status: string) => {
    return status === 'Active' ? 'bg-green-100' : 'bg-red-100';
};

export const UserModal: React.FC<UserModalProps> = ({ isOpen, user, onClose }) => {
    if (!isOpen || !user) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-200">
                    <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-800">Detail Pengguna</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Tutup modal"
                    >
                        <XCircle size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-upn-green/10 rounded-xl flex items-center justify-center text-upn-green shrink-0">
                            {user.role === 'admin' ? (
                                <GraduationCap size={32} />
                            ) : user.role === 'mentor' ? (
                                <Users size={32} />
                            ) : (
                                <Users size={32} />
                            )}
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-xl sm:text-2xl font-bold text-slate-800">
                                {user.name}
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">
                                {user.email}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusBg(user.status)} ${getStatusColor(user.status)}`}>
                                    {user.role}
                                </span>
                                {user.status === 'Active' ? (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-600">
                                        Aktif
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-100 text-red-600">
                                        Inaktif
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <InfoCard
                        title="NIM"
                        value={user.nim || '-'}
                        icon={Phone}
                    />
                    <InfoCard
                        title="Fakultas"
                        value={user.faculty || '-'}
                        icon={GraduationCap}
                    />
                    <InfoCard
                        title="Program Studi"
                        value={user.major || '-'}
                        icon={GraduationCap}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <InfoCard
                        title="Status Akun"
                        value={user.status}
                        icon={user.status === 'Active' ? CheckCircle : XCircle}
                    />
                    <InfoCard
                        title="Dibuat Pada"
                        value={user.createdAt || '-'}
                        icon={CalendarIcon}
                    />
                    <InfoCard
                        title="Login Terakhir"
                        value={user.lastLogin || '-'}
                        icon={CalendarIcon}
                    />
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-200 mt-4">
                    <button className="flex-1 btn-primary py-3 rounded-xl text-sm sm:text-base font-semibold">
                        Simpan Perubahan
                    </button>
                    <button className="flex-1 py-3 px-4 border-2 border-slate-300 rounded-xl text-sm sm:text-base font-semibold text-slate-600 hover:bg-slate-100 transition-all">
                        Kirim Email Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
