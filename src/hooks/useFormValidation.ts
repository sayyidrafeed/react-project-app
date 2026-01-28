/**
 * useFormValidation Hook
 * Provides comprehensive form validation with real-time feedback
 * Supports mobile-first responsive design and accessibility
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import {
    ValidationSchema,
    FormValidationState,
    FormConfig,
    FormProgress,
    FieldValidation,
} from '../types/validation';
import {
    validateField,
    updateFieldValidation,
    isFormValid,
    getFormErrors,
} from '../utils/validation';

interface UseFormValidationOptions {
    schema: ValidationSchema;
    initialValues?: Record<string, any>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    onSubmit: (values: Record<string, any>) => void | Promise<void>;
}

interface UseFormValidationReturn {
    values: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    dirty: Record<string, boolean>;
    isValid: boolean;
    isSubmitting: boolean;
    progress: FormProgress;
    handleChange: (fieldName: string, value: any) => void;
    handleBlur: (fieldName: string) => void;
    handleSubmit: (e?: React.FormEvent) => Promise<void>;
    resetForm: () => void;
    setFieldValue: (fieldName: string, value: any) => void;
    setError: (fieldName: string, error: string | null) => void;
    clearError: (fieldName: string) => void;
    validateField: (fieldName: string) => boolean;
    validateAll: () => boolean;
    touchAll: () => void;
}

export const useFormValidation = ({
    schema,
    initialValues = {},
    validateOnChange = true,
    validateOnBlur = true,
    onSubmit,
}: UseFormValidationOptions): UseFormValidationReturn => {
    // Initialize form state
    const [values, setValues] = useState<Record<string, any>>(initialValues);
    const [validationState, setValidationState] = useState<FormValidationState>(() => {
        const state: FormValidationState = {};
        for (const fieldName of Object.keys(schema)) {
            state[fieldName] = {
                isValid: true,
                error: null,
                touched: false,
                dirty: false,
            };
        }
        return state;
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    // Ref to track if component is mounted
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Calculate form progress
    const calculateProgress = useCallback((): FormProgress => {
        const totalFields = Object.keys(schema).length;
        const completedFields = touchedFields.size;
        const validFields = Object.values(validationState).filter(
            field => field.isValid && field.touched
        ).length;
        const percentage = totalFields > 0 ? Math.round((validFields / totalFields) * 100) : 0;

        return {
            totalFields,
            completedFields,
            validFields,
            percentage,
        };
    }, [schema, validationState, touchedFields]);

    const progress = calculateProgress();

    // Handle field value change with validation
    const handleChange = useCallback((fieldName: string, value: any) => {
        if (!isMounted.current) return;

        setValues(prev => ({ ...prev, [fieldName]: value }));

        if (validateOnChange && schema[fieldName]) {
            const result = validateField(value, schema[fieldName], values);
            setValidationState(prev =>
                updateFieldValidation(prev, fieldName, {
                    ...result,
                    dirty: true,
                })
            );
        }
    }, [validateOnChange, schema, values]);

    // Handle field blur with validation
    const handleBlur = useCallback((fieldName: string) => {
        if (!isMounted.current) return;

        setTouchedFields(prev => new Set(prev).add(fieldName));

        if (validateOnBlur && schema[fieldName]) {
            const result = validateField(values[fieldName], schema[fieldName], values);
            setValidationState(prev =>
                updateFieldValidation(prev, fieldName, {
                    ...result,
                    touched: true,
                })
            );
        }
    }, [validateOnBlur, schema, values]);

    // Validate a specific field
    const validateFieldFn = useCallback((fieldName: string): boolean => {
        if (!schema[fieldName]) return true;

        const result = validateField(values[fieldName], schema[fieldName], values);
        setValidationState(prev =>
            updateFieldValidation(prev, fieldName, {
                ...result,
                touched: true,
            })
        );

        return result.isValid;
    }, [schema, values]);

    // Validate all fields
    const validateAll = useCallback((): boolean => {
        let allValid = true;

        for (const fieldName of Object.keys(schema)) {
            const result = validateField(values[fieldName], schema[fieldName], values);
            if (!result.isValid) {
                allValid = false;
            }
            setValidationState(prev =>
                updateFieldValidation(prev, fieldName, {
                    ...result,
                    touched: true,
                })
            );
        }

        return allValid;
    }, [schema, values]);

    // Mark all fields as touched
    const touchAll = useCallback(() => {
        setTouchedFields(prev => new Set([...prev, ...Object.keys(schema)]));
        setValidationState(prev => {
            const newState = { ...prev };
            for (const fieldName of Object.keys(schema)) {
                newState[fieldName] = { ...newState[fieldName], touched: true };
            }
            return newState;
        });
    }, [schema]);

    // Set field value programmatically
    const setFieldValue = useCallback((fieldName: string, value: any) => {
        handleChange(fieldName, value);
    }, [handleChange]);

    // Set error programmatically
    const setError = useCallback((fieldName: string, error: string | null) => {
        setValidationState(prev =>
            updateFieldValidation(prev, fieldName, {
                isValid: error === null,
                error,
                touched: true,
            })
        );
    }, []);

    // Clear error for a field
    const clearError = useCallback((fieldName: string) => {
        setError(fieldName, null);
    }, [setError]);

    // Handle form submission
    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!isMounted.current) return;

        // Validate all fields
        const isFormValid = validateAll();

        if (!isFormValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(values);
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        } finally {
            if (isMounted.current) {
                setIsSubmitting(false);
            }
        }
    }, [validateAll, onSubmit, values]);

    // Reset form to initial state
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setTouchedFields(new Set());
        setValidationState(() => {
            const state: FormValidationState = {};
            for (const fieldName of Object.keys(schema)) {
                state[fieldName] = {
                    isValid: true,
                    error: null,
                    touched: false,
                    dirty: false,
                };
            }
            return state;
        });
    }, [initialValues, schema]);

    // Extract errors from validation state
    const errors = getFormErrors(validationState);

    // Extract touched state
    const touched = Object.fromEntries(
        Object.entries(validationState).map(([name, field]) => [name, field.touched])
    );

    // Extract dirty state
    const dirty = Object.fromEntries(
        Object.entries(validationState).map(([name, field]) => [name, field.dirty])
    );

    return {
        values,
        errors,
        touched,
        dirty,
        isValid: isFormValid(validationState),
        isSubmitting,
        progress,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
        setError,
        clearError,
        validateField: validateFieldFn,
        validateAll,
        touchAll,
    };
};
