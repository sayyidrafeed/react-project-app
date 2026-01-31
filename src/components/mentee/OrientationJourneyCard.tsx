import React from 'react';
import { Star } from 'lucide-react';

interface OrientationJourneyCardProps {
    completedStages: number;
    totalStages: number;
    nextStageName: string;
    currentDay: number;
}

const OrientationJourneyCard: React.FC<OrientationJourneyCardProps> = ({
    completedStages,
    totalStages,
    nextStageName,
    currentDay,
}) => {
    const progress = (completedStages / totalStages) * 100;

    return (
        <div className="card p-6 bg-white">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        ORIENTATION JOURNEY
                    </h4>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                        {completedStages} of {totalStages} stages complete
                    </h2>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-black text-upn-green">{Math.round(progress)}%</span>
                </div>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-upn-green rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Next:</span>
                    <span className="text-xs font-black text-upn-green uppercase tracking-tight">{nextStageName}</span>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase">
                    DAY {currentDay}
                </div>
            </div>
        </div>
    );
};

export default OrientationJourneyCard;
