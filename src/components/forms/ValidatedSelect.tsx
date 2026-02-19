/**
 * ValidatedSelect Component
 * Enhanced select component with real-time validation feedback
 * Fully responsive and accessible with mobile-first design
 */

import React, { forwardRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ValidatedSelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    group?: string;
}

export interface ValidatedSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    showSuccessIcon?: boolean;
    showErrorIcon?: boolean;
    onClearError?: () => void;
    options: ValidatedSelectOption[];
    placeholder?: string;
    value?: string | number;
}

export const ValidatedSelect = forwardRef<HTMLSelectElement, ValidatedSelectProps>(
    (
        {
            label,
            error,
            hint,
            size = 'md',
            showSuccessIcon = true,
            showErrorIcon = true,
            onClearError,
            options,
            placeholder = 'Select an option',
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
        const hasSuccess = !hasError && value && value !== '';

        const sizes = {
            sm: 'px-3 py-2 text-sm',
            md: 'px-4 py-3',
            lg: 'px-5 py-4 text-lg'
        };

        const iconSizes = {
            sm: 14,
            md: 16,
            lg: 18
        };

        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (onClearError && hasError) {
                onClearError();
            }
            onChange?.(e);
        };

        const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
            setIsFocused(false);
            props.onBlur?.(e);
        };

        // Group options by group property
        const groupedOptions = options.reduce((acc, option) => {
            const group = option.group || 'default';
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(option);
            return acc;
        }, {} as Record<string, ValidatedSelectOption[]>);

        const hasGroups = Object.keys(groupedOptions).length > 1;

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
                    <select
                        ref={ref}
                        id={inputId}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={cn(
                            "input-field w-full cursor-pointer appearance-none transition-all duration-200 pr-10",
                            hasError && "input-error",
                            hasSuccess && showSuccessIcon && !hasError && "ring-2 ring-green-500/20 border-green-500/30",
                            isFocused && !hasError && "ring-2 ring-upn-green/20 dark:ring-upn-gold/20 border-upn-green/30 dark:border-upn-gold/30",
                            sizes[size],
                            !value && "text-slate-400 dark:text-dark-text-muted",
                            className
                        )}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={
                            hasError
                                ? `${inputId}-error`
                                : hint
                                    ? `${inputId}-hint`
                                    : undefined
                        }
                        aria-required={props.required}
                        {...props}
                    >
                        {!value && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {hasGroups ? (
                            Object.entries(groupedOptions).map(([group, groupOptions]) => (
                                <optgroup key={group} label={group !== 'default' ? group : undefined}>
                                    {groupOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            disabled={option.disabled}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </optgroup>
                            ))
                        ) : (
                            options.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </option>
                            ))
                        )}
                    </select>

                    {/* Chevron Icon */}
                    <ChevronDown
                        size={iconSizes[size]}
                        className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none",
                            hasError
                                ? "text-semantic-error"
                                : isFocused
                                    ? "text-upn-green dark:text-upn-gold"
                                    : "text-slate-400 dark:text-dark-text-muted"
                        )}
                    />

                    {/* Success Icon */}
                    {hasSuccess && showSuccessIcon && !hasError && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 dark:text-green-400 animate-in fade-in slide-in-from-right-2 duration-200">
                            <Check size={iconSizes[size]} />
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

                {/* Hint */}
                {hint && !hasError && (
                    <p id={`${inputId}-hint`} className="text-sm text-slate-500 dark:text-dark-text-muted">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

ValidatedSelect.displayName = 'ValidatedSelect';

export default ValidatedSelect;
