import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { FilterType, FilterButtonProps } from './types';
import type { UserAccount } from '../../../data/mockData';

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, count, label, color }) => {
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

interface UsersSearchFilterProps {
    searchQuery: string;
    filter: FilterType;
    onSearchChange: (query: string) => void;
    onFilterChange: (filter: FilterType) => void;
    users: UserAccount[];
}

export const UsersSearchFilter: React.FC<UsersSearchFilterProps> = ({
    searchQuery,
    filter,
    onSearchChange,
    onFilterChange,
    users,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Cari nama, email, atau NIM..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <FilterButton
                    active={filter === 'all'}
                    onClick={() => onFilterChange('all')}
                    count={users.length}
                    label="Semua"
                />
                <FilterButton
                    active={filter === 'admin'}
                    onClick={() => onFilterChange('admin')}
                    count={users.filter(u => u.role === 'admin').length}
                    label="Admin"
                    color="blue"
                />
                <FilterButton
                    active={filter === 'mentor'}
                    onClick={() => onFilterChange('mentor')}
                    count={users.filter(u => u.role === 'mentor').length}
                    label="Mentor"
                    color="gold"
                />
                <FilterButton
                    active={filter === 'mentee'}
                    onClick={() => onFilterChange('mentee')}
                    count={users.filter(u => u.role === 'mentee').length}
                    label="Mentee"
                    color="green"
                />
            </div>
        </div>
    );
};

export default UsersSearchFilter;
