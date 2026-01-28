import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { EventManagement } from '../components/events/EventManagement';
import { Event, EventFormData } from '../types/event';
import { mockEvents } from '../data/mockEvents';

const AdminEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(mockEvents);

    const handleCreateEvent = (data: EventFormData) => {
        const newEvent: Event = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setEvents([newEvent, ...events]);
    };

    const handleUpdateEvent = (id: string, data: EventFormData) => {
        setEvents(events.map((event) =>
            event.id === id
                ? { ...event, ...data, updatedAt: new Date().toISOString() }
                : event
        ));
    };

    const handleDeleteEvent = (id: string) => {
        setEvents(events.filter((event) => event.id !== id));
    };

    return (
        <DashboardLayout>
            <EventManagement
                events={events}
                onCreate={handleCreateEvent}
                onUpdate={handleUpdateEvent}
                onDelete={handleDeleteEvent}
            />
        </DashboardLayout>
    );
};

export default AdminEvents;
