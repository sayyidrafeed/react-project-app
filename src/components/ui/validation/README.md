# Task Validation Framework

A comprehensive, responsive validation framework for the mentor dashboard that enforces data integrity while maintaining a unified user interface across all device viewports.

## Features

### 🎯 Data Integrity
- **Strict validation rules** for all form inputs
- **Real-time validation** with immediate feedback
- **Type-safe** validation with TypeScript support
- **Customizable validation schemas** for different form types

### 📱 Responsive Design
- **Mobile-first approach** using CSS grid and flexbox
- **Pixel-perfect consistency** across all device viewports
- **Touch-optimized interactions** for mobile devices
- **Adaptive layouts** that scale from mobile to desktop

### ♿ Accessibility
- **ARIA labels** and roles for screen readers
- **Keyboard navigation** support throughout
- **Focus indicators** for visual clarity
- **Screen reader friendly** error messages
- **High contrast mode** support
- **Reduced motion** support for users with vestibular disorders

### 🎨 User Experience
- **Real-time input checking** with visual feedback
- **Success states** with animated indicators
- **Error messaging** with clear, actionable feedback
- **Character counts** for text inputs
- **Progress tracking** for form completion
- **Smooth animations** and transitions

## Components

### ValidatedInput
Enhanced input component with real-time validation feedback.

```tsx
import { ValidatedInput } from '@/components/ui/validation';

<ValidatedInput
  name="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  error={errors.email}
  hint="We'll send notifications to this email"
  showSuccessIcon
  showErrorIcon
  characterCount
  maxLength={100}
/>
```

**Props:**
- `name`: Field identifier
- `type`: Input type (text, number, email, url, etc.)
- `label`: Field label
- `placeholder`: Placeholder text
- `error`: Error message to display
- `hint`: Helper text
- `required`: Whether field is required
- `disabled`: Whether field is disabled
- `size`: sm | md | lg
- `showSuccessIcon`: Show success icon when valid
- `showErrorIcon`: Show error icon when invalid
- `characterCount`: Show character count
- `maxLength`: Maximum character length
- `icon`: Lucide icon component

### ValidatedTextarea
Enhanced textarea with auto-resize and validation.

```tsx
import { ValidatedTextarea } from '@/components/ui/validation';

<ValidatedTextarea
  name="feedback"
  label="Feedback"
  placeholder="Enter your feedback..."
  required
  error={errors.feedback}
  hint="Provide constructive feedback"
  maxLength={500}
  characterCount
  autoResize
  minHeight="120px"
  maxHeight="300px"
/>
```

**Props:**
- All ValidatedInput props plus:
- `autoResize`: Auto-resize textarea
- `minHeight`: Minimum height
- `maxHeight`: Maximum height
- `rows`: Number of visible rows

### ValidatedSelect
Enhanced select dropdown with validation.

```tsx
import { ValidatedSelect, type ValidatedSelectOption } from '@/components/ui/validation';

const options: ValidatedSelectOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

<ValidatedSelect
  name="status"
  label="Status"
  placeholder="Select status"
  options={options}
  required
  error={errors.status}
/>
```

**Props:**
- `options`: Array of ValidatedSelectOption
- `placeholder`: Placeholder text
- All ValidatedInput props except type and icon

### ValidatedForm
Comprehensive form wrapper with validation state management.

```tsx
import { ValidatedForm, FormField, FormActions, FormSection } from '@/components/ui/validation';
import { useFormValidation } from '@/hooks/useFormValidation';

<ValidatedForm
  schema={validationSchema}
  initialValues={initialValues}
  onSubmit={handleSubmit}
  showProgress
  showSummary
>
  <FormSection title="Personal Information">
    <FormField
      name="name"
      type="text"
      label="Full Name"
      required
    />
    <FormField
      name="email"
      type="email"
      label="Email"
      required
    />
  </FormSection>

  <FormActions align="right">
    <button type="button">Cancel</button>
    <button type="submit">Submit</button>
  </FormActions>
</ValidatedForm>
```

**Props:**
- `schema`: Validation schema object
- `initialValues`: Initial form values
- `onSubmit`: Submit handler
- `validateOnChange`: Validate on input change
- `validateOnBlur`: Validate on blur
- `showProgress`: Show form progress bar
- `showSummary`: Show validation summary
- `layout`: vertical | horizontal | grid
- `gridColumns`: Number of grid columns (1-4)

