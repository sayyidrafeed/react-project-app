export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    venue: string;
    capacity: number;
    organizer: string;
    status: EventStatus;
    createdAt: string;
    updatedAt: string;
}

export interface EventFormData {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    venue: string;
    capacity: number;
    organizer: string;
    status: EventStatus;
}

export interface EventFilters {
    search: string;
    status?: EventStatus;
    dateFrom?: string;
    dateTo?: string;
}

export interface EventSort {
    field: keyof Event;
    direction: 'asc' | 'desc';
}
