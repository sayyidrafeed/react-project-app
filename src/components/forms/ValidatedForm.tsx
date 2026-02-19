/**
 * ValidatedForm Component
 * Comprehensive form wrapper with validation and responsive layouts
 * Mobile-first design using CSS grid and flexbox
 * Fully accessible with touch-optimized interactions
 */

import React, { ReactNode, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ValidationSchema, ValidationMessage } from '../../types/validation';
import { ValidatedInput } from './ValidatedInput';
import { ValidatedTextarea } from './ValidatedTextarea';
import { ValidatedSelect, ValidatedSelectOption } from './ValidatedSelect';
import { FormProgress } from './FormProgress';
import { ValidationSummary } from './ValidationSummary';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ValidatedFormProps {
    schema: ValidationSchema;
    initialValues?: Record<string, any>;
    onSubmit: (values: Record<string, any>) => void | Promise<void>;
    children: ReactNode;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    showProgress?: boolean;
    showSummary?: boolean;
    className?: string;
    id?: string;
    layout?: 'vertical' | 'horizontal' | 'grid';
    gridColumns?: 1 | 2 | 3 | 4;
}

export const ValidatedForm = forwardRef<HTMLFormElement, ValidatedFormProps>(
    (
        {
            schema,
            initialValues = {},
            onSubmit,
            children,
            validateOnChange = true,
            validateOnBlur = true,
            showProgress = false,
            showSummary = true,
            className,
            id,
            layout = 'vertical',
            gridColumns = 2,
        },
        ref
    ) => {
        const {
            values,
            errors,
            touched,
            isValid,
            isSubmitting,
            progress,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            setFieldValue,
            clearError,
        } = useFormValidation({
            schema,
            initialValues,
            validateOnChange,
            validateOnBlur,
            onSubmit,
        });

        // Convert errors to ValidationMessage format
        const validationMessages: ValidationMessage[] = Object.entries(errors).map(
            ([field, error]) => ({
                type: 'error',
                message: error,
                field,
            })
        );

        const getLayoutClasses = () => {
            switch (layout) {
                case 'vertical':
                    return 'space-y-4 sm:space-y-6';
                case 'horizontal':
                    return 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6';
                case 'grid':
                    return `grid grid-cols-1 sm:grid-cols-${Math.min(gridColumns, 2)} lg:grid-cols-${gridColumns} gap-4 sm:gap-6`;
                default:
                    return 'space-y-4 sm:space-y-6';
            }
        };

        return (
            <form
                ref={ref}
                id={id}
                onSubmit={handleSubmit}
                className={cn('w-full', className)}
                noValidate
            >
                {showProgress && <FormProgress progress={progress} className="mb-6" />}

                {showSummary && validationMessages.length > 0 && (
                    <ValidationSummary
                        messages={validationMessages}
                        onDismiss={(index) => {
                            const field = validationMessages[index].field;
                            if (field) clearError(field);
                        }}
                        className="mb-6"
                    />
                )}

                <div className={getLayoutClasses()}>
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement(child)) return child;

                        // Pass form context to children
                        return React.cloneElement(child as React.ReactElement<any>, {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            clearError,
                            isValid,
                            isSubmitting,
                            resetForm,
                        });
                    })}
                </div>
            </form>
        );
    }
);

ValidatedForm.displayName = 'ValidatedForm';

/**
 * FormField Component
 * Wrapper for individual form fields with responsive layout
 */
