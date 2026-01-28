import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, Search, Filter, MoreVertical, Download, Edit, Trash2, CheckCircle, XCircle, Mail, Phone, GraduationCap, Calendar as CalendarIcon } from 'lucide-react';
import { MOCK_USERS } from '../../data/mockData';

const UsersPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'admin' | 'mentor' | 'mentee' | 'active' | 'inactive'>('all');
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const filteredUsers = MOCK_USERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.nim && user.nim.includes(searchQuery));
        if (!matchesSearch) return false;

        switch (filter) {
            case 'admin':
                return user.role === 'admin';
            case 'mentor':
                return user.role === 'mentor';
            case 'mentee':
                return user.role === 'mentee';
            case 'active':
                return user.status === 'Active';
            case 'inactive':
                return user.status === 'Inactive';
            default:
                return true;
        }
    });

    const handleSelectAll = () => {
        if (selectedUsers.size === filteredUsers.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
        }
    };

    const handleUserSelect = (id: string) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedUsers(newSelected);
    };

    const openUserModal = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeUserModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedUser(null), 300);
    };

    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'text-green-600' : 'text-red-600';
    };

    const getStatusBg = (status: string) => {
        return status === 'Active' ? 'bg-green-100' : 'bg-red-100';
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
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

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau NIM..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                            count={MOCK_USERS.length}
                            label="Semua"
                        />
                        <FilterButton
                            active={filter === 'admin'}
                            onClick={() => setFilter('admin')}
                            count={MOCK_USERS.filter(u => u.role === 'admin').length}
                            label="Admin"
                            color="blue"
                        />
                        <FilterButton
                            active={filter === 'mentor'}
                            onClick={() => setFilter('mentor')}
                            count={MOCK_USERS.filter(u => u.role === 'mentor').length}
                            label="Mentor"
                            color="gold"
                        />
                        <FilterButton
                            active={filter === 'mentee'}
                            onClick={() => setFilter('mentee')}
                            count={MOCK_USERS.filter(u => u.role === 'mentee').length}
                            label="Mentee"
                            color="green"
                        />
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selectedUsers.size > 0 && (
                    <div className="card p-3 sm:p-4 bg-upn-green/5 border-2 border-upn-green/20">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={20} className="text-upn-green" />
                                <span className="text-sm sm:text-base font-semibold text-slate-800">
                                    {selectedUsers.size} user dipilih
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
                )}

                {/* User Table */}
                <div className="card p-4 sm:p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm sm:text-base font-bold text-slate-800">Daftar Pengguna</h3>
                            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.size === filteredUsers.length}
                                    onChange={handleSelectAll}
                                    className="accent-upn-green w-4 h-4"
                                />
                                <span>Pilih Semua</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-xs text-slate-500">
                                Menampilkan {filteredUsers.length} dari {MOCK_USERS.length} user
                            </span>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedUsers.size === filteredUsers.length}
                                onChange={handleSelectAll}
                                className="accent-upn-green w-4 h-4"
                            />
                            <span>Nama</span>
                        </div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Status</div>
                        <div>Fakultas</div>
                        <div>Program Studi</div>
                        <div>NIM</div>
                        <div>Dibuat</div>
                        <div>Login Terakhir</div>
                        <div>Aksi</div>
                    </div>

                    {/* Table Body - Mobile Cards */}
                    <div className="sm:hidden space-y-3">
                        {filteredUsers.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                isSelected={selectedUsers.has(user.id)}
                                onSelect={() => handleUserSelect(user.id)}
                                onEdit={() => openUserModal(user)}
                            />
                        ))}
                    </div>

                    {/* Table Body - Desktop Table */}
                    <div className="hidden sm:block overflow-x-auto">
                        <div className="min-w-full">
                            {filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    className={`flex items-center gap-4 px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${selectedUsers.has(user.id) ? 'bg-upn-green/5 border-2 border-upn-green' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.has(user.id)}
                                        onChange={() => handleUserSelect(user.id)}
                                        className="accent-upn-green w-4 h-4"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green shrink-0">
                                                {user.role === 'admin' ? (
                                                    <GraduationCap size={18} />
                                                ) : user.role === 'mentor' ? (
                                                    <Users size={18} />
                                                ) : (
                                                    <Users size={18} />
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <button
                                            onClick={() => openUserModal(user)}
                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={16} className="text-slate-400" />
                                        </button>
                                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User Detail Modal */}
                {isModalOpen && selectedUser && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
                            <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-200">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-800">Detail Pengguna</h3>
                                <button
                                    onClick={closeUserModal}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <XCircle size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Avatar and Basic Info */}
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-upn-green/10 rounded-xl flex items-center justify-center text-upn-green shrink-0">
                                        {selectedUser.role === 'admin' ? (
                                            <GraduationCap size={32} />
                                        ) : selectedUser.role === 'mentor' ? (
                                            <Users size={32} />
                                        ) : (
                                            <Users size={32} />
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-xl sm:text-2xl font-bold text-slate-800">
                                            {selectedUser.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {selectedUser.email}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusBg(selectedUser.status)} ${getStatusColor(selectedUser.status)}`}>
                                                {selectedUser.role}
                                            </span>
                                            {selectedUser.status === 'Active' ? (
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

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard
                                    title="NIM"
                                    value={selectedUser.nim || '-'}
                                    icon={Phone}
                                />
                                <InfoCard
                                    title="Fakultas"
                                    value={selectedUser.faculty || '-'}
                                    icon={GraduationCap}
                                />
                                <InfoCard
                                    title="Program Studi"
                                    value={selectedUser.major || '-'}
                                    icon={GraduationCap}
                                />
                            </div>

                            {/* Account Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard
                                    title="Status Akun"
                                    value={selectedUser.status}
                                    icon={selectedUser.status === 'Active' ? CheckCircle : XCircle}
                                />
                                <InfoCard
                                    title="Dibuat Pada"
                                    value={selectedUser.createdAt || '-'}
                                    icon={CalendarIcon}
                                />
                                <InfoCard
                                    title="Login Terakhir"
                                    value={selectedUser.lastLogin || '-'}
                                    icon={CalendarIcon}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button className="flex-1 btn-primary py-3 rounded-xl text-sm sm:text-base font-semibold">
                                    Simpan Perubahan
                                </button>
                                <button className="flex-1 py-3 px-4 border-2 border-slate-300 rounded-xl text-sm sm:text-base font-semibold text-slate-600 hover:bg-slate-100 transition-all">
                                    Kirim Email Reset
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

// Filter Button Component
const FilterButton: React.FC<{
    active: boolean;
    onClick: () => void;
    count: number;
    label: string;
    color?: 'blue' | 'gold' | 'green';
}> = ({ active, onClick, count, label, color }) => {
    const getActiveClass = () => {
        if (color) {
            return {
                blue: 'bg-blue-600 text-white',
                gold: 'bg-upn-gold text-upn-green',
                green: 'bg-upn-green text-upn-gold',
            }[color];
        }
        return 'bg-upn-green text-upn-gold';
    };

    const getInactiveClass = () => {
        if (color) {
            return {
                blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
                gold: 'bg-upn-gold/10 text-upn-gold hover:bg-upn-gold/20',
                green: 'bg-upn-green/10 text-upn-green hover:bg-upn-green/20',
            }[color];
        }
        return 'bg-slate-100 text-slate-600 hover:bg-slate-200';
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${active ? getActiveClass() : getInactiveClass()}`}
        >
            <Filter size={14} className="sm:size-16" />
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20' : 'bg-slate-200 dark:bg-dark-surface'}`}>
                {count}
            </span>
        </button>
    );
};

// User Card Component (Mobile)
const UserCard: React.FC<{
    user: any;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
}> = ({ user, isSelected, onSelect, onEdit }) => {
    return (
        <div className={`card p-4 hover:shadow-md transition-shadow ${isSelected ? 'border-2 border-upn-green' : 'border-2 border-transparent'}`}>
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                    className="accent-upn-green w-5 h-5 shrink-0"
                />
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green shrink-0">
                            {user.role === 'admin' ? (
                                <GraduationCap size={20} />
                            ) : user.role === 'mentor' ? (
                                <Users size={20} />
                            ) : (
                                <Users size={20} />
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-base">{user.name}</h4>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onEdit}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Edit size={16} className="text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Info Card Component
const InfoCard: React.FC<{
    title: string;
    value: string;
    icon: React.ElementType;
}> = ({ title, value, icon: Icon }) => {
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

export default UsersPage;
