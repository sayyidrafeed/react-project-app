import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';
import type { Event, EventSort } from '../../../types/event';

const SortIcon: React.FC<{ field: keyof Event; sort: EventSort }> = ({ field, sort }) => {
    if (sort.field !== field) return null;
    return sort.direction === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
};

interface SortHeaderProps {
    field: keyof Event;
    label: string;
    sort: EventSort;
    onSort: (field: keyof Event) => void;
}

export const SortHeader: React.FC<SortHeaderProps> = ({ field, label, sort, onSort }) => {
    const colSpan = field === 'title' ? 'md:col-span-3' : 'md:col-span-2';
    return (
        <div
            className={`${colSpan} flex items-center gap-2 cursor-pointer hover:text-upn-green select-none`}
            role="columnheader"
            aria-sort={sort.field === field ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
            tabIndex={0}
            onClick={() => onSort(field)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSort(field);
                }
            }}
        >
            {label} <SortIcon field={field} sort={sort} />
        </div>
    );
};

export default SortHeader;
