export type GraduationDecision = 'Belum Diputuskan' | 'Lulus' | 'Tidak Lulus';

export interface K3ViolationReport {
    id: string;
    date: string;
    category: 'Kedisiplinan' | 'Keamanan' | 'Atribut' | 'Etika';
    points: number;
    description: string;
}

export interface GraduationStudent {
    id: string;
    menteeName: string;
    nim: string;
    group: string;
    totalTasks: number;
    completedTasks: number;
    decision: GraduationDecision;
    k3Violations: K3ViolationReport[];
}

export const INITIAL_GRADUATIONS: GraduationStudent[] = [
    {
        id: 'grad-1',
        menteeName: 'Ahmad Fauzi',
        nim: '2010123456',
        group: 'Kelompok 21',
        totalTasks: 10,
        completedTasks: 10,
        decision: 'Belum Diputuskan',
        k3Violations: [],
    },
    {
        id: 'grad-2',
        menteeName: 'Siti Aminah',
        nim: '2010123457',
        group: 'Kelompok 21',
        totalTasks: 10,
        completedTasks: 8,
        decision: 'Belum Diputuskan',
        k3Violations: [
            {
                id: 'k3-1',
                date: '2026-02-20',
                category: 'Atribut',
                points: 10,
                description: 'Tidak menggunakan atribut lengkap saat apel pagi.',
            },
        ],
    },
    {
        id: 'grad-3',
        menteeName: 'Budi Santoso',
        nim: '2010123458',
        group: 'Kelompok 22',
        totalTasks: 10,
        completedTasks: 5,
        decision: 'Belum Diputuskan',
        k3Violations: [
            {
                id: 'k3-2',
                date: '2026-02-19',
                category: 'Kedisiplinan',
                points: 15,
                description: 'Terlambat lebih dari 30 menit pada sesi pembekalan.',
            },
            {
                id: 'k3-3',
                date: '2026-02-22',
                category: 'Keamanan',
                points: 15,
                description: 'Keluar area kegiatan tanpa pelaporan ke panitia.',
            },
        ],
    },
    {
        id: 'grad-4',
        menteeName: 'Dewi Lestari',
        nim: '2010123459',
        group: 'Kelompok 22',
        totalTasks: 10,
        completedTasks: 10,
        decision: 'Belum Diputuskan',
        k3Violations: [],
    },
    {
        id: 'grad-5',
        menteeName: 'Eko Prasetyo',
        nim: '2010123460',
        group: 'Kelompok 23',
        totalTasks: 10,
        completedTasks: 7,
        decision: 'Belum Diputuskan',
        k3Violations: [
            {
                id: 'k3-4',
                date: '2026-02-23',
                category: 'Etika',
                points: 5,
                description: 'Menggunakan ponsel saat sesi tanpa izin panitia.',
            },
        ],
    },
    {
        id: 'grad-6',
        menteeName: 'Fitri Handayani',
        nim: '2010123461',
        group: 'Kelompok 23',
        totalTasks: 10,
        completedTasks: 9,
        decision: 'Belum Diputuskan',
        k3Violations: [],
    },
];