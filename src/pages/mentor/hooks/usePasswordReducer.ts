import { useReducer } from 'react';

/**
 * Password form values structure
 */
export interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

/**
 * Password state managed by the reducer
 */
export interface PasswordState {
    pending: PasswordFormValues | null;
    confirmOpen: boolean;
    changed: boolean;
    formKey: number;
}

/**
 * Password reducer action types
 */
export type PasswordAction =
    | { type: 'SET_PENDING'; payload: PasswordFormValues | null }
    | { type: 'SET_CONFIRM_OPEN'; payload: boolean }
    | { type: 'SET_CHANGED'; payload: boolean }
    | { type: 'INCREMENT_FORM_KEY' }
    | { type: 'RESET' };

/**
 * Initial state for password reducer
 */
export const initialPasswordState: PasswordState = {
    pending: null,
    confirmOpen: false,
    changed: false,
    formKey: 0,
};

/**
 * Password state reducer
 */
function passwordReducer(state: PasswordState, action: PasswordAction): PasswordState {
    switch (action.type) {
        case 'SET_PENDING':
            return { ...state, pending: action.payload };
        case 'SET_CONFIRM_OPEN':
            return { ...state, confirmOpen: action.payload };
        case 'SET_CHANGED':
            return { ...state, changed: action.payload };
        case 'INCREMENT_FORM_KEY':
            return { ...state, formKey: state.formKey + 1 };
        case 'RESET':
            return initialPasswordState;
        default:
            return state;
    }
}

/**
 * Custom hook for managing password state with useReducer
 * 
 * @returns Password state and dispatch function
 * 
 * @example
 * ```tsx
 * const { state, dispatch } = usePasswordReducer();
 * 
 * // Set pending password change
 * dispatch({ type: 'SET_PENDING', payload: { currentPassword: '...', newPassword: '...', confirmPassword: '...' } });
 * 
 * // Open confirmation modal
 * dispatch({ type: 'SET_CONFIRM_OPEN', payload: true });
 * 
 * // Mark password as changed and reset form
 * dispatch({ type: 'SET_CHANGED', payload: true });
 * dispatch({ type: 'INCREMENT_FORM_KEY' });
 * ```
 */
export function usePasswordReducer() {
    const [state, dispatch] = useReducer(passwordReducer, initialPasswordState);

    return { state, dispatch };
}

export default usePasswordReducer;
