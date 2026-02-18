import React from 'react';
import { FormProgress } from './FormProgress';
import { ValidationSummary, ValidationMessage } from './ValidationSummary';

export interface ValidatedFormProps<T extends Record<string, unknown> = Record<string, unknown>> {
    children: React.ReactNode;
    schema?: Record<string, unknown>;
    initialValues?: T;
    onSubmit?: (values: T) => void | Promise<void>;
    showProgress?: boolean;
    showSummary?: boolean;
    className?: string;
}

export const FormField: React.FC<{ children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>> = ({ children, ...props }) => {
    return <div className="space-y-1" {...props}>{children}</div>;
};

export const FormActions: React.FC<{
    align?: 'left' | 'center' | 'right' | 'space-between';
    sticky?: boolean;
    children: React.ReactNode;
}> = ({ align = 'right', sticky, children }) => {
    const alignmentClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        'space-between': 'justify-between',
    };

    return (
        <div className={`flex items-center gap-4 py-4 ${alignmentClasses[align]} ${sticky ? 'sticky bottom-0 bg-white border-t border-slate-100 p-4 -mx-4 shadow-lg z-10' : ''}`}>
            {children}
        </div>
    );
};

export const FormSection: React.FC<{
    title: string;
    description?: string;
    collapsible?: boolean;
    children: React.ReactNode;
}> = ({ title, description, children }) => {
    return (
        <div className="space-y-4 border-b border-slate-100 pb-6 mb-6 last:border-0">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                {description && <p className="text-sm text-slate-500">{description}</p>}
            </div>
            <div className="grid gap-4">
                {children}
            </div>
        </div>
    );
};

export const ValidatedForm: React.FC<ValidatedFormProps> = ({
    children,
    onSubmit,
    showProgress,
    showSummary,
    className
}) => {
    const mockProgress = { 
        totalFields: 10, 
        completedFields: 3, 
        validFields: 3, 
        percentage: 30 
    };
    const mockMessages: ValidationMessage[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-6 ${className || ''}`}>
            {showProgress && <FormProgress progress={mockProgress} />}
            {showSummary && <ValidationSummary messages={mockMessages} />}
            {children}
        </form>
    );
};

export type FormFieldProps = React.ComponentProps<typeof FormField>;
export type FormActionsProps = React.ComponentProps<typeof FormActions>;
export type FormSectionProps = React.ComponentProps<typeof FormSection>;
