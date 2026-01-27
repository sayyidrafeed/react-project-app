import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isUp: boolean;
    };
    variant?: 'green' | 'gold' | 'white';
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    variant = 'white'
}) => {
    const variants = {
        white: 'bg-white text-slate-900 border-slate-200',
        green: 'bg-upn-green text-white border-transparent',
        gold: 'bg-upn-gold text-upn-green border-transparent'
    };

    return (
        <div className={cn("card relative overflow-hidden flex flex-col gap-1", variants[variant])}>
            <div className="flex justify-between items-start">
                <span className={cn("text-xs font-extrabold uppercase tracking-wider opacity-70", variant !== 'white' ? 'text-white/80' : 'text-slate-400')}>
                    {title}
                </span>
                <div className={cn("p-2 rounded-lg bg-opacity-10", variant === 'white' ? 'bg-upn-green text-upn-green' : 'bg-white text-inherit')}>
                    <Icon size={18} />
                </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
                <h4 className="text-3xl font-black">{value}</h4>
                {trend && (
                    <span className={cn("text-xs font-bold", trend.isUp ? 'text-green-500' : 'text-red-500')}>
                        {trend.isUp ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>

            {description && (
                <p className={cn("text-[10px] mt-1 font-medium italic opacity-80")}>
                    {description}
                </p>
            )}
        </div>
    );
};
