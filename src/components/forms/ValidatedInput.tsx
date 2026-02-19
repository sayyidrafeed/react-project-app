/**
 * ValidatedInput Component
 * Enhanced input component with real-time validation feedback
 * Fully responsive and accessible with mobile-first design
 */

import React, { forwardRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ValidatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: LucideIcon;
    size?: 'sm' | 'md' | 'lg';
    showSuccessIcon?: boolean;
    showErrorIcon?: boolean;
    onClearError?: () => void;
    characterCount?: boolean;
    maxLength?: number;
    value?: string;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
    (
        {
            label,
            error,
            hint,
            icon: Icon,
            size = 'md',
            showSuccessIcon = true,
            showErrorIcon = true,
            onClearError,
            characterCount = false,
            maxLength,
            value,
            className,
            id,
            onChange,
            onFocus,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasError = !!error;
        const hasSuccess = !hasError && value && value.length > 0;

        const sizes = {
            sm: 'px-3 py-2 text-sm',
            md: 'px-4 py-3',
            lg: 'px-5 py-4 text-lg'
        };

        const iconSizes = {
            sm: 16,
            md: 18,
            lg: 20
        };

        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onClearError && hasError) {
                onClearError();
            }
            onChange?.(e);
        };

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            props.onBlur?.(e);
        };

        return (
            <div className="space-y-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "block text-sm font-semibold transition-colors",
                            hasError ? "text-semantic-error" : "text-slate-700 dark:text-dark-text"
                        )}
                    >
                        {label}
                        {props.required && <span className="text-semantic-error ml-1">*</span>}
                    </label>
                )}

                <div className="relative group">
                    {Icon && (
                        <Icon
                            size={iconSizes[size]}
                            className={cn(
                                "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                                hasError
                                    ? "text-semantic-error"
                                    : isFocused
                                        ? "text-upn-green dark:text-upn-gold"
                                        : "text-slate-400 dark:text-dark-text-muted"
                            )}
                        />
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={cn(
                            "input-field w-full transition-all duration-200",
                            Icon && "pl-10",
                            hasError && "input-error",
                            hasSuccess && showSuccessIcon && !hasError && "ring-2 ring-green-500/20 border-green-500/30",
                            isFocused && !hasError && "ring-2 ring-upn-green/20 dark:ring-upn-gold/20 border-upn-green/30 dark:border-upn-gold/30",
                            sizes[size],
                            className
                        )}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={
                            hasError
                                ? `${inputId}-error`
                                : hint
                                    ? `${inputId}-hint`
                                    : characterCount
                                        ? `${inputId}-count`
                                        : undefined
                        }
                        aria-required={props.required}
                        maxLength={maxLength}
                        {...props}
                    />

                    {/* Success Icon */}
                    {hasSuccess && showSuccessIcon && !hasError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 dark:text-green-400 animate-in fade-in slide-in-from-right-2 duration-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn(size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6')}
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                    )}

                    {/* Error Icon */}
                    {hasError && showErrorIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-semantic-error animate-in fade-in slide-in-from-right-2 duration-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn(size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6')}
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {hasError && (
                    <p
                        id={`${inputId}-error`}
                        className="text-sm text-semantic-error font-medium animate-in slide-in-from-top-2 fade-in duration-200"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </p>
                )}

                {/* Hint or Character Count */}
                {hint && !hasError && (
                    <p id={`${inputId}-hint`} className="text-sm text-slate-500 dark:text-dark-text-muted">
                        {hint}
                    </p>
                )}

                {characterCount && maxLength && !hasError && (
                    <div className="flex justify-between items-center">
                        {!hint && <span />}
                        <p
                            id={`${inputId}-count`}
                            className={cn(
                                "text-xs font-medium",
                                value && value.length > maxLength * 0.9
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-slate-400 dark:text-dark-text-muted"
                            )}
                            aria-live="polite"
                        >
                            {value?.length || 0} / {maxLength}
                        </p>
                    </div>
                )}
            </div>
        );
    }
);

ValidatedInput.displayName = 'ValidatedInput';

export default ValidatedInput;
