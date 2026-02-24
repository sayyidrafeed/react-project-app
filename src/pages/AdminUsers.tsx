import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, Filter, MoreVertical, Shield, UserCog, UserMinus } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_USERS = [
    { id: '1', name: 'John Admin', email: 'admin@upnvj.ac.id', role: 'admin', status: 'Active' },
    { id: '2', name: 'Kak Panitia 1', email: 'panitia1@upnvj.ac.id', role: 'panitia', status: 'Active' },
    { id: '3', name: 'Mentee Student', email: 'mentee@upnvj.ac.id', role: 'mentee', status: 'Verified' },
    { id: '4', name: 'Another Admin', email: 'admin2@upnvj.ac.id', role: 'admin', status: 'Inactive' },
];

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState(MOCK_USERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<{ id?: string, name: string, email: string, role: string, status: string } | null>(null);

    const handleOpenModal = (user?: typeof MOCK_USERS[0]) => {
        if (user) {
            setEditingUser(user);
        } else {
            setEditingUser({ name: '', email: '', role: 'mentee', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleSaveUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        if (editingUser.id) {
            // Edit existing
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editingUser } as any : u));
        } else {
            // Add new
            const newUser = { ...editingUser, id: Math.random().toString(36).substr(2, 9) };
            setUsers([...users, newUser as any]);
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-upn-green">Manajemen User</h1>
                        <p className="text-slate-500 font-medium">Kendalikan akses dan peran seluruh pengguna sistem SIERA.</p>
                    </div>
                    <button onClick={() => handleOpenModal()} className="btn-primary py-3 px-8 text-sm font-black">TAMBAH USER BARU</button>
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
                                                    user.role === 'panitia' ? "bg-upn-gold/10 text-upn-green border-upn-gold/20" :
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
                                                <button onClick={() => handleOpenModal(user)} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-upn-green transition-all" title="Edit Role"><UserCog size={18} /></button>
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
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {users.length} users total</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-upn-green disabled:opacity-50" disabled>PREVIOUS</button>
                            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:text-upn-green">NEXT PAGE</button>
                        </div>
                    </div>
                </div>

                {isModalOpen && editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                        <div className="bg-white w-full max-w-md rounded-2xl p-8 relative z-10 shadow-xl">
                            <h2 className="text-2xl font-black text-slate-800 mb-6">{editingUser.id ? 'Edit User' : 'Tambah User Baru'}</h2>
                            <form onSubmit={handleSaveUser} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Nama Lengkap</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-upn-green outline-none"
                                        value={editingUser.name}
                                        onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-upn-green outline-none"
                                        value={editingUser.email}
                                        onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Role</label>
                                        <select
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-upn-green outline-none bg-white"
                                            value={editingUser.role}
                                            onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                                        >
                                            <option value="mentee">Mentee</option>
                                            <option value="panitia">Panitia</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Status</label>
                                        <select
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-upn-green outline-none bg-white"
                                            value={editingUser.status}
                                            onChange={e => setEditingUser({ ...editingUser, status: e.target.value })}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors">BATAL</button>
                                    <button type="submit" className="flex-1 py-3 bg-upn-green text-white font-bold rounded-xl hover:bg-green-900 transition-colors shadow-lg shadow-upn-green/20">SIMPAN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminUsers;
