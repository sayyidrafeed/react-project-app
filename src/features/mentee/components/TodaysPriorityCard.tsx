import React from 'react';
import { Clock } from 'lucide-react';

interface PriorityTask {
    id: string;
    title: string;
    module: string;
    status: 'PENDING' | 'SUBMITTED' | 'GRADED';
    timeLeft: string;
}

interface TodaysPriorityCardProps {
    tasks: PriorityTask[];
}

const statusLabelMap: Record<PriorityTask['status'], string> = {
    PENDING: 'TERTUNDA',
    SUBMITTED: 'TERKIRIM',
    GRADED: 'DINILAI',
};

const TodaysPriorityCard: React.FC<TodaysPriorityCardProps> = ({ tasks }) => {
    const getStatusLabel = (status: PriorityTask['status']) => statusLabelMap[status];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Prioritas Hari Ini</h3>
                <button className="text-xs font-black text-upn-green uppercase tracking-widest hover:underline">
                    Lihat Jadwal
                </button>
            </div>

            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="card p-5 bg-white border-2 border-slate-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                                    <div>
                                        <h4 className="text-lg font-black text-slate-800 leading-tight">{task.title}</h4>
                                        <p className="text-xs font-medium text-slate-500 mt-1">Modul: {task.module}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded text-[10px] font-black tracking-widest ${task.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                    }`}>
                                    {getStatusLabel(task.status)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-dashed border-slate-200">
                                <div className="flex items-center gap-2 text-red-500">
                                    <Clock size={16} />
                                    <span className="text-xs font-black uppercase tracking-tighter">{task.timeLeft} LAGI</span>
                                </div>
                                <button className="px-6 py-2 bg-upn-green text-white text-[10px] font-black uppercase tracking-widest rounded transition-all hover:bg-green-800">
                                    KIRIM
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="card p-8 bg-slate-50 border-2 border-dashed border-slate-200 text-center">
                        <p className="text-sm font-bold text-slate-400">Tidak ada tugas prioritas hari ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodaysPriorityCard;
