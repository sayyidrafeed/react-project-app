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

    const titleTextColor = {
        white: 'text-slate-400',
        green: 'text-white/70',
        gold: 'text-upn-green/80',
    };

    const valueTextColor = {
        white: 'text-slate-900',
        green: 'text-white',
        gold: 'text-upn-green',
    };

    const iconWrapperStyles = {
        white: 'bg-upn-green/10 text-upn-green',
        green: 'bg-white/20 text-white',
        gold: 'bg-white/35 text-upn-green',
    };

    const descriptionTextColor = {
        white: 'text-slate-500',
        green: 'text-white/90',
        gold: 'text-upn-green/80',
    };

    return (
        <div className={cn("card relative overflow-hidden flex flex-col gap-1", variants[variant])}>
            <div className="flex justify-between items-start">
                <span className={cn('text-xs font-extrabold uppercase tracking-wider', titleTextColor[variant])}>
                    {title}
                </span>
                <div className={cn('p-2 rounded-lg', iconWrapperStyles[variant])}>
                    <Icon size={18} />
                </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
                <p className={cn('text-3xl font-black leading-none', valueTextColor[variant])}>{value}</p>
                {trend && (
                    <span className={cn("text-xs font-bold", trend.isUp ? 'text-green-500' : 'text-red-500')}>
                        {trend.isUp ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>

            {description && (
                <p className={cn('text-[10px] mt-1 font-medium italic', descriptionTextColor[variant])}>
                    {description}
                </p>
            )}
        </div>
    );
};
