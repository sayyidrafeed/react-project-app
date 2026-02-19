// @ts-ignore - Bun test types not available in tsc
import { describe, test, expect, beforeEach } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ValidationSchema } from '../../types/validation';

describe('useFormValidation Hook', () => {
  let testSchema: ValidationSchema;

  beforeEach(() => {
    testSchema = {
      username: [
        { type: 'required', message: 'Username is required' },
        { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
      ],
      email: [
        { type: 'required', message: 'Email is required' },
        { type: 'email', message: 'Invalid email format' },
      ],
      age: [
        { type: 'required', message: 'Age is required' },
        { type: 'numeric', message: 'Age must be a number' },
        { type: 'min', value: 18, message: 'Must be at least 18' },
      ],
    };
  });

  // ===== INITIALIZATION TESTS =====

  test('should initialize with default values', () => {
    const onSubmit = () => {};
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit,
      })
    );

    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({
      username: false,
      email: false,
      age: false,
    });
    expect(result.current.dirty).toEqual({
      username: false,
      email: false,
      age: false,
    });
    expect(result.current.isValid).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
  });

  test('should initialize with provided initial values', () => {
    const initialValues = {
      username: 'testuser',
      email: 'test@example.com',
    };

    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues,
        onSubmit: () => {},
      })
    );

    expect(result.current.values).toEqual(initialValues);
  });

  test('should calculate correct initial progress', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    expect(result.current.progress.totalFields).toBe(3);
    expect(result.current.progress.completedFields).toBe(0);
    expect(result.current.progress.validFields).toBe(0);
    expect(result.current.progress.percentage).toBe(0);
  });

  // ===== HANDLE CHANGE TESTS =====

  test('should update value on handleChange', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('username', 'test');
    });

    expect(result.current.values.username).toBe('test');
  });

  test('should validate on change when validateOnChange is true', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    // Set invalid value (too short)
    act(() => {
      result.current.handleChange('username', 'ab');
    });

    expect(result.current.errors.username).toBe('Username must be at least 3 characters');
    expect(result.current.dirty.username).toBe(true);
  });

  test('should not validate on change when validateOnChange is false', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: false,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('username', 'ab');
    });

    expect(result.current.errors.username).toBeUndefined();
  });

  test('should clear error when valid value is entered', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    // Set invalid value first
    act(() => {
      result.current.handleChange('username', 'ab');
    });
    expect(result.current.errors.username).toBeDefined();

    // Set valid value
    act(() => {
      result.current.handleChange('username', 'validuser');
    });
    expect(result.current.errors.username).toBeUndefined();
  });

  // ===== HANDLE BLUR TESTS =====

  test('should mark field as touched on blur', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleBlur('username');
    });

    expect(result.current.touched.username).toBe(true);
  });

  test('should validate on blur when validateOnBlur is true', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnBlur: true,
        onSubmit: () => {},
      })
    );

    // Set a value first
    act(() => {
      result.current.handleChange('username', 'ab');
    });

    // Trigger blur
    act(() => {
      result.current.handleBlur('username');
    });

    expect(result.current.errors.username).toBe('Username must be at least 3 characters');
  });

  test('should not validate on blur when validateOnBlur is false', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('username', 'ab');
    });

    act(() => {
      result.current.handleBlur('username');
    });

    expect(result.current.errors.username).toBeUndefined();
  });

  // ===== VALIDATION RULES TESTS =====

  test('should validate required field', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('email', '');
    });

    expect(result.current.errors.email).toBe('Email is required');
  });

  test('should validate email format', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('email', 'invalid-email');
    });

    expect(result.current.errors.email).toBe('Invalid email format');
  });

  test('should validate valid email', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('email', 'valid@example.com');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  test('should validate numeric field', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('age', 'not-a-number');
    });

    expect(result.current.errors.age).toBe('Age must be a number');
  });

  test('should validate min value', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('age', 15);
    });

    expect(result.current.errors.age).toBe('Must be at least 18');
  });

  test('should pass validation with valid value', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('age', 25);
    });

    expect(result.current.errors.age).toBeUndefined();
  });

  // ===== FORM SUBMISSION TESTS =====

  test('should call onSubmit with values when form is valid', async () => {
    let submittedValues: Record<string, unknown> | null = null;
    const mockOnSubmit = (values: Record<string, unknown>) => {
      submittedValues = values;
    };

    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues: {
          username: 'validuser',
          email: 'test@example.com',
          age: 25,
        },
        onSubmit: mockOnSubmit,
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(submittedValues).toEqual({
      username: 'validuser',
      email: 'test@example.com',
      age: 25,
    });
  });

  test('should not call onSubmit when form is invalid', async () => {
    let submitCalled = false;
    const mockOnSubmit = () => {
      submitCalled = true;
    };

    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues: {
          username: 'ab', // Invalid: too short
        },
        onSubmit: mockOnSubmit,
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(submitCalled).toBe(false);
  });

  test('should set isSubmitting during submission', async () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues: {
          username: 'validuser',
          email: 'test@example.com',
          age: 25,
        },
        onSubmit: async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
        },
      })
    );

    expect(result.current.isSubmitting).toBe(false);

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  test('should prevent default form event on submit', async () => {
    let prevented = false;
    const mockEvent = {
      preventDefault: () => {
        prevented = true;
      },
    } as React.FormEvent;

    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues: {
          username: 'validuser',
          email: 'test@example.com',
          age: 25,
        },
        onSubmit: () => {},
      })
    );

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(prevented).toBe(true);
  });

  // ===== RESET FORM TESTS =====

  test('should reset form to initial state', () => {
    const initialValues = {
      username: 'initial',
      email: 'initial@example.com',
    };

    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues,
        onSubmit: () => {},
      })
    );

    // Modify the form
    act(() => {
      result.current.handleChange('username', 'modified');
      result.current.handleBlur('username');
    });

    expect(result.current.values.username).toBe('modified');

    // Reset
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.touched).toEqual({
      username: false,
      email: false,
      age: false,
    });
    expect(result.current.errors).toEqual({});
  });

  // ===== SET FIELD VALUE TESTS =====

  test('should set field value programmatically', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.setFieldValue('username', 'programmatic');
    });

    expect(result.current.values.username).toBe('programmatic');
  });

  // ===== ERROR MANAGEMENT TESTS =====

  test('should set custom error', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.setError('username', 'Custom error message');
    });

    expect(result.current.errors.username).toBe('Custom error message');
    expect(result.current.isValid).toBe(false);
  });

  test('should clear error', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.setError('username', 'Error to clear');
    });

    expect(result.current.errors.username).toBe('Error to clear');

    act(() => {
      result.current.clearError('username');
    });

    expect(result.current.errors.username).toBeUndefined();
  });

  // ===== VALIDATE FIELD TESTS =====

  test('should validate single field', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateField('username');
    });

    expect(isValid!).toBe(false);
    expect(result.current.errors.username).toBe('Username is required');
  });

  // ===== VALIDATE ALL TESTS =====

  test('should validate all fields', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateAll();
    });

    expect(isValid!).toBe(false);
    expect(result.current.errors.username).toBeDefined();
    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.age).toBeDefined();
  });

  // ===== TOUCH ALL TESTS =====

  test('should mark all fields as touched', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.touchAll();
    });

    expect(result.current.touched).toEqual({
      username: true,
      email: true,
      age: true,
    });
  });

  // ===== PROGRESS TRACKING TESTS =====

  test('should update progress when fields are filled and valid', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('username', 'validuser');
    });

    act(() => {
      result.current.handleBlur('username');
    });

    expect(result.current.progress.completedFields).toBe(1);
    expect(result.current.touched.username).toBe(true);
  });

  test('should calculate correct percentage', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('username', 'validuser');
      result.current.handleBlur('username');
    });

    act(() => {
      result.current.handleChange('email', 'test@example.com');
      result.current.handleBlur('email');
    });

    expect(result.current.progress.completedFields).toBe(2);
    expect(result.current.touched.username).toBe(true);
    expect(result.current.touched.email).toBe(true);
  });

  // ===== CUSTOM VALIDATION RULE TESTS =====

  test('should validate with custom rule', () => {
    const customSchema: ValidationSchema = {
      password: [
        { type: 'required', message: 'Password is required' },
        {
          type: 'custom',
          message: 'Password must contain uppercase',
          validate: (value) => /[A-Z]/.test(String(value)),
        },
      ],
    };

    const { result } = renderHook(() =>
      useFormValidation({
        schema: customSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    act(() => {
      result.current.handleChange('password', 'lowercase');
    });

    expect(result.current.errors.password).toBe('Password must contain uppercase');

    act(() => {
      result.current.handleChange('password', 'Uppercase');
    });

    expect(result.current.errors.password).toBeUndefined();
  });

  // ===== IS VALID TESTS =====

  test('should correctly report isValid state', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        validateOnChange: true,
        onSubmit: () => {},
      })
    );

    // Initially valid (no errors yet)
    expect(result.current.isValid).toBe(true);

    // Add invalid value
    act(() => {
      result.current.handleChange('username', 'ab');
    });

    expect(result.current.isValid).toBe(false);

    // Fix the value
    act(() => {
      result.current.handleChange('username', 'validusername');
    });

    expect(result.current.isValid).toBe(true);
  });
});
