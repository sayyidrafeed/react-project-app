import { useReducer, useCallback } from 'react';
import type { UsersState, UsersAction, FilterType } from './types';
import type { UserAccount } from '../../../data/mockData';

const initialState: UsersState = {
    searchQuery: '',
    filter: 'all',
    selectedUsers: new Set<string>(),
    modal: {
        isOpen: false,
        user: null,
    },
};

function usersReducer(state: UsersState, action: UsersAction): UsersState {
    switch (action.type) {
        case 'SET_SEARCH':
            return { ...state, searchQuery: action.payload };

        case 'SET_FILTER':
            return { ...state, filter: action.payload };

        case 'TOGGLE_USER': {
            const newSelected = new Set(state.selectedUsers);
            if (newSelected.has(action.payload)) {
                newSelected.delete(action.payload);
            } else {
                newSelected.add(action.payload);
            }
            return { ...state, selectedUsers: newSelected };
        }

        case 'SELECT_ALL':
            return { ...state, selectedUsers: new Set(action.payload) };

        case 'CLEAR_SELECTION':
            return { ...state, selectedUsers: new Set() };

        case 'OPEN_MODAL':
            return {
                ...state,
                modal: { isOpen: true, user: action.payload },
            };

        case 'CLOSE_MODAL':
            return {
                ...state,
                modal: { isOpen: false, user: null },
            };

        default:
            return state;
    }
}

export function useUsersReducer() {
    const [state, dispatch] = useReducer(usersReducer, initialState);

    const setSearchQuery = useCallback((query: string) => {
        dispatch({ type: 'SET_SEARCH', payload: query });
    }, []);

    const setFilter = useCallback((filter: FilterType) => {
        dispatch({ type: 'SET_FILTER', payload: filter });
    }, []);

    const toggleUser = useCallback((id: string) => {
        dispatch({ type: 'TOGGLE_USER', payload: id });
    }, []);

    const selectAll = useCallback((userIds: string[]) => {
        dispatch({ type: 'SELECT_ALL', payload: userIds });
    }, []);

    const clearSelection = useCallback(() => {
        dispatch({ type: 'CLEAR_SELECTION' });
    }, []);

    const openModal = useCallback((user: UserAccount) => {
        dispatch({ type: 'OPEN_MODAL', payload: user });
    }, []);

    const closeModal = useCallback(() => {
        dispatch({ type: 'CLOSE_MODAL' });
    }, []);

    const handleSelectAll = useCallback(
        (filteredUserIds: string[]) => {
            const allFilteredSelected = filteredUserIds.length > 0 &&
                filteredUserIds.every(id => state.selectedUsers.has(id));
            if (allFilteredSelected) {
                clearSelection();
            } else {
                selectAll(filteredUserIds);
            }
        },
        [state.selectedUsers, clearSelection, selectAll]
    );

    return {
        state,
        actions: {
            setSearchQuery,
            setFilter,
            toggleUser,
            selectAll,
            clearSelection,
            openModal,
            closeModal,
            handleSelectAll,
        },
    };
}
