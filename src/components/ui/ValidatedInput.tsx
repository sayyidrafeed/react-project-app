import React from 'react';
import { Input, InputProps } from './Input';
import { Check, AlertCircle, LucideIcon } from 'lucide-react';

export interface ValidatedInputProps extends Omit<InputProps, 'icon'> {
    showSuccessIcon?: boolean;
    showErrorIcon?: boolean;
    characterCount?: boolean;
    maxLength?: number;
    icon?: LucideIcon;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
    showSuccessIcon = true,
    showErrorIcon = true,
    characterCount,
    maxLength,
    value,
    error,
    className,
    icon: Icon,
    ...props
}) => {
    const isValid = !error && value && value.toString().length > 0;
    const isInvalid = !!error;

    return (
        <div className="relative">
            <Input
                {...props}
                value={value}
                error={error}
                className={className}
                maxLength={maxLength}
                icon={Icon}
            />
            
            <div className="absolute right-3 top-[38px] pointer-events-none flex items-center gap-2">
                {isValid && showSuccessIcon && (
                    <Check size={16} className="text-green-500" />
                )}
                {isInvalid && showErrorIcon && (
                    <AlertCircle size={16} className="text-red-500" />
                )}
            </div>

            {characterCount && maxLength && (
                <div className="text-xs text-slate-400 text-right mt-1">
                    {value?.toString().length || 0}/{maxLength}
                </div>
            )}
        </div>
    );
};
