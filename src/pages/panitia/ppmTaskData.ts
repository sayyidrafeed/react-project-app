export type TaskCategory = 'Kelompok' | 'Individu';

export interface PPMTask {
    id: string;
    title: string;
    category: TaskCategory;
    target: string;
    deadline: string;
    status: 'Draft' | 'Aktif';
    description: string;
}

export const INITIAL_TASKS: PPMTask[] = [
    {
        id: 'ppm-1',
        title: 'Video Perkenalan Kelompok',
        category: 'Kelompok',
        target: 'Seluruh Kelompok',
        deadline: '2026-03-01',
        status: 'Aktif',
        description: 'Buat video perkenalan kelompok berdurasi 3-5 menit dengan tema kebhinekaan.',
    },
    {
        id: 'ppm-2',
        title: 'Refleksi Nilai Bela Negara',
        category: 'Individu',
        target: 'Seluruh Mentee',
        deadline: '2026-02-28',
        status: 'Aktif',
        description: 'Tuliskan esai reflektif minimal 300 kata terkait nilai bela negara di lingkungan kampus.',
    },
    {
        id: 'ppm-3',
        title: 'Poster Kreatif Program Studi',
        category: 'Kelompok',
        target: 'Kelompok 21 & 22',
        deadline: '2026-03-03',
        status: 'Draft',
        description: 'Rancang poster digital untuk memperkenalkan karakteristik program studi masing-masing.',
    },
];