import { motion } from 'framer-motion';

const BenefitsSection = () => {
    return (
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                            Temukan Manfaat dari{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-upn-green to-upn-gold">
                                Patribera 2026
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            Selamat datang di Program Pengenalan Kehidupan Kampus Mahasiswa Baru UPN "Veteran" Jakarta,
                            tempat kesehatan dan kesejahteraan Anda menjadi prioritas utama kami. Kami menawarkan pengalaman
                            orientasi yang dipersonalisasi untuk membantu Anda mencapai adaptasi optimal, membangun relasi yang
                            kuat, dan meningkatkan kualitas kehidupan kampus Anda.
                        </p>
                    </motion.div>

                    {/* Right Column - Image with Decorative Dots */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2 relative"
                    >
                        {/* Decorative Dot Pattern - Top Right */}
                        <div className="absolute -top-4 -right-4 grid grid-cols-6 gap-2 opacity-40 z-0">
                            {[...Array(24)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-upn-green"
                                    style={{
                                        animationDelay: `${i * 0.05}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl group">
                            <img
                                src="/images/patribera-benefits.jpg"
                                alt="Mahasiswa Patribera 2026 dalam kegiatan orientasi"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-upn-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Decorative Dot Pattern - Bottom Left of Image */}
                        <div className="absolute -bottom-4 -left-4 grid grid-cols-6 gap-2 opacity-40 z-0">
                            {[...Array(24)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-upn-gold"
                                    style={{
                                        animationDelay: `${i * 0.05}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
