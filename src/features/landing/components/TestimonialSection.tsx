import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Patribera mengajarkan saya arti sebenarnya dari Bela Negara. Bukan hanya soal teori, tapi bagaimana menerapkan nilai-nilai kejuangan dalam kehidupan sehari-hari. Pengalaman yang tak terlupakan!",
        name: "Rizki Andrianto",
        role: "Mahasiswa Teknik Informatika Angkatan 2025",
        image: "/images/student-1.png"
    },
    {
        id: 2,
        quote: "Melalui PKKMB di UPN Veteran Jakarta, saya tidak hanya mendapat teman baru, tetapi juga keluarga besar yang selalu mendukung. Kegiatan Patribera membentuk karakter kepemimpinan saya.",
        name: "Siti Rahma Aulia",
        role: "Mahasiswa Hubungan Internasional Angkatan 2025",
        image: "/images/student-2.png"
    },
    {
        id: 3,
        quote: "Patribera 2025 memberikan fondasi yang kuat untuk adaptasi di lingkungan kampus. Mentoring yang intensif dan kegiatan kolaboratif benar-benar mempersiapkan kami menghadapi tantangan akademik.",
        name: "Daffa Putra Mahendra",
        role: "Mahasiswa Manajemen Angkatan 2025",
        image: "/images/student-3.png"
    }
];

const TestimonialSection = () => {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate testimonials for seamless loop (render 3x for better visual coverage)
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold tracking-widest text-upn-gold uppercase mb-2">
                        Testimoni Alumni
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Apa Kata Mereka Tentang Patribera
                    </h3>
                </motion.div>

                {/* Infinite Scroll Container */}
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Track */}
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: [0, -(testimonials.length * 400)] // Move by one full set width
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 30,
                                ease: 'linear'
                            }
                        }}
                        style={{ width: 'max-content' }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.id}-${index}`}
                                testimonial={testimonial}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Pause Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <p className="text-sm text-slate-500">
                        {isPaused ? "⏸️ Animasi dipause" : "▶️ Auto-scrolling"}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
        <div className="flex-shrink-0 w-80 lg:w-96 bg-white rounded-3xl shadow-xl p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-upn-green/20">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
            </div>
            <p className="text-slate-700 leading-relaxed italic">
                "{testimonial.quote}"
            </p>
        </div>
    );
};

export default TestimonialSection;
