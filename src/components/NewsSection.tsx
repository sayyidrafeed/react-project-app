import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    link?: string;
}

const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: "Patribera 2025 Sambut 4.582 Mahasiswa Baru",
        excerpt: "UPN Veteran Jakarta resmi membuka kegiatan PKKMB dengan tema \"Harmoni Patribera dalam Cakrawala Ilmu dan Bela Negara\" di Tennis Indoor Senayan, Jakarta.",
        date: "AGU, 11 2025",
        image: "/images/news-patribera-opening.webp"
    },
    {
        id: 2,
        title: "Pembekalan Tokoh Inspiratif di Patribera",
        excerpt: "Mahasiswa baru mendapat pembekalan dari Kang Dedi Mulyadi dan Prof. Dr. Asep Nana Mulyana tentang nilai-nilai bela negara dan karakter kepemimpinan.",
        date: "AGU, 12 2025",
        image: "/images/news-pembekalan.jpg"
    },
    {
        id: 3,
        title: "PKKMB Fakultas Berlangsung Meriah",
        excerpt: "Fakultas Hukum dan Ilmu Komputer menyelenggarakan PKKMB dengan berbagai kegiatan pembentukan karakter dan adaptasi kehidupan kampus.",
        date: "AGU, 13 2025",
        image: "/images/news-pkkmb-fakultas.jpg"
    }
];

const NewsSection = () => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const toggleCard = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <section className="relative py-24 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            BERITA TERKINI{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-upn-green to-upn-gold">
                                PATRIBERA
                            </span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center"
                    >
                        <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
                            Ikuti kampanye terbaru, sorotan acara, dan wawasan di balik layar tentang kegiatan Patribera kami.
                        </p>
                    </motion.div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Large Featured Card - Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:row-span-2"
                    >
                        <NewsCard
                            article={newsArticles[0]}
                            isLarge
                            isExpanded={expandedCard === newsArticles[0].id}
                            onToggle={() => toggleCard(newsArticles[0].id)}
                        />
                    </motion.div>

                    {/* Small Cards - Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <NewsCard article={newsArticles[1]} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <NewsCard article={newsArticles[2]} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

interface NewsCardProps {
    article: NewsArticle;
    isLarge?: boolean;
    isExpanded?: boolean;
    onToggle?: () => void;
}

const NewsCard = ({ article, isLarge = false, isExpanded = false, onToggle }: NewsCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const showOverlay = isLarge && (isHovered || isExpanded);

    return (
        <div
            className="group relative h-full bg-slate-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={isLarge ? onToggle : undefined}
        >
            {/* Image */}
            <div className={`relative overflow-hidden ${isLarge ? 'h-[500px]' : 'h-[280px]'}`}>
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                {/* Date Badge */}
                <div className="inline-block mb-3">
                    <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                        {article.date}
                    </span>
                </div>

                {/* Title */}
                <h3 className={`font-black text-white mb-3 ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {article.title}
                </h3>

                {/* Excerpt - Only shown on large card when hovered/expanded */}
                {isLarge && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: showOverlay ? 1 : 0,
                            height: showOverlay ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-slate-300 text-base leading-relaxed mb-4">
                            {article.excerpt}
                        </p>
                    </motion.div>
                )}

                {/* Learn More Button */}
                <button className="inline-flex items-center gap-2 text-sm font-bold text-white border-2 border-white/30 hover:border-upn-green hover:bg-upn-green px-6 py-3 rounded-full transition-all duration-300 group/btn">
                    Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default NewsSection;
