import React from 'react';
import { Star } from 'lucide-react';

interface OrientationJourneyCardProps {
    completedStages: number;
    totalStages: number;
    nextStageName: string;
    currentDay: number;
    onClick?: () => void;
}

const OrientationJourneyCard: React.FC<OrientationJourneyCardProps> = ({
    completedStages,
    totalStages,
    nextStageName,
    currentDay,
    onClick,
}) => {
    const progress = (completedStages / totalStages) * 100;

    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-2xl p-5 sm:p-6 bg-upn-green text-white shadow-lg text-left hover:shadow-xl transition-shadow"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/70">
                        PERJALANAN ORIENTASI
                    </p>
                    <h2 className="text-xl sm:text-2xl font-black mt-1">Progres Anda</h2>
                    <p className="text-xs sm:text-sm text-white/80 mt-2 font-medium">
                        {completedStages} dari {totalStages} tahapan selesai
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/70 font-medium mt-1">
                        Berikutnya: {nextStageName}
                    </p>
                </div>
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[6px] border-white/20 relative">
                    <div
                        className="absolute inset-0 rounded-full border-[6px] border-white"
                        style={{
                            clipPath: `polygon(0 0, 100% 0, 100% ${Math.round(progress)}%, 0 ${Math.round(progress)}%)`
                        }}
                    />
                    <span className="text-base sm:text-lg font-black">{Math.round(progress)}%</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                    <Star size={14} className="text-white/80" />
                    <span className="text-[10px] sm:text-xs font-bold text-white/80">Tetap semangat!</span>
                </div>
                <div className="px-3 py-1 bg-white/15 rounded-full text-[10px] font-black text-white uppercase">
                    HARI {currentDay}
                </div>
            </div>
        </button>
    );
};

export default OrientationJourneyCard;
