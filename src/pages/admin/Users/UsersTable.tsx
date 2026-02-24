import React from 'react';
import { Edit, Trash2, GraduationCap, Users } from 'lucide-react';
import type { UserAccount, UserCardProps } from './types';

const UserCard: React.FC<UserCardProps> = ({ user, isSelected, onSelect, onEdit }) => {
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
                            ) : user.role === 'panitia' ? (
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

interface UsersTableProps {
    users: UserAccount[];
    filteredUsers: UserAccount[];
    selectedUsers: Set<string>;
    onSelectAll: () => void;
    onUserSelect: (id: string) => void;
    onEdit: (user: UserAccount) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
    filteredUsers,
    selectedUsers,
    onSelectAll,
    onUserSelect,
    onEdit,
}) => {
    return (
        <div className="card p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">Daftar Pengguna</h3>
                    <label
                        htmlFor="select-all-users"
                        className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer"
                    >
                        <input
                            id="select-all-users"
                            type="checkbox"
                            checked={filteredUsers.length > 0 && filteredUsers.every(u => selectedUsers.has(u.id))}
                            onChange={onSelectAll}
                            className="accent-upn-green w-4 h-4"
                        />
                        <span>Pilih Semua</span>
                    </label>
                </div>
                <div className="flex gap-2">
                    <span className="text-xs text-slate-500">
                        Menampilkan {filteredUsers.length} user
                    </span>
                </div>
            </div>

            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                        onChange={onSelectAll}
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

            <div className="sm:hidden space-y-3">
                {filteredUsers.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isSelected={selectedUsers.has(user.id)}
                        onSelect={() => onUserSelect(user.id)}
                        onEdit={() => onEdit(user)}
                    />
                ))}
            </div>

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
                                onChange={() => onUserSelect(user.id)}
                                className="accent-upn-green w-4 h-4"
                            />
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green shrink-0">
                                        {user.role === 'admin' ? (
                                            <GraduationCap size={18} />
                                        ) : user.role === 'panitia' ? (
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
                                    onClick={() => onEdit(user)}
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
    );
};

export default UsersTable;
