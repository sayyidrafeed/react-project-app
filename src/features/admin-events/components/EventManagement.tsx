import React, { useState, useMemo } from 'react';
import { Event, EventFormData, EventFilters, EventSort } from '../../../types/event';
import { EventModal } from './EventModal';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { EventFilters as EventFiltersComponent } from './EventFilters';
import { EventCard } from './EventCard';
import { EventEmptyState } from './EventEmptyState';
import { SortHeader } from './SortHeader';

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

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    event.title.toLowerCase().includes(searchLower) ||
                    event.description.toLowerCase().includes(searchLower) ||
                    event.location.toLowerCase().includes(searchLower) ||
                    event.organizer.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            if (filters.status && event.status !== filters.status) {
                return false;
            }

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
        setSort((prev: EventSort) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const hasActiveFilters = filters.search || filters.status || filters.dateFrom || filters.dateTo;

    return (
        <div className="space-y-6">
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

            <EventFiltersComponent
                filters={filters}
                onFilterChange={setFilters}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
            />

            {sortedEvents.length === 0 ? (
                <EventEmptyState hasFilters={!!hasActiveFilters} />
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-slate-100 rounded-t-lg font-semibold text-sm text-slate-700">
                        <SortHeader field="title" label="Judul Event" sort={sort} onSort={handleSort} />
                        <SortHeader field="startDate" label="Tanggal" sort={sort} onSort={handleSort} />
                        <SortHeader field="location" label="Lokasi" sort={sort} onSort={handleSort} />
                        <SortHeader field="status" label="Status" sort={sort} onSort={handleSort} />
                        <SortHeader field="organizer" label="Penyelenggara" sort={sort} onSort={handleSort} />
                        <div className="md:col-span-1 text-right">Aksi</div>
                    </div>

                    {sortedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    ))}
                </div>
            )}

            <EventModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedEvent(null);
                }}
                onSave={handleSaveEvent}
                event={selectedEvent}
            />

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
