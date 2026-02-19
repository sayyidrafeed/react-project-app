import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: LucideIcon;
    size?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    hint,
    icon: Icon,
    size = 'md',
    className,
    id,
    ...props
}, ref) => {
    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3',
        lg: 'px-5 py-4 text-lg'
    };

    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-semibold text-slate-700"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'input-field w-full',
                        Icon && 'pl-10',
                        error && 'input-error',
                        sizes[size],
                        className
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    {...props}
                />
            </div>
            {error && (
                <p
                    id={`${inputId}-error`}
                    className="text-sm text-semantic-error font-medium"
                    role="alert"
                >
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={`${inputId}-hint`} className="text-sm text-slate-500">
                    {hint}
                </p>
            )}
        </div>
    );
});
Input.displayName = 'Input';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    hint,
    size = 'md',
    className,
    id,
    children,
    ...props
}, ref) => {
    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3',
        lg: 'px-5 py-4 text-lg'
    };

    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-semibold text-slate-700"
                >
                    {label}
                </label>
            )}
            <select
                ref={ref}
                id={selectId}
                className={cn(
                    'input-field w-full cursor-pointer appearance-none',
                    error && 'input-error',
                    sizes[size],
                    className
                )}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
                {...props}
            >
                {children}
            </select>
            {error && (
                <p
                    id={`${selectId}-error`}
                    className="text-sm text-semantic-error font-medium"
                    role="alert"
                >
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={`${selectId}-hint`} className="text-sm text-slate-500">
                    {hint}
                </p>
            )}
        </div>
    );
});
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
    label,
    error,
    hint,
    size = 'md',
    className,
    id,
    ...props
}, ref) => {
    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3',
        lg: 'px-5 py-4 text-lg'
    };

    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-semibold text-slate-700"
                >
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                id={textareaId}
                className={cn(
                    'input-field w-full resize-none',
                    error && 'input-error',
                    sizes[size],
                    className
                )}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
                {...props}
            />
            {error && (
                <p
                    id={`${textareaId}-error`}
                    className="text-sm text-semantic-error font-medium"
                    role="alert"
                >
                    {error}
                </p>
            )}
            {hint && !error && (
                <p id={`${textareaId}-hint`} className="text-sm text-slate-500">
                    {hint}
                </p>
            )}
        </div>
    );
});
Textarea.displayName = 'Textarea';

export default Input;
