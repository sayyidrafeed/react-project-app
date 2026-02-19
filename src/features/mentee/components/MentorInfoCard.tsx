import React from 'react';
import { Users, ExternalLink } from 'lucide-react';

interface MentorInfoCardProps {
    mentorName: string;
    groupNumber: string;
    groupName: string;
}

const MentorInfoCard: React.FC<MentorInfoCardProps> = ({
    mentorName,
    groupNumber,
    groupName
}) => {
    return (
        <div className="card p-6 bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-upn-green/10 rounded-2xl flex items-center justify-center text-upn-green">
                    <Users size={28} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Mentor Anda</h4>
                    <h3 className="text-xl font-black text-slate-800 leading-tight">{mentorName}</h3>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Kelompok Dasar</p>
                    <p className="text-sm font-black text-upn-green">Kelompok {groupNumber} - {groupName}</p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-50 hover:border-upn-green hover:text-upn-green transition-all group"
                    onClick={() => {}}
                >
                    LIHAT PROFIL
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default MentorInfoCard;
