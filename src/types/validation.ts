/**
 * Validation Types for Task Validation Framework
 * Provides type safety and structure for form validation across the application
 */

export type ValidationRuleType =
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'min'
    | 'max'
    | 'pattern'
    | 'email'
    | 'url'
    | 'numeric'
    | 'integer'
    | 'custom';

export interface ValidationRule {
    type: ValidationRuleType;
    value?: number | string | RegExp;
    message: string;
    validate?: (value: any, formData?: Record<string, any>) => boolean;
}

export interface FieldValidation {
    isValid: boolean;
    error: string | null;
    touched: boolean;
    dirty: boolean;
}

export interface FormValidationState {
    [fieldName: string]: FieldValidation;
}

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
    touchedFields: Set<string>;
}

export interface ValidationSchema {
    [fieldName: string]: ValidationRule[];
}

export interface FormFieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'email' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validation?: ValidationRule[];
    hint?: string;
    options?: Array<{ value: string | number; label: string }>;
}

export interface FormConfig {
    fields: FormFieldConfig[];
    onSubmit: (values: Record<string, any>) => void | Promise<void>;
    initialValues?: Record<string, any>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
}

export type ValidationSeverity = 'error' | 'warning' | 'success' | 'info';

export interface ValidationMessage {
    type: ValidationSeverity;
    message: string;
    field?: string;
}

export interface FormProgress {
    totalFields: number;
    completedFields: number;
    validFields: number;
    percentage: number;
}
