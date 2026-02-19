import React from 'react';
import CountdownTimer from './CountdownTimer';
import EventCalendar from './EventCalendar';

const TimeSidebar: React.FC = () => {
    // Event terdekat (dibuat 15 jam lagi agar sesuai dengan desain referensi)
    const upcomingEvent = {
        name: "Patribera 2026",
        targetDate: new Date(Date.now() + 15 * 60 * 60 * 1000 + 12 * 60 * 1000 + 44 * 1000).toISOString(),
        subtitle: "Pengarahan Awal & Masuk Grup"
    };

    // Highlighting dates from the landing page timeline
    const eventDates = [
        "2026-07-15", "2026-07-21", "2026-08-01", "2026-08-05",
        "2026-08-08", "2026-08-10", "2026-08-12", "2026-08-14", "2026-08-16"
    ];

    return (
        <div className="space-y-6">
            <CountdownTimer
                eventName={upcomingEvent.name}
                targetDate={upcomingEvent.targetDate}
                subtitle={upcomingEvent.subtitle}
            />
            <EventCalendar eventDates={eventDates} />
        </div>
    );
};

export default TimeSidebar;
