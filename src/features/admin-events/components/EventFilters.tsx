import React from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';
import type { EventStatus, EventFilters as EventFiltersType } from '../../../types/event';

interface EventFiltersProps {
    filters: EventFiltersType;
    onFilterChange: (filters: EventFiltersType) => void;
    showFilters: boolean;
    onToggleFilters: () => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
    filters,
    onFilterChange,
    showFilters,
    onToggleFilters,
}) => {
    const hasActiveFilters = filters.status || filters.dateFrom || filters.dateTo;

    const handleClearFilters = () => {
        onFilterChange({
            search: '',
            status: undefined,
            dateFrom: undefined,
            dateTo: undefined,
        });
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Cari event berdasarkan judul, deskripsi, lokasi, atau penyelenggara..."
                            value={filters.search}
                            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                            className="pl-10"
                        />
                    </div>

                    <Button
                        variant="outline"
                        onClick={onToggleFilters}
                        className="flex items-center gap-2"
                    >
                        <Filter size={18} />
                        Filter
                        {showFilters ? <ChevronDown size={18} className="rotate-180" /> : <ChevronDown size={18} />}
                    </Button>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            onClick={handleClearFilters}
                            className="flex items-center gap-2"
                        >
                            <X size={18} />
                            Reset Filter
                        </Button>
                    )}
                </div>

                {showFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                        <Select
                            label="Status"
                            value={filters.status || ''}
                            onChange={(e) => onFilterChange({ ...filters, status: (e.target.value as EventStatus) || undefined })}
                        >
                            <option value="">Semua Status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </Select>

                        <Input
                            label="Dari Tanggal"
                            type="date"
                            value={filters.dateFrom || ''}
                            onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value || undefined })}
                        />

                        <Input
                            label="Sampai Tanggal"
                            type="date"
                            value={filters.dateTo || ''}
                            onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value || undefined })}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EventFilters;
