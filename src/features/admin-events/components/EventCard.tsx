import React from 'react';
import { Calendar, MapPin, Users, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Event, EventStatus } from '../../../types/event';

interface EventCardProps {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (event: Event) => void;
}

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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
    return (
        <Card variant="default" hoverable className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-3">
                    <h3 className="font-bold text-slate-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{event.description}</p>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-upn-green flex-shrink-0" />
                        <span className="hidden md:inline">{formatDate(event.startDate)}</span>
                        <span className="md:hidden">{formatDate(event.startDate)}</span>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-upn-green flex-shrink-0" />
                        <span className="line-clamp-1">{event.venue}, {event.location}</span>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <Badge variant={getStatusBadgeVariant(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-upn-green flex-shrink-0" />
                        <span className="line-clamp-1">{event.organizer}</span>
                    </div>
                </div>

                <div className="md:col-span-1 flex md:justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(event)}
                        className="p-2"
                        title="Edit Event"
                    >
                        <Edit2 size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(event)}
                        className="p-2 text-semantic-error hover:text-red-700"
                        title="Delete Event"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default EventCard;
