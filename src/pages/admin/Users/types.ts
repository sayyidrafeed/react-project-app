import type { UserAccount } from '../../../data/mockData';

export type { UserAccount };

export type FilterType = 'all' | 'admin' | 'panitia' | 'mentee' | 'active' | 'inactive';

export interface UsersState {
    searchQuery: string;
    filter: FilterType;
    selectedUsers: Set<string>;
    modal: {
        isOpen: boolean;
        user: UserAccount | null;
    };
}

export type UsersAction =
    | { type: 'SET_SEARCH'; payload: string }
    | { type: 'SET_FILTER'; payload: FilterType }
    | { type: 'TOGGLE_USER'; payload: string }
    | { type: 'SELECT_ALL'; payload: string[] }
    | { type: 'CLEAR_SELECTION' }
    | { type: 'OPEN_MODAL'; payload: UserAccount }
    | { type: 'CLOSE_MODAL' };

export interface FilterButtonProps {
    active: boolean;
    onClick: () => void;
    count: number;
    label: string;
    color?: 'blue' | 'gold' | 'green';
}

export interface UserCardProps {
    user: UserAccount;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
}

export interface InfoCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
}

export interface UserModalProps {
    isOpen: boolean;
    user: UserAccount | null;
    onClose: () => void;
}
