import React, { useMemo } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { MOCK_USERS } from '../../../data/mockData';
import { useUsersReducer } from './useUsersReducer';
import { UsersHeader } from './UsersHeader';
import { UsersSearchFilter } from './UsersSearchFilter';
import { UsersBulkActions } from './UsersBulkActions';
import { UsersTable } from './UsersTable';
import { UserModal } from './UserModal';

const UsersPage: React.FC = () => {
    const { state, actions } = useUsersReducer();

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                (user.nim && user.nim.includes(state.searchQuery));
            if (!matchesSearch) return false;

            switch (state.filter) {
                case 'admin':
                    return user.role === 'admin';
                case 'panitia':
                    return user.role === 'panitia';
                case 'mentee':
                    return user.role === 'mentee';
                case 'active':
                    return user.status === 'Active';
                case 'inactive':
                    return user.status === 'Inactive';
                default:
                    return true;
            }
        });
    }, [state.searchQuery, state.filter]);

    const filteredUserIds = useMemo(() => filteredUsers.map(u => u.id), [filteredUsers]);

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                <UsersHeader />
                <UsersSearchFilter
                    searchQuery={state.searchQuery}
                    filter={state.filter}
                    onSearchChange={actions.setSearchQuery}
                    onFilterChange={actions.setFilter}
                    users={MOCK_USERS}
                />
                <UsersBulkActions selectedCount={state.selectedUsers.size} />
                <UsersTable
                    users={MOCK_USERS}
                    filteredUsers={filteredUsers}
                    selectedUsers={state.selectedUsers}
                    onSelectAll={() => actions.handleSelectAll(filteredUserIds)}
                    onUserSelect={actions.toggleUser}
                    onEdit={actions.openModal}
                />
                <UserModal
                    isOpen={state.modal.isOpen}
                    user={state.modal.user}
                    onClose={actions.closeModal}
                />
            </div>
        </DashboardLayout>
    );
};

export default UsersPage;
