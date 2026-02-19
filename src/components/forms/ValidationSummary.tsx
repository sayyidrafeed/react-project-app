/**
 * ValidationSummary Component
 * Displays form-wide validation status with actionable feedback
 * Fully responsive and accessible with mobile-first design
 */

import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ValidationMessage, ValidationSeverity } from '../../types/validation';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ValidationSummaryProps {
    messages: ValidationMessage[];
    onDismiss?: (index: number) => void;
    showFieldNames?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: 'default' | 'compact' | 'detailed';
}

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
    messages,
    onDismiss,
    showFieldNames = true,
    size = 'md',
    className,
    variant = 'default',
}) => {
    if (messages.length === 0) {
        return null;
    }

    const sizes = {
        sm: {
            text: 'text-xs',
            icon: 14,
            padding: 'p-2',
            gap: 'gap-1.5',
        },
        md: {
            text: 'text-sm',
            icon: 16,
            padding: 'p-3',
            gap: 'gap-2',
        },
        lg: {
            text: 'text-base',
            icon: 20,
            padding: 'p-4',
            gap: 'gap-2.5',
        },
    };

    const getMessageConfig = (severity: ValidationSeverity) => {
        switch (severity) {
            case 'error':
                return {
                    icon: XCircle,
                    bgColor: 'bg-red-50 dark:bg-red-900/20',
                    borderColor: 'border-red-200 dark:border-red-800',
                    textColor: 'text-red-700 dark:text-red-400',
                    iconColor: 'text-red-500',
                };
            case 'warning':
                return {
                    icon: AlertCircle,
                    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
                    borderColor: 'border-yellow-200 dark:border-yellow-800',
                    textColor: 'text-yellow-700 dark:text-yellow-400',
                    iconColor: 'text-yellow-500',
                };
            case 'success':
                return {
                    icon: CheckCircle2,
                    bgColor: 'bg-green-50 dark:bg-green-900/20',
                    borderColor: 'border-green-200 dark:border-green-800',
                    textColor: 'text-green-700 dark:text-green-400',
                    iconColor: 'text-green-500',
                };
            case 'info':
                return {
                    icon: Info,
                    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                    textColor: 'text-blue-700 dark:text-blue-400',
                    iconColor: 'text-blue-500',
                };
        }
    };

    const groupedMessages = messages.reduce((acc, message, index) => {
        if (!acc[message.type]) {
            acc[message.type] = [];
        }
        acc[message.type].push({ ...message, index });
        return acc;
    }, {} as Record<ValidationSeverity, (ValidationMessage & { index: number })[]>);

    const severityOrder: ValidationSeverity[] = ['error', 'warning', 'info', 'success'];

    return (
        <div className={cn('space-y-2 w-full', className)} role="alert" aria-live="polite">
            {severityOrder.map(severity => {
                const group = groupedMessages[severity];
                if (!group || group.length === 0) return null;

                const config = getMessageConfig(severity);
                const Icon = config.icon;

                return (
                    <div
                        key={severity}
                        className={cn(
                            'rounded-xl border-2 transition-all duration-200',
                            config.bgColor,
                            config.borderColor,
                            variant === 'compact' ? sizes[size].padding : 'p-4 sm:p-5'
                        )}
                    >
                        <div className={cn('flex items-start gap-3', sizes[size].gap)}>
                            <Icon
                                size={sizes[size].icon}
                                className={cn('shrink-0 mt-0.5', config.iconColor)}
                            />
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className={cn('font-bold uppercase tracking-tighter', config.textColor, sizes[size].text)}>
                                        {severity}
                                        {group.length > 1 && <span className="ml-1">({group.length})</span>}
                                    </h4>
                                </div>
                                <ul className="space-y-1">
                                    {group.map(msg => (
                                        <li
                                            key={msg.index}
                                            className={cn('flex items-start justify-between gap-2', sizes[size].text)}
                                        >
                                            <span className={cn('flex-grow', config.textColor)}>
                                                {showFieldNames && msg.field && (
                                                    <span className="font-semibold">
                                                        {msg.field}:{' '}
                                                    </span>
                                                )}
                                                {msg.message}
                                            </span>
                                            {onDismiss && (
                                                <button
                                                    onClick={() => onDismiss(msg.index)}
                                                    className="shrink-0 hover:opacity-70 transition-opacity"
                                                    aria-label={`Dismiss ${msg.message}`}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className={cn('w-4 h-4', config.iconColor)}
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

/**
 * InlineValidation Component
 * Displays inline validation for a single field
 */
export interface InlineValidationProps {
    error?: string;
    success?: string;
    warning?: string;
    info?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const InlineValidation: React.FC<InlineValidationProps> = ({
    error,
    success,
    warning,
    info,
    size = 'md',
    className,
}) => {
    const message = error || success || warning || info;
    const severity: ValidationSeverity = error ? 'error' : success ? 'success' : warning ? 'warning' : 'info';

    if (!message) return null;

    const sizes = {
        sm: {
            text: 'text-xs',
            icon: 14,
            padding: 'px-2 py-1',
            gap: 'gap-1.5',
        },
        md: {
            text: 'text-sm',
            icon: 16,
            padding: 'px-3 py-1.5',
            gap: 'gap-2',
        },
        lg: {
            text: 'text-base',
            icon: 20,
            padding: 'px-4 py-2',
            gap: 'gap-2.5',
        },
    };

    const config = {
        error: {
            icon: XCircle,
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            textColor: 'text-red-700 dark:text-red-400',
            iconColor: 'text-red-500',
        },
        warning: {
            icon: AlertCircle,
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            textColor: 'text-yellow-700 dark:text-yellow-400',
            iconColor: 'text-yellow-500',
        },
        success: {
            icon: CheckCircle2,
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            textColor: 'text-green-700 dark:text-green-400',
            iconColor: 'text-green-500',
        },
        info: {
            icon: Info,
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            textColor: 'text-blue-700 dark:text-blue-400',
            iconColor: 'text-blue-500',
        },
    };

    const currentConfig = config[severity];
    const Icon = currentConfig.icon;

    return (
        <div
            className={cn(
                'flex items-center rounded-lg border border-transparent transition-all duration-200 animate-in slide-in-from-top-2 fade-in',
                currentConfig.bgColor,
                currentConfig.textColor,
                sizes[size].padding,
                sizes[size].gap,
                className
            )}
            role="alert"
            aria-live="polite"
        >
            <Icon size={sizes[size].icon} className={cn('shrink-0', currentConfig.iconColor)} />
            <span className={cn('font-medium', sizes[size].text)}>{message}</span>
        </div>
    );
};

export default ValidationSummary;
