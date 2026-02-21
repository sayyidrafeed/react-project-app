import { useReducer, useMemo } from 'react';

/**
 * Profile form values structure
 */
export interface MentorProfileFormValues {
    name: string;
    email: string;
    group: string;
}

/**
 * Profile state managed by the reducer
 */
export interface ProfileState {
    data: MentorProfileFormValues;
    avatarPreview: string | null;
    saved: boolean;
}

/**
 * Profile reducer action types
 */
export type ProfileAction =
    | { type: 'SET_DATA'; payload: MentorProfileFormValues }
    | { type: 'SET_AVATAR'; payload: string | null }
    | { type: 'SET_SAVED'; payload: boolean }
    | { type: 'RESET'; payload?: ProfileState };

/**
 * Initial state factory for profile reducer
 */
export function createInitialProfileState(user?: {
    name?: string;
    email?: string;
    major?: string;
    avatar?: string;
}): ProfileState {
    return {
        data: {
            name: user?.name ?? 'Kak Mentor Patribera',
            email: user?.email ?? 'mentor@upnvj.ac.id',
            group: user?.major ?? '21 - PATRIBERA',
        },
        avatarPreview: user?.avatar ?? null,
        saved: false,
    };
}

/**
 * Profile state reducer
 */
function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload };
        case 'SET_AVATAR':
            return { ...state, avatarPreview: action.payload };
        case 'SET_SAVED':
            return { ...state, saved: action.payload };
        case 'RESET':
            return action.payload ?? createInitialProfileState();
        default:
            return state;
    }
}

/**
 * Custom hook for managing profile state with useReducer
 * 
 * @param user - Optional user object for initial state
 * @returns Profile state and dispatch function
 * 
 * @example
 * ```tsx
 * const { state, dispatch } = useProfileReducer(user);
 * 
 * // Update profile data
 * dispatch({ type: 'SET_DATA', payload: { name: 'New Name', email: 'new@email.com', group: 'Group 1' } });
 * 
 * // Set avatar preview
 * dispatch({ type: 'SET_AVATAR', payload: 'data:image/...' });
 * 
 * // Mark as saved
 * dispatch({ type: 'SET_SAVED', payload: true });
 * ```
 */
export function useProfileReducer(user?: {
    name?: string;
    email?: string;
    major?: string;
    avatar?: string;
}) {
    const initialState = useMemo(() => createInitialProfileState(user), [user]);
    const [state, dispatch] = useReducer(profileReducer, initialState);

    return { state, dispatch };
}

export default useProfileReducer;