### FormField
Simplified field component for use within ValidatedForm.

```tsx
<FormField
  name="grade"
  type="number"
  label="Grade"
  placeholder="0-100"
  required
  hint="Enter a value between 0-100"
  size="lg"
/>
```

### FormActions
Responsive form action buttons container.

```tsx
<FormActions align="space-between" sticky>
  <button type="button">Cancel</button>
  <div className="flex gap-2">
    <button type="button">Save Draft</button>
    <button type="submit">Submit</button>
  </div>
</FormActions>
```

**Props:**
- `align`: left | center | right | space-between
- `sticky`: Stick to bottom of viewport

### FormSection
Organizes form fields into logical sections.

```tsx
<FormSection
  title="Task Details"
  description="Provide information about the task"
  collapsible
>
  <FormField name="title" type="text" label="Title" required />
  <FormField name="description" type="textarea" label="Description" />
</FormSection>
```

**Props:**
- `title`: Section title
- `description`: Section description
- `collapsible`: Allow collapsing section

### FormProgress
Displays form completion progress with visual indicators.

```tsx
import { FormProgress } from '@/components/ui/validation';

<FormProgress
  progress={progress}
  showDetails
  size="md"
/>
```

**Props:**
- `progress`: FormProgress object
- `showDetails`: Show detailed stats
- `size`: sm | md | lg

### ValidationSummary
Displays form-wide validation status with actionable feedback.

```tsx
import { ValidationSummary } from '@/components/ui/validation';

<ValidationSummary
  messages={validationMessages}
  onDismiss={handleDismiss}
  showFieldNames
  variant="detailed"
/>
```

**Props:**
- `messages`: Array of ValidationMessage
- `onDismiss`: Dismiss handler
- `showFieldNames`: Show field names in messages
- `size`: sm | md | lg
- `variant`: default | compact | detailed

### InlineValidation
Displays inline validation for a single field.

```tsx
import { InlineValidation } from '@/components/ui/validation';

<InlineValidation
  error="This field is required"
  size="md"
/>
```

## Validation Schema

Define validation rules for your form:

```tsx
import { ValidationSchema } from '@/types/validation';
import { commonRules } from '@/utils/validation';

const validationSchema: ValidationSchema = {
  email: [
    commonRules.required('Email is required'),
    commonRules.email('Please enter a valid email'),
  ],
  grade: [
    commonRules.required('Grade is required'),
    commonRules.numeric('Grade must be a number'),
    commonRules.min(0, 'Grade cannot be negative'),
    commonRules.max(100, 'Grade cannot exceed 100'),
  ],
  feedback: [
    commonRules.minLength(10, 'Feedback must be at least 10 characters'),
    commonRules.maxLength(500, 'Feedback cannot exceed 500 characters'),
  ],
};
```

## Built-in Validation Rules

### Required
```tsx
commonRules.required('This field is required')
```

### Email
```tsx
commonRules.email('Please enter a valid email')
```

### Min/Max Length
```tsx
commonRules.minLength(10, 'Must be at least 10 characters')
commonRules.maxLength(500, 'Cannot exceed 500 characters')
```

### Min/Max Value
```tsx
commonRules.min(0, 'Cannot be negative')
commonRules.max(100, 'Cannot exceed 100')
```

### Numeric/Integer
```tsx
commonRules.numeric('Must be a number')
commonRules.integer('Must be a whole number')
```

### Pattern
```tsx
commonRules.pattern(/^[A-Z]{2}[0-9]{9}$/, 'Invalid format')
```

### Custom
```tsx
commonRules.custom(
  (value, formData) => value === formData.confirmPassword,
  'Passwords must match'
)
```

## useFormValidation Hook

React hook for form validation state management.

```tsx
import { useFormValidation } from '@/hooks/useFormValidation';

const {
  values,
  errors,
  touched,
  dirty,
  isValid,
  isSubmitting,
  progress,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm,
  setFieldValue,
  setError,
  clearError,
  validateField,
  validateAll,
  touchAll,
} = useFormValidation({
  schema: validationSchema,
  initialValues: { email: '', grade: 0 },
  validateOnChange: true,
  validateOnBlur: true,
  onSubmit: async (values) => {
    await api.submit(values);
  },
});
```

