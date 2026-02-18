import React from 'react';
import { FormProgress as FormProgressType } from '../../types/validation';

export interface FormProgressProps {
    progress: FormProgressType;
    showDetails?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const FormProgress: React.FC<FormProgressProps> = ({
    progress,
    showDetails = true,
    size = 'md'
}) => {
    const { totalFields, completedFields, percentage } = progress;

    const sizes = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4'
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
    };

    return (
        <div className="w-full space-y-2">
            {showDetails && (
                <div className="flex justify-between items-center text-slate-600">
                    <span className={`font-medium ${textSizes[size]}`}>
                        Form Progress
                    </span>
                    <span className={`font-bold ${textSizes[size]}`}>
                        {percentage}% ({completedFields}/{totalFields})
                    </span>
                </div>
            )}
            
            <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizes[size]}`}>
                <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    );
};