export interface FormFieldProps {
    name: string;
    label?: string;
    type?: 'text' | 'number' | 'email' | 'url' | 'textarea' | 'select';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    fullWidth?: boolean;
    options?: ValidatedSelectOption[];
    maxLength?: number;
    characterCount?: boolean;
    autoResize?: boolean;
    minHeight?: string;
    maxHeight?: string;
    icon?: LucideIcon;
    // Form context props (injected by ValidatedForm)
    values?: Record<string, any>;
    errors?: Record<string, string>;
    touched?: Record<string, boolean>;
    handleChange?: (name: string, value: unknown) => void;
    handleBlur?: (name: string) => void;
    setFieldValue?: (name: string, value: unknown) => void;
    clearError?: (name: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    hint,
    size = 'md',
    className,
    fullWidth = true,
    options,
    maxLength,
    characterCount = false,
    autoResize = false,
    minHeight = '100px',
    maxHeight = '300px',
    icon: Icon,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue: _setFieldValue,
    clearError,
}) => {
    const value = values?.[name] ?? '';
    const error = errors?.[name];
    const isTouched = touched?.[name] ?? false;

    const widthClass = fullWidth ? 'w-full' : 'w-auto';

    const handleFieldChange = (newValue: unknown) => {
        handleChange?.(name, newValue);
    };

    const handleFieldBlur = () => {
        handleBlur?.(name);
    };

    const handleClearError = () => {
        clearError?.(name);
    };

    const commonProps = {
        id: name,
        name,
        value,
        label,
        error: isTouched ? error : undefined,
        hint,
        size,
        className: cn(widthClass, className),
        disabled,
        required,
        onChange: handleFieldChange,
        onBlur: handleFieldBlur,
        onClearError: handleClearError,
    };

    if (type === 'textarea') {
        return (
            <ValidatedTextarea
                {...commonProps}
                placeholder={placeholder}
                maxLength={maxLength}
                characterCount={characterCount}
                autoResize={autoResize}
                minHeight={minHeight}
                maxHeight={maxHeight}
            />
        );
    }

    if (type === 'select' && options) {
        return (
            <ValidatedSelect
                {...commonProps}
                placeholder={placeholder}
                options={options}
            />
        );
    }

    return (
        <ValidatedInput
            {...commonProps}
            type={type}
            placeholder={placeholder}
            icon={Icon}
            maxLength={maxLength}
            characterCount={characterCount}
        />
    );
};

/**
 * FormActions Component
 * Responsive form action buttons with touch optimization
 */
export interface FormActionsProps {
    children: ReactNode;
    align?: 'left' | 'center' | 'right' | 'space-between';
    className?: string;
    sticky?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
    children,
    align = 'right',
    className,
    sticky = false,
}) => {
    const alignClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        'space-between': 'justify-between',
    };

    return (
        <div
            className={cn(
                'flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-dark-border',
                alignClasses[align],
                sticky && 'sticky bottom-0 bg-white dark:bg-dark-surface z-10',
                className
            )}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                const childProps = child.props as any;

                // Make buttons full width on mobile, auto on desktop
                if (child.type === 'button' || childProps?.as === 'button') {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        className: cn(
                            'w-full sm:w-auto min-w-[120px] sm:min-w-[140px]',
                            childProps.className
                        ),
                    });
                }

                return child;
            })}
        </div>
    );
};

/**
 * FormSection Component
 * Organizes form fields into logical sections
 */
export interface FormSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
    collapsible?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
    title,
    description,
    children,
    className,
    collapsible = false,
}) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <div className={cn('space-y-4', className)}>
            {(title || description) && (
                <div className="space-y-1">
                    {title && (
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-dark-text">
                                {title}
                            </h3>
                            {collapsible && (
                                <button
                                    type="button"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="text-sm font-semibold text-upn-green dark:text-upn-gold hover:underline"
                                >
                                    {isCollapsed ? 'Show' : 'Hide'}
                                </button>
                            )}
                        </div>
                    )}
                    {description && !isCollapsed && (
                        <p className="text-sm text-slate-600 dark:text-dark-text-muted">
                            {description}
                        </p>
                    )}
                </div>
            )}
            {!isCollapsed && (
                <div className="space-y-4 sm:space-y-5">{children}</div>
            )}
        </div>
    );
};

export default ValidatedForm;
