import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventCalendarProps {
    eventDates: string[]; // ISO date strings (just dates YYYY-MM-DD)
}

const EventCalendar: React.FC<EventCalendarProps> = ({ eventDates }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // Header hari
        const weekDays = ['Se', 'Sel', 'Ra', 'Ka', 'Ju', 'Sa', 'Mi'];

        // Fill empty slots for previous month
        for (let i = 1; i < (startDay === 0 ? 7 : startDay); i++) {
            days.push(<div key={`empty-${i}`} className="p-2 text-transparent">0</div>);
        }

        // Fill days of current month
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const isEvent = eventDates.includes(dateStr);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            days.push(
                <div
                    key={day}
                    className={`p-2 flex items-center justify-center text-xs font-bold rounded-full transition-all cursor-pointer h-8 w-8 mx-auto ${isToday ? 'bg-upn-green text-white shadow-sm' :
                        isEvent ? 'border-2 border-upn-green text-upn-green' :
                            'text-slate-600 hover:bg-slate-100'
                        }`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="card p-5 bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-black text-slate-600">
                        {currentDate.getFullYear()}
                    </span>
                    <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-black text-slate-600">
                        {monthNames[currentDate.getMonth()]}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Se', 'Sel', 'Ra', 'Ka', 'Ju', 'Sa', 'Mi'].map(day => (
                    <div key={day} className="text-[10px] uppercase font-black text-slate-300 py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
                {renderDays()}
            </div>

            <div className="mt-8">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-4">Important Dates</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-upn-green transition-all">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full border-2 border-upn-green p-0.5">
                                <div className="w-full h-full rounded-full bg-upn-green/10" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-upn-green" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-xs font-black text-slate-800">Daftar Ulang</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">15 - 20 Juli 2026</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-upn-green transition-all">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full border-2 border-upn-gold/30 p-0.5">
                                <div className="w-full h-full rounded-full bg-slate-200" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-400" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-xs font-black text-slate-800">Patribera Main Event</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">14 Agustus 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCalendar;
