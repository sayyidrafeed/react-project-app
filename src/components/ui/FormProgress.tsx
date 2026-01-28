/**
 * FormProgress Component
 * Displays form completion progress with visual indicators
 * Fully responsive and accessible with mobile-first design
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FormProgress as FormProgressType } from '../../types/validation';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface FormProgressProps {
    progress: FormProgressType;
    showDetails?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const FormProgress: React.FC<FormProgressProps> = ({
    progress,
    showDetails = true,
    size = 'md',
    className,
}) => {
    const { totalFields, completedFields, validFields, percentage } = progress;

    const sizes = {
        sm: {
            bar: 'h-1.5',
            icon: 14,
            text: 'text-xs',
        },
        md: {
            bar: 'h-2',
            icon: 16,
            text: 'text-sm',
        },
        lg: {
            bar: 'h-3',
            icon: 20,
            text: 'text-base',
        },
    };

    const getStatusColor = () => {
        if (percentage === 100) return 'bg-green-500';
        if (percentage >= 50) return 'bg-upn-green dark:bg-upn-gold';
        if (percentage >= 25) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getStatusIcon = () => {
        if (percentage === 100) return CheckCircle2;
        if (percentage >= 50) return Clock;
        return AlertCircle;
    };

    const getStatusText = () => {
        if (percentage === 100) return 'Complete';
        if (percentage >= 50) return 'In Progress';
        if (percentage >= 25) return 'Started';
        return 'Not Started';
    };

    const StatusIcon = getStatusIcon();

    return (
        <div className={cn('space-y-2 w-full', className)}>
            {/* Progress Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <StatusIcon
                        size={sizes[size].icon}
                        className={cn(
                            'transition-colors',
                            percentage === 100
                                ? 'text-green-500'
                                : percentage >= 50
                                    ? 'text-upn-green dark:text-upn-gold'
                                    : percentage >= 25
                                        ? 'text-yellow-500'
                                        : 'text-red-500'
                        )}
                    />
                    <span className={cn('font-semibold text-slate-700 dark:text-dark-text', sizes[size].text)}>
                        {getStatusText()}
                    </span>
                </div>
                <span className={cn('font-bold text-slate-600 dark:text-dark-text-muted', sizes[size].text)}>
                    {percentage}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className={cn('w-full bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden', sizes[size].bar)}>
                <div
                    className={cn(
                        'h-full transition-all duration-500 ease-out rounded-full',
                        getStatusColor()
                    )}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Form completion: ${percentage}%`}
                />
            </div>

            {/* Progress Details */}
            {showDetails && (
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <ProgressStat
                        label="Total"
                        value={totalFields}
                        color="blue"
                        size={size}
                    />
                    <ProgressStat
                        label="Completed"
                        value={completedFields}
                        color="green"
                        size={size}
                    />
                    <ProgressStat
                        label="Valid"
                        value={validFields}
                        color="gold"
                        size={size}
                    />
                </div>
            )}
        </div>
    );
};

interface ProgressStatProps {
    label: string;
    value: number;
    color: 'blue' | 'green' | 'gold';
    size: 'sm' | 'md' | 'lg';
}

const ProgressStat: React.FC<ProgressStatProps> = ({ label, value, color, size }) => {
    const colorClasses = {
        blue: 'bg-primary-blue/10 text-primary-blue dark:bg-primary-blue/20',
        green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold dark:bg-upn-gold/10',
        gold: 'bg-upn-gold/10 text-upn-gold',
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return (
        <div className={cn('rounded-lg p-2 text-center', colorClasses[color])}>
            <p className={cn('font-black', textSizes[size])}>{value}</p>
            <p className={cn('font-semibold uppercase tracking-tighter opacity-75', textSizes[size])}>
                {label}
            </p>
        </div>
    );
};

export default FormProgress;
