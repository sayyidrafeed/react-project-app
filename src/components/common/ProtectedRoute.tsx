import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole, UserSubRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

const subRoleRedirects: Partial<Record<UserRole, Partial<Record<UserSubRole, string>>>> = {
    panitia: {
        k3: '/panitia/k3',
        ppm: '/panitia/ppm',
    },
    admin: {
        'project-officer': '/admin/events',
        'univ-kemahasiswaan': '/admin/kelulusan',
    },
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-upn-green"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to their default dashboard if role is unauthorized
        return <Navigate to={`/${user.role}`} replace />;
    }

    if (user) {
        const isRootPath = location.pathname === `/${user.role}`;
        const redirectPath = user.subRole ? subRoleRedirects[user.role]?.[user.subRole] : undefined;

        if (isRootPath && redirectPath) {
            return <Navigate to={redirectPath} replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
