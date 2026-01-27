import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon: Icon,
    iconPosition = 'left',
    children,
    className,
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    const isDisabled = disabled || loading;

    return (
        <button
            className={cn(
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                isDisabled && 'opacity-70 cursor-not-allowed',
                className
            )}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <>
                    <div className="spinner" />
                    {children && <span>{children}</span>}
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon size={18} />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon size={18} />}
                </>
            )}
        </button>
    );
};

export default Button;
