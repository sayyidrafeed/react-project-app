import React, { useMemo, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertTriangle, PlusCircle, Search, ShieldAlert, UserRound } from 'lucide-react';
import { clsx } from 'clsx';

interface ViolationItem {
    id: string;
    date: string;
    category: 'Kedisiplinan' | 'Keamanan' | 'Atribut' | 'Etika';
    description: string;
    points: number;
}

interface ViolatingStudent {
    id: string;
    name: string;
    nim: string;
    group: string;
    faculty: string;
    totalPoints: number;
    violations: ViolationItem[];
}

const INITIAL_STUDENTS: ViolatingStudent[] = [
    {
        id: 's1',
        name: 'Ahmad Fauzi',
        nim: '2010123456',
        group: '21',
        faculty: 'S1 Informatika',
        totalPoints: 20,
        violations: [
            {
                id: 'v1',
                date: '2026-02-20',
                category: 'Atribut',
                description: 'Tidak menggunakan atribut lengkap saat apel pagi.',
                points: 10,
            },
            {
                id: 'v2',
                date: '2026-02-22',
                category: 'Kedisiplinan',
                description: 'Terlambat hadir 20 menit pada sesi pembekalan.',
                points: 10,
            },
        ],
    },
    {
        id: 's2',
        name: 'Siti Aminah',
        nim: '2010123457',
        group: '21',
        faculty: 'S1 Sistem Informasi',
        totalPoints: 5,
        violations: [
            {
                id: 'v3',
                date: '2026-02-23',
                category: 'Etika',
                description: 'Menggunakan ponsel saat sesi tanpa izin panitia.',
                points: 5,
            },
        ],
    },
    {
        id: 's3',
        name: 'Budi Santoso',
        nim: '2010123458',
        group: '22',
        faculty: 'S1 Teknik Elektro',
        totalPoints: 15,
        violations: [
            {
                id: 'v4',
                date: '2026-02-21',
                category: 'Keamanan',
                description: 'Keluar area kegiatan tanpa pelaporan ke panitia.',
                points: 15,
            },
        ],
    },
];

const K3ViolationsPage: React.FC = () => {
    const [students, setStudents] = useState<ViolatingStudent[]>(INITIAL_STUDENTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState<string>(INITIAL_STUDENTS[0]?.id ?? '');
    const [category, setCategory] = useState<ViolationItem['category']>('Kedisiplinan');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(5);

    const filteredStudents = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return students;

        return students.filter((student) =>
            student.name.toLowerCase().includes(query) || student.nim.includes(query),
        );
    }, [students, searchQuery]);

    const selectedStudent = useMemo(() => {
        return students.find((student) => student.id === selectedStudentId) ?? filteredStudents[0] ?? null;
    }, [students, selectedStudentId, filteredStudents]);

    const handleAddViolation = () => {
        if (!selectedStudent || !description.trim()) return;

        const newViolation: ViolationItem = {
            id: `v-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            category,
            description: description.trim(),
            points,
        };

        setStudents((prev) =>
            prev.map((student) => {
                if (student.id !== selectedStudent.id) return student;

                return {
                    ...student,
                    totalPoints: student.totalPoints + points,
                    violations: [newViolation, ...student.violations],
                };
            }),
        );

        setDescription('');
        setPoints(5);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Keamanan & Penjaga (K3)</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Pantau pelanggaran mahasiswa, lihat detail, dan tambahkan pelanggaran baru.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-upn-gold/10 border border-upn-gold/20 text-upn-green">
                        <ShieldAlert size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Divisi K3</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <SummaryCard title="Mahasiswa Melanggar" value={students.length} />
                    <SummaryCard title="Total Pelanggaran" value={students.reduce((acc, s) => acc + s.violations.length, 0)} />
                    <SummaryCard title="Total Poin" value={students.reduce((acc, s) => acc + s.totalPoints, 0)} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="card p-4 sm:p-5 space-y-4">
                        <h2 className="text-base font-black text-slate-800">Daftar Mahasiswa</h2>

                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                            <Search size={16} className="text-slate-400" />
                            <input
                                className="w-full bg-transparent text-sm outline-none"
                                placeholder="Cari nama / NIM..."
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        </div>

                        <div className="space-y-2 max-h-135 overflow-auto pr-1">
                            {filteredStudents.map((student) => {
                                const isActive = selectedStudent?.id === student.id;
                                return (
                                    <button
                                        key={student.id}
                                        type="button"
                                        onClick={() => setSelectedStudentId(student.id)}
                                        className={clsx(
                                            'w-full text-left rounded-xl border p-3 transition-all',
                                            isActive
                                                ? 'border-upn-green/30 bg-upn-green/5'
                                                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50',
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                                                <p className="text-[11px] text-slate-500">{student.nim}</p>
                                            </div>
                                            <span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-red-50 text-red-600">
                                                {student.totalPoints} poin
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}

                            {filteredStudents.length === 0 && (
                                <div className="text-center text-sm text-slate-400 py-6">
                                    Tidak ada mahasiswa yang sesuai pencarian.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="xl:col-span-2 space-y-6">
                        <div className="card p-4 sm:p-6">
                            {!selectedStudent ? (
                                <div className="text-sm text-slate-400 py-8 text-center">
                                    Pilih mahasiswa untuk melihat detail pelanggaran.
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                                        <div>
                                            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                <UserRound size={18} className="text-upn-green" />
                                                {selectedStudent.name}
                                            </h2>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {selectedStudent.nim} • {selectedStudent.faculty} • Kelompok {selectedStudent.group}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-600 px-3 py-1 text-xs font-black uppercase">
                                            <AlertTriangle size={14} />
                                            {selectedStudent.totalPoints} poin pelanggaran
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {selectedStudent.violations.map((violation) => (
                                            <div key={violation.id} className="rounded-xl border border-slate-100 p-3 sm:p-4 bg-slate-50/60">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm font-bold text-slate-800">{violation.category}</p>
                                                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-upn-gold/10 text-upn-green">
                                                        {violation.points} poin
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 mt-2">{violation.description}</p>
                                                <p className="text-[11px] text-slate-400 mt-2">Tanggal: {violation.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="card p-4 sm:p-6">
                            <h3 className="text-base font-black text-slate-800 mb-4">Tambah Pelanggaran</h3>

                            {!selectedStudent ? (
                                <div className="text-sm text-slate-400">Pilih mahasiswa terlebih dahulu.</div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
                                            <select
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                                                value={category}
                                                onChange={(event) => setCategory(event.target.value as ViolationItem['category'])}
                                            >
                                                <option value="Kedisiplinan">Kedisiplinan</option>
                                                <option value="Keamanan">Keamanan</option>
                                                <option value="Atribut">Atribut</option>
                                                <option value="Etika">Etika</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Poin</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={100}
                                                value={points}
                                                onChange={(event) => setPoints(Math.min(100, Math.max(1, Number(event.target.value) || 1)))}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi Pelanggaran</label>
                                        <textarea
                                            rows={3}
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            placeholder="Contoh: Tidak mengikuti instruksi keamanan saat simulasi evakuasi"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green resize-none"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleAddViolation}
                                        disabled={!description.trim()}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-upn-green text-white text-sm font-black uppercase tracking-wide disabled:opacity-50"
                                    >
                                        <PlusCircle size={16} />
                                        Tambah Pelanggaran
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const SummaryCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
    <div className="card p-4 sm:p-5 bg-white">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-black">{title}</p>
        <p className="text-2xl font-black text-slate-800 mt-2">{value}</p>
    </div>
);

export default K3ViolationsPage;
