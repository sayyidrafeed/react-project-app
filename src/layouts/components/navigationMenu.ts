import { Award, BarChart3, Calendar, Camera, ClipboardList, Eye, FileText, Home, ShieldAlert, User, Users } from 'lucide-react';
import { AdminSubRole, PanitiaSubRole, UserRole } from '../../context/AuthContext';

export interface NavigationMenuItem {
    name: string;
    icon: typeof Home;
    path: string;
}

const baseMenuByRole: Record<UserRole, NavigationMenuItem[]> = {
    admin: [
        { name: 'Ringkasan', icon: BarChart3, path: '/admin' },
        { name: 'Manajemen User', icon: Users, path: '/admin/users' },
        { name: 'Manajemen Event', icon: Calendar, path: '/admin/events' },
        { name: 'Manajemen Kelulusan', icon: Award, path: '/admin/kelulusan' },
        { name: 'Profil', icon: User, path: '/admin/profile' },
    ],
    panitia: [
        { name: 'Ringkasan', icon: Home, path: '/panitia' },
        { name: 'Daftar Mentee', icon: Users, path: '/panitia/group' },
        { name: 'Statistik Grup', icon: BarChart3, path: '/panitia/statistik-grup' },
        { name: 'Validasi Tugas', icon: FileText, path: '/panitia/tasks' },
        { name: 'Manajemen Tugas', icon: ClipboardList, path: '/panitia/ppm' },
        { name: 'Keamanan', icon: ShieldAlert, path: '/panitia/k3' },
        { name: 'Profil', icon: User, path: '/panitia/profile' },
    ],
    mentee: [
        { name: 'Beranda', icon: Home, path: '/mentee' },
        { name: 'Jelajah', icon: Eye, path: '/mentee/discover' },
        { name: 'Presensi', icon: Camera, path: '/mentee/presence' },
        { name: 'Tugas', icon: FileText, path: '/mentee/tasks' },
        { name: 'Profil', icon: User, path: '/mentee/profile' },
    ],
};

const subRoleMenuByRole: {
    panitia: Partial<Record<PanitiaSubRole, NavigationMenuItem[]>>;
    admin: Partial<Record<AdminSubRole, NavigationMenuItem[]>>;
} = {
    panitia: {
        k3: [
            { name: 'Keamanan', icon: ShieldAlert, path: '/panitia/k3' },
            { name: 'Profil', icon: User, path: '/panitia/profile' },
        ],
        ppm: [
            { name: 'Manajemen Tugas', icon: ClipboardList, path: '/panitia/ppm' },
            { name: 'Profil', icon: User, path: '/panitia/profile' },
        ],
    },
    admin: {
        'project-officer': [
            { name: 'Manajemen Event', icon: Camera, path: '/admin/events' },
            { name: 'Profil', icon: User, path: '/admin/profile' },
        ],
        'univ-kemahasiswaan': [
            { name: 'Manajemen Kelulusan', icon: Award, path: '/admin/kelulusan' },
            { name: 'Profil', icon: User, path: '/admin/profile' },
        ],
    },
};

export const getNavigationMenu = (
    userRole: UserRole,
    userSubRole?: PanitiaSubRole | AdminSubRole,
): NavigationMenuItem[] => {
    if (userRole === 'panitia' && userSubRole) {
        const subRoleMenu = subRoleMenuByRole.panitia[userSubRole as PanitiaSubRole];
        if (subRoleMenu) {
            return subRoleMenu;
        }
    }

    if (userRole === 'admin' && userSubRole) {
        const subRoleMenu = subRoleMenuByRole.admin[userSubRole as AdminSubRole];
        if (subRoleMenu) {
            return subRoleMenu;
        }
    }

    return baseMenuByRole[userRole];
};
