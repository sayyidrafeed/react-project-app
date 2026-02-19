import { motion } from 'framer-motion';
import { Target, Eye, Users, BookOpen, Shield, Award, GraduationCap, HeartHandshake } from 'lucide-react';

const AboutSection = () => {
    const missionItems = [
        "Menanamkan semangat cinta tanah air dan nilai-nilai Bela Negara",
        "Membangun karakter kepemimpinan dan integritas mahasiswa",
        "Menciptakan komunitas kampus yang saling mendukung",
        "Mengembangkan kemampuan akademik dan pribadi secara holistik"
    ];

    const visionItems = [
        "Menghasilkan lulusan berprestasi dengan karakter kuat",
        "Membangun mahasiswa baru yang bersatu dan kolaboratif",
        "Menciptakan pengalaman kampus yang transformatif"
    ];

    const highlightCards = [
        { icon: <Shield className="w-6 h-6 text-upn-green" />, title: "Pelatihan Militer" },
        { icon: <Award className="w-6 h-6 text-upn-green" />, title: "Workshop Kepemimpinan" },
        { icon: <Users className="w-6 h-6 text-upn-green" />, title: "Team Building" },
        { icon: <BookOpen className="w-6 h-6 text-upn-green" />, title: "Mentoring Akademik" },
        { icon: <GraduationCap className="w-6 h-6 text-upn-green" />, title: "Event Budaya" },
        { icon: <HeartHandshake className="w-6 h-6 text-upn-green" />, title: "Pengabdian Masyarakat" }
    ];

    return (
        <section className="relative py-24 bg-white">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <span className="text-sm font-bold tracking-widest text-upn-gold uppercase">
                    Tentang Patribera
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                    Mengenal Lebih Dekat Program Pengenalan Kehidupan Kampus
                </h2>
            </motion.div>

            {/* Main Content - Two Column Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Description & History */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">
                            Selamat Datang di Patribera 2026
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Program Pengenalan Kehidupan Kampus Mahasiswa Baru Universitas
                            Pembangunan Nasional "Veteran" Jakarta (PKKMB-U UPNVJ) adalah
                            pengalaman transformatif yang dirancang untuk membantu mahasiswa
                            baru beradaptasi dengan lingkungan kampus.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Melalui Patribera, Anda tidak hanya akan mempelajari nilai-nilai
                            Bela Negara, tetapi juga membangun jaringan pertemanan, mengembangkan
                            potensi kepemimpinan, dan mempersiapkan diri untuk perjalanan akademik
                            yang sukses di UPN Veteran Jakarta.
                        </p>
                    </motion.div>

                    {/* Right: History Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-upn-green to-green-700 rounded-3xl p-8 text-white"
                    >
                        <h3 className="text-xl font-bold mb-4">Sejarah Patribera</h3>
                        <p className="text-green-100 leading-relaxed mb-4">
                            Patribera telah menjadi tradisi tahunan UPN Veteran Jakarta
                            sejak didirikan sebagai bagian dari program PKKMB Universitas.
                        </p>
                        <p className="text-green-100 leading-relaxed">
                            Program ini terus berkembang dan beradaptasi dengan kebutuhan
                            setiap generasi mahasiswa baru, tetapi tetap mempertahankan
                            nilai-nilai inti Bela Negara yang menjadi fondasi kampus
                            UPN "Veteran" Jakarta.
                        </p>
                    </motion.div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-8 h-8 text-upn-gold" />
                            <h3 className="text-xl font-bold text-slate-900">Misi Kami</h3>
                        </div>
                        <ul className="space-y-4">
                            {missionItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-upn-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-upn-green" />
                                    </div>
                                    <span className="text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-50 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Eye className="w-8 h-8 text-upn-green" />
                            <h3 className="text-xl font-bold text-slate-900">Visi Kami</h3>
                        </div>
                        <ul className="space-y-4">
                            {visionItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-upn-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-upn-gold" />
                                    </div>
                                    <span className="text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Program Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
                        Apa yang Akan Anda Alami
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {highlightCards.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-upn-green/10 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Statistics Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-16"
                >
                    <div className="bg-gradient-to-r from-upn-green to-green-700 rounded-3xl p-8 lg:p-12">
                        <h3 className="text-2xl font-bold text-white text-center mb-10">
                            Patribera dalam Angka
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <StatCard
                                value="4,200+"
                                label="Peserta Baru"
                                suffix="per tahun"
                            />
                            <StatCard
                                value="15+"
                                label="Tahun Beroperasi"
                            />
                            <StatCard
                                value="200+"
                                label="Mentor Terlatih"
                            />
                            <StatCard
                                value="98%"
                                label="Kepuasan Peserta"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const StatCard = ({ value, label, suffix }: { value: string; label: string; suffix?: string }) => (
    <div className="text-center">
        <div className="text-4xl lg:text-5xl font-black text-white mb-2">{value}</div>
        <div className="text-green-100 text-sm lg:text-base">
            {label}
            {suffix && <span className="block text-xs opacity-75">{suffix}</span>}
        </div>
    </div>
);

export default AboutSection;
