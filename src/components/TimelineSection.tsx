import { motion } from 'framer-motion';

interface TimelineItem {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    align: 'left' | 'right';
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        title: "Daftar Ulang Mahasiswa Baru",
        category: "Administrasi",
        description: "Langkah awal konfirmasi sebagai mahasiswa resmi UPN Veteran Jakarta.",
        date: "15-20 Juli 2026",
        align: 'left'
    },
    {
        id: 2,
        title: "Masuk Grup Camaba",
        category: "Networking",
        description: "Bergabung dengan komunitas mahasiswa baru untuk update informasi resmi.",
        date: "21 Juli 2026",
        align: 'right'
    },
    {
        id: 3,
        title: "Masuk Grup Kelompok Patribera",
        category: "Persiapan",
        description: "Pembagian kelompok kecil untuk koordinasi tugas dan pendampingan mentor.",
        date: "1 Agustus 2026",
        align: 'left'
    },
    {
        id: 4,
        title: "Mentoring 1",
        category: "Mentoring",
        description: "Sesi pengenalan awal nilai-nilai bela negara dan budaya kampus.",
        date: "5 Agustus 2026",
        align: 'right'
    },
    {
        id: 5,
        title: "Mentoring 2",
        category: "Mentoring",
        description: "Pendalaman materi dan pengecekan kelengkapan atribut Patribera.",
        date: "8 Agustus 2026",
        align: 'left'
    },
    {
        id: 6,
        title: "Pengumpulan Tugas Patribera",
        category: "Akademik",
        description: "Implementasi nilai bela negara melalui penugasan kreatif individu & kelompok.",
        date: "10 Agustus 2026",
        align: 'right'
    },
    {
        id: 7,
        title: "Kedatangan Mahasiswa Baru (SEMA 2)",
        category: "Event",
        description: "Penyambutan resmi tahap kedua di kampus UPN Veteran Jakarta.",
        date: "12 Agustus 2026",
        align: 'left'
    },
    {
        id: 8,
        title: "Patribera - Tennis Indoor Senayan",
        category: "Puncak Acara",
        description: "Sidang Terbuka Senat Penerimaan Mahasiswa Baru dan orasi kebangsaan.",
        date: "14 Agustus 2026",
        align: 'right'
    },
    {
        id: 9,
        title: "UKM Expo & Penutupan",
        category: "Penutupan",
        description: "Eksplorasi minat bakat melalui pameran UKM dan inagurasi penutupan.",
        date: "16 Agustus 2026",
        align: 'left'
    }
];

const TimelineSection = () => {
    return (
        <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                        Alur Perjalanan{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-upn-green to-upn-gold">
                            Patribera
                        </span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Tahapan yang akan dilalui mahasiswa baru 2026
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line - Modified to stop at last dot */}
                    <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2 md:translate-x-0 z-0"
                        style={{ height: `calc(100% - 3rem)` }} />

                    <div className="space-y-12 relative z-10">
                        {timelineData.map((item, index) => (
                            <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Card */}
                                <div className="w-full md:w-5/12 pl-12 md:pl-0 md:px-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 relative group"
                                    >
                                        {/* Date Label (Desktop) */}
                                        <div className={`hidden md:block absolute top-6 text-sm font-bold text-slate-400 ${item.align === 'left' ? '-right-32 text-left w-24' : '-left-32 text-right w-24'}`}>
                                            {item.date}
                                        </div>

                                        <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600 mb-3 group-hover:bg-upn-green/10 group-hover:text-upn-green transition-colors">
                                            {item.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Mobile Date Label */}
                                        <div className="md:hidden mt-3 text-xs font-bold text-slate-400">
                                            {item.date}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border-4 border-slate-200 z-10 shadow-sm">
                                    <div className={`w-2.5 h-2.5 rounded-full ${index === timelineData.length - 1 ? 'bg-upn-gold scale-125' : 'bg-upn-green'}`} />
                                </div>

                                {/* Empty Space for opposite side */}
                                <div className="w-full md:w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
