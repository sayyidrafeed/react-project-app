// Task interface with grade field (0-100)
export interface Task {
    id: string;
    title: string;
    description: string;
    deadline: string;
    type: 'individual' | 'group';
    grade: number | null; // 0-100 integer, null if not graded
    submittedAt?: string;
    gradedAt?: string;
    gradedBy?: string;
    menteeId?: string;
    createdAt: string;
}

// Event interface
export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    status: 'scheduled' | 'ongoing' | 'completed';
    attendees: number;
    createdAt: string;
}

// User Account interface
export interface UserAccount {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'mentor' | 'mentee';
    status: 'Active' | 'Inactive';
    createdAt: string;
    lastLogin?: string;
    nim?: string;
    major?: string;
    faculty?: string;
}

// Mentee interface for mentor view
export interface Mentee {
    id: string;
    name: string;
    nim: string;
    major: string;
    averageGrade: number;
    tasksCompleted: number;
    tasksPending: number;
    attendanceRate: number;
}

// Mock Tasks with new structure
export const MOCK_TASKS: Task[] = [
    {
        id: 't1',
        title: 'Resume PKKMB Day 1',
        description: 'Upload resume kegiatan hari pertama dalam format PDF.',
        deadline: '2026-08-15',
        type: 'individual',
        grade: null,
        createdAt: '2026-08-10T00:00:00Z'
    },
    {
        id: 't2',
        title: 'Yel-yel Kelompok',
        description: 'Video yel-yel kelompok durasi minimal 1 menit.',
        deadline: '2026-08-17',
        type: 'group',
        grade: null,
        createdAt: '2026-08-10T00:00:00Z'
    },
    {
        id: 't3',
        title: 'Esai Bela Negara',
        description: 'Tulis esai 500 kata tentang konsep Bela Negara.',
        deadline: '2026-08-20',
        type: 'individual',
        grade: null,
        createdAt: '2026-08-10T00:00:00Z'
    },
    {
        id: 't4',
        title: 'Foto Kegiatan Kelompok',
        description: 'Upload dokumentasi foto kegiatan kelompok.',
        deadline: '2026-08-22',
        type: 'group',
        grade: null,
        createdAt: '2026-08-10T00:00:00Z'
    },
    {
        id: 't5',
        title: 'Presentasi Mini',
        description: 'Presentasi singkat tentang materi yang diberikan.',
        deadline: '2026-08-25',
        type: 'individual',
        grade: null,
        createdAt: '2026-08-10T00:00:00Z'
    },
    {
        id: 't6',
        title: 'Laporan Harian',
        description: 'Kumpulkan laporan harian PKKMB dalam bentuk PDF.',
        deadline: '2026-08-28',
        type: 'individual',
        grade: null,
        createdAt: '2026-08-10T00:00:00Z'
    }
];

// Mock Events with comprehensive data
export const MOCK_EVENTS: Event[] = [
    {
        id: 'e1',
        title: 'Pembukaan PKKMB-U',
        date: '2026-08-14',
        time: '07:30 - 12:00',
        location: 'Auditorium G.W.J',
        description: 'Upacara pembukaan PKKMB Universitas dengan sambutan rektor dan pengenalan program.',
        status: 'scheduled',
        attendees: 4201,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e2',
        title: 'Talkshow Bela Negara',
        date: '2026-08-14',
        time: '13:00 - 15:30',
        location: 'Selasar Fak. Kedokteran',
        description: 'Sesi talkshow dengan pembicara ahli tentang konsep Bela Negara.',
        status: 'scheduled',
        attendees: 4201,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e3',
        title: 'Olahraga Bersama',
        date: '2026-08-15',
        time: '06:30 - 08:00',
        location: 'Lapangan Olahraga',
        description: 'Senam pagi bersama dan kegiatan olahraga untuk membangun kekompakan.',
        status: 'scheduled',
        attendees: 4201,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e4',
        title: 'Kunjungan Museum',
        date: '2026-08-16',
        time: '09:00 - 12:00',
        location: 'Museum Satriamandala',
        description: 'Kunjungan edukatif ke museum sejarah militer.',
        status: 'scheduled',
        attendees: 4201,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e5',
        title: 'Penutupan PKKMB-U',
        date: '2026-08-28',
        time: '08:00 - 16:00',
        location: 'Auditorium G.W.J',
        description: 'Upacara penutupan PKKMB dengan penyerahan sertifikat.',
        status: 'scheduled',
        attendees: 4201,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e6',
        title: 'Workshop Kepemimpinan',
        date: '2026-08-18',
        time: '14:00 - 17:00',
        location: 'Ruang Seminar A',
        description: 'Workshop interaktif tentang pengembangan kepemimpinan.',
        status: 'scheduled',
        attendees: 2100,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e7',
        title: 'Malam Keakraban',
        date: '2026-08-19',
        time: '19:00 - 22:00',
        location: 'Aula Utama',
        description: 'Acara malam keakraban untuk mempererat hubungan antar mahasiswa baru.',
        status: 'scheduled',
        attendees: 4201,
        createdAt: '2026-08-01T00:00:00Z'
    },
    {
        id: 'e8',
        title: 'Seminar Teknologi',
        date: '2026-08-20',
        time: '09:00 - 11:30',
        location: 'Ruang Seminar B',
        description: 'Seminar tentang perkembangan teknologi dan inovasi.',
        status: 'scheduled',
        attendees: 3150,
        createdAt: '2026-08-01T00:00:00Z'
    }
];

