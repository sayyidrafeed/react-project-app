/**
 * Validation Framework Components Index
 * Centralized exports for all validation components
 *
 * Note: Components are now sourced from components/forms/ as the canonical location.
 * The ui/ versions have been removed to eliminate duplication.
 */

export { ValidatedInput } from '../../forms/ValidatedInput';
export { ValidatedTextarea } from '../../forms/ValidatedTextarea';
export { ValidatedSelect, type ValidatedSelectOption } from '../../forms/ValidatedSelect';
export { ValidatedForm, FormField, FormActions, FormSection } from '../../forms/ValidatedForm';
export { FormProgress } from '../../forms/FormProgress';
export { ValidationSummary, InlineValidation } from '../../forms/ValidationSummary';

export type { ValidatedInputProps } from '../../forms/ValidatedInput';
export type { ValidatedTextareaProps } from '../../forms/ValidatedTextarea';
export type { ValidatedSelectProps } from '../../forms/ValidatedSelect';
export type { ValidatedFormProps, FormFieldProps, FormActionsProps, FormSectionProps } from '../../forms/ValidatedForm';
export type { FormProgressProps } from '../../forms/FormProgress';
export type { ValidationSummaryProps, InlineValidationProps } from '../../forms/ValidationSummary';
