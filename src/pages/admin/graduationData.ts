export type GraduationDecision = 'Belum Diputuskan' | 'Lulus' | 'Tidak Lulus';

export interface GraduationStudent {
    id: string;
    menteeName: string;
    nim: string;
    group: string;
    totalTasks: number;
    completedTasks: number;
    decision: GraduationDecision;
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
    },
    {
        id: 'grad-2',
        menteeName: 'Siti Aminah',
        nim: '2010123457',
        group: 'Kelompok 21',
        totalTasks: 10,
        completedTasks: 8,
        decision: 'Belum Diputuskan',
    },
    {
        id: 'grad-3',
        menteeName: 'Budi Santoso',
        nim: '2010123458',
        group: 'Kelompok 22',
        totalTasks: 10,
        completedTasks: 5,
        decision: 'Belum Diputuskan',
    },
    {
        id: 'grad-4',
        menteeName: 'Dewi Lestari',
        nim: '2010123459',
        group: 'Kelompok 22',
        totalTasks: 10,
        completedTasks: 10,
        decision: 'Belum Diputuskan',
    },
    {
        id: 'grad-5',
        menteeName: 'Eko Prasetyo',
        nim: '2010123460',
        group: 'Kelompok 23',
        totalTasks: 10,
        completedTasks: 7,
        decision: 'Belum Diputuskan',
    },
    {
        id: 'grad-6',
        menteeName: 'Fitri Handayani',
        nim: '2010123461',
        group: 'Kelompok 23',
        totalTasks: 10,
        completedTasks: 9,
        decision: 'Belum Diputuskan',
    },
];