## Responsive Breakpoints

The framework uses these breakpoints:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## Accessibility Features

### ARIA Support
- All form fields have proper ARIA labels
- Error messages use `role="alert"` and `aria-live="polite"`
- Progress bars have `role="progressbar"` with `aria-valuenow`
- Focus management for modals and dialogs

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Focus indicators are clearly visible
- Skip links provided for keyboard users

### Screen Reader Support
- Error messages announced to screen readers
- Success states clearly communicated
- Form progress announced
- Character counts announced

### Visual Accessibility
- High contrast mode support
- Reduced motion support
- Large touch targets (min 44x44px on mobile)
- Clear visual hierarchy

## CSS Classes

The framework includes utility classes for responsive layouts:

```css
.form-grid-1  /* Single column */
.form-grid-2  /* Two columns on tablet+ */
.form-grid-3  /* Three columns on desktop */
.form-grid-4  /* Four columns on desktop */

.responsive-spacing-sm  /* Mobile-first spacing */
.responsive-padding-md  /* Responsive padding */
.responsive-text-lg  /* Responsive text sizes */
```

## Best Practices

### 1. Mobile-First Design
Always design for mobile first, then enhance for larger screens:

```tsx
// Good
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Fields */}
</div>

// Bad
<div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-1">
  {/* Fields */}
</div>
```

### 2. Touch Optimization
Ensure touch targets are large enough:

```tsx
<button className="min-h-[44px] min-w-[44px]">
  Click me
</button>
```

### 3. Clear Error Messages
Provide actionable error messages:

```tsx
// Good
commonRules.minLength(10, 'Must be at least 10 characters')

// Bad
commonRules.minLength(10, 'Too short')
```

### 4. Progressive Enhancement
Start with basic functionality, then enhance:

```tsx
<FormField
  name="feedback"
  type="textarea"
  label="Feedback"
  required
  // Basic validation
  maxLength={500}
  // Enhanced features
  characterCount
  autoResize
/>
```

### 5. Accessibility First
Always include accessibility features:

```tsx
<input
  aria-label="Email address"
  aria-invalid={hasError}
  aria-describedby={error ? 'email-error' : 'email-hint'}
  aria-required="true"
/>
```

## Examples

### Task Grading Form
```tsx
<ValidatedForm
  schema={taskValidationSchema}
  initialValues={{ menteeId: '', grade: 0, feedback: '' }}
  onSubmit={handleSubmit}
  showProgress
>
  <FormField name="menteeId" type="select" label="Mentee" options={menteeOptions} required />
  <FormField name="grade" type="number" label="Grade" required hint="0-100" />
  <FormField name="feedback" type="textarea" label="Feedback" required maxLength={500} characterCount />
  <FormActions>
    <button type="submit">Submit Grade</button>
  </FormActions>
</ValidatedForm>
```

### Multi-Section Form
```tsx
<ValidatedForm schema={schema} onSubmit={handleSubmit}>
  <FormSection title="Personal Info" description="Basic information">
    <FormField name="name" type="text" label="Name" required />
    <FormField name="email" type="email" label="Email" required />
  </FormSection>
  
  <FormSection title="Task Details" description="Task information">
    <FormField name="title" type="text" label="Title" required />
    <FormField name="description" type="textarea" label="Description" />
  </FormSection>
  
  <FormActions align="space-between">
    <button type="button">Cancel</button>
    <button type="submit">Save</button>
  </FormActions>
</ValidatedForm>
```

## Integration

To integrate the validation framework into your pages:

1. Import the components:
```tsx
import { ValidatedForm, FormField } from '@/components/ui/validation';
import { useFormValidation } from '@/hooks/useFormValidation';
```

2. Define your validation schema:
```tsx
const schema: ValidationSchema = {
  // Define rules
};
```

3. Use the components:
```tsx
<ValidatedForm schema={schema} onSubmit={handleSubmit}>
  {/* Form fields */}
</ValidatedForm>
```

4. Import the CSS:
```tsx
import '@/components/ui/validation.css';
```

## Testing

Test the validation framework across:

- **Devices**: Mobile, tablet, desktop
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Input Methods**: Mouse, keyboard, touch
- **Viewports**: 320px to 1920px width

## License

This validation framework is part of the SIERA project.
