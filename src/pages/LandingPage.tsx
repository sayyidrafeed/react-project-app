import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import BenefitsSection from '../components/BenefitsSection';
import TestimonialSection from '../components/TestimonialSection';
import NewsSection from '../components/NewsSection';
import FAQSection from '../components/FAQSection';

const LandingPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-upn-green/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-upn-gold/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center z-10 relative">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-upn-green"></span>
                        <span className="text-sm font-semibold text-slate-800 tracking-wide uppercase">Penerimaan Mahasiswa Baru 2026</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8"
                    >
                        GERBANG <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-upn-green to-upn-gold drop-shadow-sm">
                            PATRIBERA
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                    >
                        Portal resmi navigasi PKKMB-U UPN "Veteran" Jakarta. Mulai perjalanan Bela Negara Anda dengan identitas yang kuat dan kolaborasi yang nyata.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-upn-green font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-upn-green hover:bg-green-800 hover:scale-105 shadow-xl shadow-green-900/20"
                        >
                            Masuk Portal
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <BenefitsSection />

            {/* Core Values Section */}
            <section className="relative py-24 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-sm font-bold tracking-widest text-upn-gold uppercase mb-2">Nilai-Nilai Utama</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Identitas Bela Negara</h3>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <ValueCard
                            icon={<Star className="w-8 h-8 text-upn-gold" />}
                            title="Kejuangan"
                            description="Semangat pantang menyerah dalam menghadapi tantangan akademik dan kehidupan kampus."
                        />
                        <ValueCard
                            icon={<BookOpen className="w-8 h-8 text-upn-green" />}
                            title="Inovatif"
                            description="Berpikir kreatif dan adaptif untuk menciptakan solusi bagi kemajuan bangsa."
                        />
                        <ValueCard
                            icon={<Shield className="w-8 h-8 text-sky-600" />}
                            title="Integritas"
                            description="Menjunjung tinggi kejujuran dan etika dalam setiap langkah akademik."
                        />
                        <ValueCard
                            icon={<Users className="w-8 h-8 text-rose-500" />}
                            title="Kolaborasi"
                            description="Membangun sinergi dan kerjasama tim yang solid antar mahasiswa."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Testimonial Section */}
            <TestimonialSection />

            {/* News Section */}
            <NewsSection />

            {/* FAQ Section */}
            <FAQSection />
        </div>
    );
};

interface ValueCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
    return (
        <motion.div
            variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-upn-green transition-colors">{title}</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
                {description}
            </p>
        </motion.div>
    );
};

export default LandingPage;
