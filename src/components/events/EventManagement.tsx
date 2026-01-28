import React, { useState, useMemo } from 'react';
import { Event, EventFormData, EventStatus, EventFilters, EventSort } from '../../types/event';
import { EventModal } from './EventModal';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardContent } from '../ui/Card';
import {
    Plus,
    Search,
    Filter,
    SortAsc,
    SortDesc,
    Edit2,
    Trash2,
    Calendar,
    MapPin,
    Users,
    ChevronDown,
    X
} from 'lucide-react';

interface EventManagementProps {
    events: Event[];
    onCreate: (data: EventFormData) => void;
    onUpdate: (id: string, data: EventFormData) => void;
    onDelete: (id: string) => void;
}

export const EventManagement: React.FC<EventManagementProps> = ({
    events,
    onCreate,
    onUpdate,
    onDelete
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

    // Search, Filter, and Sort State
    const [filters, setFilters] = useState<EventFilters>({
        search: '',
        status: undefined,
        dateFrom: undefined,
        dateTo: undefined
    });

    const [sort, setSort] = useState<EventSort>({
        field: 'startDate',
        direction: 'asc'
    });

    const [showFilters, setShowFilters] = useState(false);

    // Status badge variants
    const getStatusBadgeVariant = (status: EventStatus): 'success' | 'warning' | 'error' | 'info' | 'secondary' => {
        switch (status) {
            case 'published':
                return 'success';
            case 'ongoing':
                return 'info';
            case 'completed':
                return 'secondary';
            case 'cancelled':
                return 'error';
            case 'draft':
            default:
                return 'warning';
        }
    };

    // Filter events
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    event.title.toLowerCase().includes(searchLower) ||
                    event.description.toLowerCase().includes(searchLower) ||
                    event.location.toLowerCase().includes(searchLower) ||
                    event.organizer.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Status filter
            if (filters.status && event.status !== filters.status) {
                return false;
            }

            // Date range filter
            if (filters.dateFrom) {
                const eventDate = new Date(event.startDate);
                const fromDate = new Date(filters.dateFrom);
                if (eventDate < fromDate) return false;
            }

            if (filters.dateTo) {
                const eventDate = new Date(event.startDate);
                const toDate = new Date(filters.dateTo);
                if (eventDate > toDate) return false;
            }

            return true;
        });
    }, [events, filters]);

    // Sort events
    const sortedEvents = useMemo(() => {
        return [...filteredEvents].sort((a, b) => {
            const aValue = a[sort.field];
            const bValue = b[sort.field];

            if (sort.direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredEvents, sort]);

    // Handlers
    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleDeleteEvent = (event: Event) => {
        setEventToDelete(event);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveEvent = (data: EventFormData) => {
        if (selectedEvent) {
            onUpdate(selectedEvent.id, data);
        } else {
            onCreate(data);
        }
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleConfirmDelete = () => {
        if (eventToDelete) {
            onDelete(eventToDelete.id);
        }
        setIsDeleteDialogOpen(false);
        setEventToDelete(null);
    };

    const handleSort = (field: keyof Event) => {
        setSort((prev) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            status: undefined,
            dateFrom: undefined,
            dateTo: undefined
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const SortIcon = ({ field }: { field: keyof Event }) => {
        if (sort.field !== field) return null;
        return sort.direction === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-upn-green">Manajemen Event</h1>
                    <p className="text-slate-500 font-medium">
                        {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'}
                    </p>
                </div>
                <Button onClick={handleCreateEvent}>
                    <Plus size={18} />
                    TAMBAH EVENT
                </Button>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Cari event berdasarkan judul, deskripsi, lokasi, atau penyelenggara..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2"
                        >
                            <Filter size={18} />
                            Filter
                            {showFilters ? <ChevronDown size={18} className="rotate-180" /> : <ChevronDown size={18} />}
                        </Button>

                        {/* Clear Filters */}
                        {(filters.status || filters.dateFrom || filters.dateTo) && (
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

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                            <Select
                                label="Status"
                                value={filters.status || ''}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value as EventStatus || undefined })}
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
                                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                            />

                            <Input
                                label="Sampai Tanggal"
                                type="date"
                                value={filters.dateTo || ''}
                                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Events Grid */}
            {sortedEvents.length === 0 ? (
                <Card className="text-center py-20 bg-slate-50 border-dashed border-2">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-sm mx-auto">
                        <Calendar size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                        {filters.search || filters.status || filters.dateFrom || filters.dateTo
                            ? 'Tidak Ada Event Ditemukan'
                            : 'Belum Ada Event'
                        }
                    </h3>
                    <p className="text-slate-400 mt-2 max-w-sm mx-auto">
                        {filters.search || filters.status || filters.dateFrom || filters.dateTo
                            ? 'Coba ubah filter pencarian Anda untuk menemukan event yang sesuai.'
                            : 'Silakan tambahkan event baru untuk memulai jadwal kegiatan PKKMB-U tahun ini.'
                        }
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {/* Table Header */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-slate-100 rounded-t-lg font-semibold text-sm text-slate-700">
                        <div className="md:col-span-3 flex items-center gap-2 cursor-pointer hover:text-upn-green" onClick={() => handleSort('title')}>
                            Judul Event <SortIcon field="title" />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 cursor-pointer hover:text-upn-green" onClick={() => handleSort('startDate')}>
                            Tanggal <SortIcon field="startDate" />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 cursor-pointer hover:text-upn-green" onClick={() => handleSort('location')}>
                            Lokasi <SortIcon field="location" />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 cursor-pointer hover:text-upn-green" onClick={() => handleSort('status')}>
                            Status <SortIcon field="status" />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 cursor-pointer hover:text-upn-green" onClick={() => handleSort('organizer')}>
                            Penyelenggara <SortIcon field="organizer" />
                        </div>
                        <div className="md:col-span-1 text-right">Aksi</div>
                    </div>

                    {/* Events List */}
                    {sortedEvents.map((event) => (
                        <Card
                            key={event.id}
                            variant="default"
                            hoverable
                            className="p-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                {/* Title */}
                                <div className="md:col-span-3">
                                    <h3 className="font-bold text-slate-900 mb-1">{event.title}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-2">{event.description}</p>
                                </div>

                                {/* Date */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Calendar size={16} className="text-upn-green flex-shrink-0" />
                                        <span className="hidden md:inline">{formatDate(event.startDate)}</span>
                                        <span className="md:hidden">{formatDate(event.startDate)}</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin size={16} className="text-upn-green flex-shrink-0" />
                                        <span className="line-clamp-1">{event.venue}, {event.location}</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="md:col-span-2">
                                    <Badge variant={getStatusBadgeVariant(event.status)}>
                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                    </Badge>
                                </div>

                                {/* Organizer */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Users size={16} className="text-upn-green flex-shrink-0" />
                                        <span className="line-clamp-1">{event.organizer}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="md:col-span-1 flex md:justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditEvent(event)}
                                        className="p-2"
                                        title="Edit Event"
                                    >
                                        <Edit2 size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteEvent(event)}
                                        className="p-2 text-semantic-error hover:text-red-700"
                                        title="Delete Event"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Event Modal */}
            <EventModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedEvent(null);
                }}
                onSave={handleSaveEvent}
                event={selectedEvent}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setEventToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Hapus Event?"
                message={`Apakah Anda yakin ingin menghapus event "${eventToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus"
                cancelText="Batal"
                variant="danger"
            />
        </div>
    );
};

export default EventManagement;
