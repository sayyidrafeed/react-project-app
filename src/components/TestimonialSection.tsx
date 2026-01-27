import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-4 lg:-ml-16">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full bg-slate-200 hover:bg-upn-green hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-4 lg:-mr-16">
                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-upn-green text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Testimonial Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 min-h-[300px] flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full"
                            >
                                {/* Profile Image */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-4 ring-upn-green/20 shadow-lg">
                                        <img
                                            src={currentTestimonial.image}
                                            alt={currentTestimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Testimonial Content */}
                                <div className="flex-1 text-center lg:text-left">
                                    <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-6 italic">
                                        "{currentTestimonial.quote}"
                                    </p>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                                            – {currentTestimonial.name}
                                        </h4>
                                        <p className="text-sm text-slate-500">
                                            {currentTestimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-upn-green w-8'
                                        : 'bg-slate-300 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
