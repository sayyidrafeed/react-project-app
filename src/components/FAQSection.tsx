import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "Apa itu Patribera?",
        answer: "Patribera (Patriot Bela Negara) adalah program PKKMB (Pengenalan Kehidupan Kampus bagi Mahasiswa Baru) UPN Veteran Jakarta yang bertujuan memperkenalkan kehidupan kampus dan menanamkan nilai-nilai bela negara kepada mahasiswa baru. Program ini membentuk karakter mahasiswa yang unggul secara akademis dan memiliki semangat bela negara yang kuat."
    },
    {
        id: 2,
        question: "Kapan Patribera 2026 dilaksanakan?",
        answer: "Patribera 2026 dijadwalkan berlangsung pada bulan Agustus 2026. Informasi detail mengenai tanggal pasti dan jadwal lengkap akan diumumkan melalui portal resmi mahasiswa baru dan website UPN Veteran Jakarta."
    },
    {
        id: 3,
        question: "Di mana lokasi kegiatan Patribera?",
        answer: "Kegiatan utama Patribera biasanya dilaksanakan di Tennis Indoor Senayan, Jakarta. Beberapa kegiatan fakultas khusus mungkin dilaksanakan di lokasi berbeda seperti Padepokan Pencak Silat TMII atau lokasi lain yang disesuaikan dengan kebutuhan program."
    },
    {
        id: 4,
        question: "Apakah Patribera wajib diikuti oleh semua mahasiswa baru?",
        answer: "Ya, Patribera merupakan kegiatan wajib bagi seluruh mahasiswa baru UPN Veteran Jakarta sebagai bagian integral dari proses orientasi kampus. Kehadiran dan partisipasi aktif dalam kegiatan ini sangat penting untuk membangun fondasi yang kuat di lingkungan akademik."
    },
    {
        id: 5,
        question: "Apa saja kegiatan yang ada di Patribera?",
        answer: "Kegiatan Patribera meliputi pembekalan dari tokoh-tokoh inspiratif seperti akademisi dan pejabat publik, pengenalan nilai budaya dan bela negara, parade Unit Kegiatan Mahasiswa (UKM), penampilan seni budaya, talk show tentang industri kreatif dan teknologi, serta berbagai kegiatan pembentukan karakter dan team building."
    },
    {
        id: 6,
        question: "Apa yang harus saya persiapkan untuk mengikuti Patribera?",
        answer: "Mahasiswa perlu mempersiapkan pakaian sesuai ketentuan (kemeja putih dan celana/rok hitam), perlengkapan pribadi seperti alat tulis dan buku catatan, kesiapan fisik untuk mengikuti rangkaian kegiatan selama 2 hari, serta mental yang terbuka untuk belajar dan berkolaborasi dengan teman-teman baru."
    }
];

const FAQSection = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="relative py-24 lg:py-32 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Beberapa pertanyaan yang sering diajukan
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <FAQItem
                                faq={faq}
                                isExpanded={expandedId === faq.id}
                                onToggle={() => toggleFAQ(faq.id)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface FAQItemProps {
    faq: FAQItem;
    isExpanded: boolean;
    onToggle: () => void;
}

const FAQItem = ({ faq, isExpanded, onToggle }: FAQItemProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100">
            {/* Question Button */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none group"
            >
                <h3 className="text-lg lg:text-xl font-bold text-slate-900 pr-4 group-hover:text-upn-green transition-colors">
                    {faq.question}
                </h3>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-upn-green flex items-center justify-center text-white transition-colors">
                    <motion.div
                        initial={false}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </motion.div>
                </div>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                            <p className="text-slate-600 leading-relaxed text-base">
                                {faq.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQSection;
