import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, Filter, MoreVertical, Shield, UserCog, UserMinus } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_USERS = [
    { id: '1', name: 'John Admin', email: 'admin@upnvj.ac.id', role: 'admin', status: 'Active' },
    { id: '2', name: 'Kak Mentor 1', email: 'mentor1@upnvj.ac.id', role: 'mentor', status: 'Active' },
    { id: '3', name: 'Mentee Student', email: 'mentee@upnvj.ac.id', role: 'mentee', status: 'Verified' },
    { id: '4', name: 'Another Admin', email: 'admin2@upnvj.ac.id', role: 'admin', status: 'Inactive' },
];

const AdminUsers: React.FC = () => {
    const [users] = useState(MOCK_USERS);

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-upn-green">Manajemen User</h1>
                        <p className="text-slate-500 font-medium">Kendalikan akses dan peran seluruh pengguna sistem SIERA.</p>
                    </div>
                    <button className="btn-primary py-3 px-8 text-sm font-black">TAMBAH USER BARU</button>
                </div>

                <div className="card bg-white p-0 overflow-hidden shadow-2xl shadow-slate-200/40">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 w-full max-w-lg">
                            <Search size={20} className="text-slate-400" />
                            <input placeholder="Cari berdasarkan nama atau email..." className="bg-transparent text-sm font-medium outline-none w-full" />
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 text-xs font-black text-slate-400 hover:text-upn-green uppercase tracking-widest transition-all"><Filter size={18} /> Filter</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <th className="px-8 py-5 border-b border-slate-50">User Profile</th>
                                    <th className="px-4 py-5 border-b border-slate-50">Role</th>
                                    <th className="px-4 py-5 border-b border-slate-50">Status</th>
                                    <th className="px-8 py-5 border-b border-slate-50 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-upn-green font-black shadow-sm group-hover:bg-white transition-all">
                                                    {user.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 leading-none">{user.name}</p>
                                                    <p className="text-[11px] font-bold text-slate-400 mt-1">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-6">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                                                user.role === 'admin' ? "bg-red-50 text-red-600 border-red-100" :
                                                    user.role === 'mentor' ? "bg-upn-gold/10 text-upn-green border-upn-gold/20" :
                                                        "bg-blue-50 text-blue-600 border-blue-100"
                                            )}>
                                                {user.role === 'admin' && <Shield size={12} />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-6">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                <div className={clsx(
                                                    "w-2 h-2 rounded-full",
                                                    user.status === 'Inactive' ? "bg-slate-300" : "bg-upn-green"
                                                )} />
                                                {user.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-upn-green transition-all" title="Edit Role"><UserCog size={18} /></button>
                                                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 transition-all" title="Delete User"><UserMinus size={18} /></button>
                                                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all"><MoreVertical size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 4 of 48 users total</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-upn-green disabled:opacity-50" disabled>PREVIOUS</button>
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:text-upn-green">NEXT PAGE</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminUsers;