// Mock User Accounts for Admin Management
export const MOCK_USERS: UserAccount[] = [
    {
        id: 'u1',
        name: 'Admin Utama',
        email: 'admin@upnvj.ac.id',
        password: 'pass_admin123',
        role: 'admin',
        status: 'Active',
        createdAt: '2026-07-01T00:00:00Z',
        lastLogin: '2026-08-10T08:00:00Z'
    },
    {
        id: 'u2',
        name: 'Kak Mentor Budi',
        email: 'mentor1@upnvj.ac.id',
        password: 'pass_mentor456',
        role: 'mentor',
        status: 'Active',
        createdAt: '2026-07-15T00:00:00Z',
        lastLogin: '2026-08-10T07:30:00Z'
    },
    {
        id: 'u3',
        name: 'Kak Mentor Siti',
        email: 'mentor2@upnvj.ac.id',
        password: 'pass_mentor789',
        role: 'mentor',
        status: 'Active',
        createdAt: '2026-07-15T00:00:00Z',
        lastLogin: '2026-08-09T16:45:00Z'
    },
    {
        id: 'u4',
        name: 'Ahmad Fauzi',
        email: 'mentee1@upnvj.ac.id',
        password: 'pass_mentee001',
        role: 'mentee',
        status: 'Active',
        createdAt: '2026-08-01T00:00:00Z',
        lastLogin: '2026-08-10T09:15:00Z',
        nim: '2010123456',
        major: 'S1 Informatika',
        faculty: 'Teknik'
    },
    {
        id: 'u5',
        name: 'Siti Aminah',
        email: 'mentee2@upnvj.ac.id',
        password: 'pass_mentee002',
        role: 'mentee',
        status: 'Active',
        createdAt: '2026-08-01T00:00:00Z',
        lastLogin: '2026-08-10T08:30:00Z',
        nim: '2010123457',
        major: 'S1 Sistem Informasi',
        faculty: 'Teknik'
    },
    {
        id: 'u6',
        name: 'Budi Santoso',
        email: 'mentee3@upnvj.ac.id',
        password: 'pass_mentee003',
        role: 'mentee',
        status: 'Active',
        createdAt: '2026-08-01T00:00:00Z',
        lastLogin: '2026-08-09T14:20:00Z',
        nim: '2010123458',
        major: 'S1 Teknik Elektro',
        faculty: 'Teknik'
    },
    {
        id: 'u7',
        name: 'Dewi Lestari',
        email: 'mentee4@upnvj.ac.id',
        password: 'pass_mentee004',
        role: 'mentee',
        status: 'Active',
        createdAt: '2026-08-01T00:00:00Z',
        lastLogin: '2026-08-10T10:00:00Z',
        nim: '2010123459',
        major: 'S1 Informatika',
        faculty: 'Teknik'
    },
    {
        id: 'u8',
        name: 'Admin Cadangan',
        email: 'admin2@upnvj.ac.id',
        password: 'pass_admin456',
        role: 'admin',
        status: 'Inactive',
        createdAt: '2026-07-10T00:00:00Z',
        lastLogin: '2026-08-05T12:00:00Z'
    }
];

// Mock Mentees for Mentor View
export const MOCK_MENTEES: Mentee[] = [
    {
        id: 'm1',
        name: 'Ahmad Fauzi',
        nim: '2010123456',
        major: 'S1 Informatika',
        averageGrade: 85,
        tasksCompleted: 4,
        tasksPending: 2,
        attendanceRate: 92
    },
    {
        id: 'm2',
        name: 'Siti Aminah',
        nim: '2010123457',
        major: 'S1 Sistem Informasi',
        averageGrade: 78,
        tasksCompleted: 3,
        tasksPending: 3,
        attendanceRate: 88
    },
    {
        id: 'm3',
        name: 'Budi Santoso',
        nim: '2010123458',
        major: 'S1 Teknik Elektro',
        averageGrade: 90,
        tasksCompleted: 5,
        tasksPending: 1,
        attendanceRate: 95
    },
    {
        id: 'm4',
        name: 'Dewi Lestari',
        nim: '2010123459',
        major: 'S1 Informatika',
        averageGrade: 82,
        tasksCompleted: 4,
        tasksPending: 2,
        attendanceRate: 90
    },
    {
        id: 'm5',
        name: 'Eko Prasetyo',
        nim: '2010123460',
        major: 'S1 Sistem Informasi',
        averageGrade: 75,
        tasksCompleted: 3,
        tasksPending: 3,
        attendanceRate: 85
    },
    {
        id: 'm6',
        name: 'Fitri Handayani',
        nim: '2010123461',
        major: 'S1 Teknik Elektro',
        averageGrade: 88,
        tasksCompleted: 5,
        tasksPending: 1,
        attendanceRate: 93
    }
];

// Helper function to initialize mock data in localStorage
export const initializeMockData = () => {
    // Initialize users if not exists
    if (!localStorage.getItem('siera_users')) {
        localStorage.setItem('siera_users', JSON.stringify(MOCK_USERS));
    }

    // Initialize tasks if not exists
    if (!localStorage.getItem('siera_tasks')) {
        localStorage.setItem('siera_tasks', JSON.stringify(MOCK_TASKS));
    }

    // Initialize events if not exists
    if (!localStorage.getItem('siera_events')) {
        localStorage.setItem('siera_events', JSON.stringify(MOCK_EVENTS));
    }
};
