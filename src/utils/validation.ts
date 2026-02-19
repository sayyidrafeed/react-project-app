/**
 * Validation Utilities and Rules Engine
 * Provides comprehensive validation logic for form fields
 */

import {
    ValidationRule,
    ValidationSchema,
    FormValidationState,
    ValidationResult,
    FieldValidation,
} from '../types/validation';

/**
 * Built-in validation rule implementations
 */
export const validationRules = {
    required: (value: unknown): boolean => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return true;
    },

    minLength: (value: string, min: number): boolean => {
        if (!value) return false;
        return value.length >= min;
    },

    maxLength: (value: string, max: number): boolean => {
        if (!value) return true;
        return value.length <= max;
    },

    min: (value: number, min: number): boolean => {
        return value >= min;
    },

    max: (value: number, max: number): boolean => {
        return value <= max;
    },

    pattern: (value: string, pattern: RegExp): boolean => {
        if (!value) return false;
        return pattern.test(value);
    },

    email: (value: string): boolean => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },

    url: (value: string): boolean => {
        if (!value) return false;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },

    numeric: (value: unknown): boolean => {
        if (value === '' || value === null || value === undefined) return false;
        return !isNaN(Number(value));
    },

    integer: (value: unknown): boolean => {
        if (!validationRules.numeric(value)) return false;
        return Number.isInteger(Number(value));
    },
};

/**
 * Validate a single field against its rules
 */
export const validateField = (
    value: unknown,
    rules: ValidationRule[],
    formData?: Record<string, unknown>
): FieldValidation => {
    const errors: string[] = [];

    for (const rule of rules) {
        let isValid = false;

        switch (rule.type) {
            case 'required':
                isValid = validationRules.required(value);
                break;
            case 'minLength':
                isValid = validationRules.minLength(String(value ?? ''), rule.value as number);
                break;
            case 'maxLength':
                isValid = validationRules.maxLength(String(value ?? ''), rule.value as number);
                break;
            case 'min':
                isValid = validationRules.min(Number(value), rule.value as number);
                break;
            case 'max':
                isValid = validationRules.max(Number(value), rule.value as number);
                break;
            case 'pattern':
                isValid = validationRules.pattern(String(value ?? ''), rule.value as RegExp);
                break;
            case 'email':
                isValid = validationRules.email(String(value ?? ''));
                break;
            case 'url':
                isValid = validationRules.url(String(value ?? ''));
                break;
            case 'numeric':
                isValid = validationRules.numeric(value);
                break;
            case 'integer':
                isValid = validationRules.integer(value);
                break;
            case 'custom':
                if (rule.validate) {
                    isValid = rule.validate(value, formData);
                }
                break;
            default:
                isValid = true;
        }

        if (!isValid) {
            errors.push(rule.message);
            break; // Stop at first error
        }
    }

    return {
        isValid: errors.length === 0,
        error: errors.length > 0 ? errors[0] : null,
        touched: false,
        dirty: false,
    };
};

/**
 * Validate entire form against schema
 */
export const validateForm = (
    formData: Record<string, any>,
    schema: ValidationSchema
): ValidationResult => {
    const errors: Record<string, string> = {};
    const touchedFields = new Set<string>();

    for (const [fieldName, rules] of Object.entries(schema)) {
        const value = formData[fieldName];
        const result = validateField(value, rules, formData);

        if (!result.isValid) {
            errors[fieldName] = result.error || '';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        touchedFields,
    };
};

/**
 * Update validation state for a field
 */
export const updateFieldValidation = (
    state: FormValidationState,
    fieldName: string,
    updates: Partial<FieldValidation>
): FormValidationState => {
    return {
        ...state,
        [fieldName]: {
            ...state[fieldName],
            ...updates,
        },
    };
};

/**
 * Check if form is valid based on validation state
 */
export const isFormValid = (state: FormValidationState): boolean => {
    return Object.values(state).every(field => field.isValid);
};

/**
 * Get all error messages from validation state
 */
export const getFormErrors = (state: FormValidationState): Record<string, string> => {
    const errors: Record<string, string> = {};
    for (const [fieldName, validation] of Object.entries(state)) {
        if (!validation.isValid && validation.error) {
            errors[fieldName] = validation.error;
        }
    }
    return errors;
};

/**
 * Common validation rule presets
 */
export const commonRules = {
    required: (message = 'This field is required'): ValidationRule => ({
        type: 'required',
        message,
    }),

    email: (message = 'Please enter a valid email address'): ValidationRule => ({
        type: 'email',
        message,
    }),

    minLength: (min: number, message?: string): ValidationRule => ({
        type: 'minLength',
        value: min,
        message: message || `Must be at least ${min} characters`,
    }),

    maxLength: (max: number, message?: string): ValidationRule => ({
        type: 'maxLength',
        value: max,
        message: message || `Must be no more than ${max} characters`,
    }),

    min: (min: number, message?: string): ValidationRule => ({
        type: 'min',
        value: min,
        message: message || `Must be at least ${min}`,
    }),

    max: (max: number, message?: string): ValidationRule => ({
        type: 'max',
        value: max,
        message: message || `Must be no more than ${max}`,
    }),

    numeric: (message = 'Must be a number'): ValidationRule => ({
        type: 'numeric',
        message,
    }),

    integer: (message = 'Must be a whole number'): ValidationRule => ({
        type: 'integer',
        message,
    }),

    pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
        type: 'pattern',
        value: regex,
        message,
    }),

    custom: (validate: (value: unknown, formData?: Record<string, unknown>) => boolean, message: string): ValidationRule => ({
        type: 'custom',
        message,
        validate,
    }),
};

/**
 * Task-specific validation rules for mentor dashboard
 */
export const taskValidationRules = {
    grade: [
        commonRules.required('Grade is required'),
        commonRules.numeric('Grade must be a number'),
        commonRules.integer('Grade must be a whole number'),
        commonRules.min(0, 'Grade cannot be negative'),
        commonRules.max(100, 'Grade cannot exceed 100'),
    ],

    feedback: [
        commonRules.minLength(10, 'Feedback must be at least 10 characters'),
        commonRules.maxLength(500, 'Feedback cannot exceed 500 characters'),
    ],

    menteeId: [
        commonRules.required('Mentee selection is required'),
    ],

    taskId: [
        commonRules.required('Task selection is required'),
    ],

    submissionDate: [
        commonRules.required('Submission date is required'),
    ],

    nim: [
        commonRules.required('NIM is required'),
        commonRules.numeric('NIM must contain only numbers'),
        commonRules.minLength(10, 'NIM must be at least 10 digits'),
        commonRules.maxLength(15, 'NIM cannot exceed 15 digits'),
    ],

    email: [
        commonRules.required('Email is required'),
        commonRules.email('Please enter a valid email address'),
    ],

    phoneNumber: [
        commonRules.required('Phone number is required'),
        commonRules.numeric('Phone number must contain only numbers'),
        commonRules.minLength(10, 'Phone number must be at least 10 digits'),
        commonRules.maxLength(15, 'Phone number cannot exceed 15 digits'),
    ],
};
