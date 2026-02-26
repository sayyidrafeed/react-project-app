import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, PlusCircle } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

type CertificationStatus = 'Belum Upload' | 'Menunggu Verifikasi' | 'Terverifikasi';

interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    category: 'Wajib' | 'Tambahan';
    status: CertificationStatus;
    submitDate: string;
    fileName: string;
}

const INITIAL_CERTIFICATIONS: CertificationItem[] = [
    {
        id: 'cert-1',
        name: 'Sertifikat Kehadiran PKKMB-U Hari 1',
        issuer: 'Panitia PKKMB-U',
        category: 'Wajib',
        status: 'Terverifikasi',
        submitDate: '2026-02-18',
        fileName: 'sertifikat-hari1.pdf',
    },
    {
        id: 'cert-2',
        name: 'Sertifikat Webinar Bela Negara',
        issuer: 'BEM Fakultas',
        category: 'Tambahan',
        status: 'Menunggu Verifikasi',
        submitDate: '2026-02-22',
        fileName: 'webinar-bela-negara.pdf',
    },
    {
        id: 'cert-3',
        name: 'Sertifikat Leadership Dasar',
        issuer: 'Lembaga Pelatihan UPNVJ',
        category: 'Tambahan',
        status: 'Belum Upload',
        submitDate: '-',
        fileName: '-',
    },
];

const CertificationManagementPage: React.FC = () => {
    const [certifications, setCertifications] = useState<CertificationItem[]>(INITIAL_CERTIFICATIONS);
    const [name, setName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [category, setCategory] = useState<'Wajib' | 'Tambahan'>('Tambahan');
    const [fileName, setFileName] = useState('');

    const totalVerified = useMemo(
        () => certifications.filter((item) => item.status === 'Terverifikasi').length,
        [certifications],
    );

    const totalPending = useMemo(
        () => certifications.filter((item) => item.status === 'Menunggu Verifikasi').length,
        [certifications],
    );

    const totalNotUploaded = useMemo(
        () => certifications.filter((item) => item.status === 'Belum Upload').length,
        [certifications],
    );

    const handleAddCertification = () => {
        if (!name.trim() || !issuer.trim() || !fileName.trim()) return;

        const today = new Date().toISOString().split('T')[0];
        const newCertification: CertificationItem = {
            id: `cert-${Date.now()}`,
            name: name.trim(),
            issuer: issuer.trim(),
            category,
            status: 'Menunggu Verifikasi',
            submitDate: today,
            fileName: fileName.trim(),
        };

        setCertifications((prev) => [newCertification, ...prev]);
        setName('');
        setIssuer('');
        setCategory('Tambahan');
        setFileName('');
    };

    const handleMarkUploaded = (id: string) => {
        setCertifications((prev) => prev.map((item) => {
            if (item.id !== id || item.status !== 'Belum Upload') return item;

            return {
                ...item,
                status: 'Menunggu Verifikasi',
                submitDate: new Date().toISOString().split('T')[0],
                fileName: item.fileName === '-' ? 'sertifikat-upload.pdf' : item.fileName,
            };
        }));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Manajemen Sertifikasi</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Kelola sertifikat mentee, pantau status verifikasi, dan tambah sertifikat baru.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-upn-gold/10 border border-upn-gold/20 text-upn-green">
                        <Award size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Mentee</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <SummaryCard title="Terverifikasi" value={totalVerified} variant="success" />
                    <SummaryCard title="Menunggu Verifikasi" value={totalPending} variant="pending" />
                    <SummaryCard title="Belum Upload" value={totalNotUploaded} variant="default" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 card p-4 sm:p-6 space-y-4">
                        <h2 className="text-base font-black text-slate-800">Daftar Sertifikasi</h2>
                        <div className="space-y-3 max-h-150 overflow-auto pr-1">
                            {certifications.map((item) => (
                                <div key={item.id} className="rounded-xl border border-slate-100 p-4 bg-slate-50/70">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-black text-slate-800">{item.name}</p>
                                            <p className="text-xs text-slate-500 mt-1">Penerbit: {item.issuer}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${item.category === 'Wajib'
                                                ? 'bg-upn-gold/15 text-upn-green'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {item.category}
                                            </span>
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${item.status === 'Terverifikasi'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : item.status === 'Menunggu Verifikasi'
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-slate-200 text-slate-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3 text-xs text-slate-500 space-y-1">
                                        <p>Tanggal Submit: {item.submitDate}</p>
                                        <p>File: {item.fileName}</p>
                                    </div>

                                    {item.status === 'Belum Upload' && (
                                        <button
                                            type="button"
                                            onClick={() => handleMarkUploaded(item.id)}
                                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-600 hover:bg-slate-100"
                                        >
                                            <CheckCircle2 size={14} />
                                            Tandai Sudah Upload
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card p-4 sm:p-6 space-y-4">
                        <h3 className="text-base font-black text-slate-800">Tambah Sertifikat</h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Nama Sertifikat</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Contoh: Sertifikat Webinar"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Penerbit</label>
                            <input
                                type="text"
                                value={issuer}
                                onChange={(event) => setIssuer(event.target.value)}
                                placeholder="Contoh: Panitia PKKMB-U"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
                            <select
                                value={category}
                                onChange={(event) => setCategory(event.target.value as 'Wajib' | 'Tambahan')}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            >
                                <option value="Wajib">Wajib</option>
                                <option value="Tambahan">Tambahan</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Nama File</label>
                            <input
                                type="text"
                                value={fileName}
                                onChange={(event) => setFileName(event.target.value)}
                                placeholder="Contoh: sertifikat-webinar.pdf"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-upn-green"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleAddCertification}
                            disabled={!name.trim() || !issuer.trim() || !fileName.trim()}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-upn-green text-white text-sm font-black uppercase tracking-wide disabled:opacity-50"
                        >
                            <PlusCircle size={16} />
                            Simpan Sertifikat
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const SummaryCard: React.FC<{ title: string; value: number; variant: 'success' | 'pending' | 'default' }> = ({ title, value, variant }) => {
    const variantClass = variant === 'success'
        ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
        : variant === 'pending'
            ? 'text-amber-700 bg-amber-50 border-amber-100'
            : 'text-slate-700 bg-white border-slate-100';

    return (
        <div className={`card p-4 sm:p-5 border ${variantClass}`}>
            <p className="text-xs uppercase tracking-widest font-black opacity-75">{title}</p>
            <p className="text-2xl font-black mt-2">{value}</p>
        </div>
    );
};

export default CertificationManagementPage;