import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface CardProps {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    variant = 'default',
    padding = 'md',
    hoverable = false,
    className,
    children
}) => {
    const variants = {
        default: 'card',
        elevated: 'card-elevated',
        outlined: 'card-outlined'
    };

    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div
            className={cn(
                variants[variant],
                paddings[padding],
                hoverable && 'cursor-pointer hover:shadow-xl hover:-translate-y-1',
                className
            )}
        >
            {children}
        </div>
    );
};

export interface CardHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    action,
    className
}) => {
    return (
        <div className={cn('flex justify-between items-start mb-4', className)}>
            <div>
                <h3 className="text-h3 font-extrabold text-upn-green">{title}</h3>
                {subtitle && (
                    <p className="text-body-sm text-slate-600 mt-1">{subtitle}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};

export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
    return <div className={cn('space-y-4', className)}>{children}</div>;
};

export interface CardFooterProps {
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right' | 'between';
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
    children,
    align = 'right',
    className
}) => {
    const alignments = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between'
    };

    return (
        <div className={cn('flex gap-2 mt-6 pt-4 border-t border-slate-200', alignments[align], className)}>
            {children}
        </div>
    );
};

export default Card;
