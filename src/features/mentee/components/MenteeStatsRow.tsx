import React from 'react';

interface MenteeStatsRowProps {
    tasksLeft: number;
    tasksToday: number;
    avgGrade: number;
    gradeTrend: number;
}

const MenteeStatsRow: React.FC<MenteeStatsRowProps> = ({
    tasksLeft,
    tasksToday,
    avgGrade: _avgGrade,
    gradeTrend: _gradeTrend,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tasks Left Card */}
            <div className="card p-6 bg-white">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tasks Left</p>
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-slate-800">{tasksLeft}</span>
                    <span className="text-sm font-bold text-red-500">
                        {tasksToday > 0 ? `-${tasksToday} today` : '0 today'}
                    </span>
                </div>
            </div>

            {/* Avg Grade Card */}
            <div className="card p-6 bg-white">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kelompok</p>
                <div className="flex items-baseline gap-3">
                    <div className="flex items-center gap-1 text-upn-green text-sm font-bold">
                        <span className="text-4xl">88</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteeStatsRow;
