/**
 * ValidatedTextarea Component
 * Enhanced textarea component with real-time validation feedback
 * Fully responsive and accessible with mobile-first design
 */

import React, { forwardRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    showSuccessIcon?: boolean;
    showErrorIcon?: boolean;
    onClearError?: () => void;
    characterCount?: boolean;
    maxLength?: number;
    value?: string;
    autoResize?: boolean;
    minHeight?: string;
    maxHeight?: string;
}

export const ValidatedTextarea = forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(
    (
        {
            label,
            error,
            hint,
            size = 'md',
            showSuccessIcon = true,
            showErrorIcon = true,
            onClearError,
            characterCount = false,
            maxLength,
            value,
            autoResize = false,
            minHeight = '100px',
            maxHeight = '300px',
            className,
            id,
            onChange,
            onFocus,
            rows = 4,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasError = !!error;
        const hasSuccess = !hasError && value && value.length > 0;
        const textareaRef = React.useRef<HTMLTextAreaElement>(null);

        // Auto-resize textarea
        React.useEffect(() => {
            if (autoResize && textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${Math.min(
                    Math.max(textareaRef.current.scrollHeight, parseInt(minHeight)),
                    parseInt(maxHeight)
                )}px`;
            }
        }, [value, autoResize, minHeight, maxHeight]);

        const sizes = {
            sm: 'px-3 py-2 text-sm',
            md: 'px-4 py-3',
            lg: 'px-5 py-4 text-lg'
        };

        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (onClearError && hasError) {
                onClearError();
            }
            onChange?.(e);
        };

        const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(false);
            props.onBlur?.(e);
        };

        const setRefs = (element: HTMLTextAreaElement | null) => {
            textareaRef.current = element;
            if (typeof ref === 'function') {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
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
                    <textarea
                        ref={setRefs}
                        id={inputId}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        rows={rows}
                        style={{
                            minHeight: autoResize ? minHeight : undefined,
                            maxHeight: autoResize ? maxHeight : undefined,
                            resize: autoResize ? 'none' : 'vertical',
                        }}
                        className={cn(
                            "input-field w-full transition-all duration-200",
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
                        <div className="absolute right-3 top-3 text-green-500 dark:text-green-400 animate-in fade-in slide-in-from-right-2 duration-200">
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
                        <div className="absolute right-3 top-3 text-semantic-error animate-in fade-in slide-in-from-right-2 duration-200">
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
                <div className="flex justify-between items-start gap-2">
                    {hint && !hasError && (
                        <p id={`${inputId}-hint`} className="text-sm text-slate-500 dark:text-dark-text-muted flex-grow">
                            {hint}
                        </p>
                    )}
                    {characterCount && maxLength && !hasError && (
                        <p
                            id={`${inputId}-count`}
                            className={cn(
                                "text-xs font-medium whitespace-nowrap",
                                value && value.length > maxLength * 0.9
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-slate-400 dark:text-dark-text-muted"
                            )}
                            aria-live="polite"
                        >
                            {value?.length || 0} / {maxLength}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

ValidatedTextarea.displayName = 'ValidatedTextarea';

export default ValidatedTextarea;
