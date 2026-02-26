import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

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
        const isPanitiaRoot = location.pathname === '/panitia';
        const isAdminRoot = location.pathname === '/admin';

        if (isPanitiaRoot && user.role === 'panitia') {
            if (user.subRole === 'k3') {
                return <Navigate to="/panitia/k3" replace />;
            }

            if (user.subRole === 'ppm') {
                return <Navigate to="/panitia/ppm" replace />;
            }
        }

        if (isAdminRoot && user.role === 'admin') {
            if (user.subRole === 'project-officer') {
                return <Navigate to="/admin/events" replace />;
            }

            if (user.subRole === 'univ-kemahasiswaan') {
                return <Navigate to="/admin/kelulusan" replace />;
            }
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
