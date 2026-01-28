import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../../layouts/AuthLayout';
import { ChevronRight, Check, X, ArrowLeft, ArrowRight, User, MapPin, GraduationCap, Heart, Share2 } from 'lucide-react';

const ProfileSetup: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        nim: '',
        faculty: '',
        major: '',
        interests: [] as string[],
        instagram: '',
        linkedin: '',
        bio: '',
    });

    // Interest tags options
    const interestOptions = [
        'Programming', 'Design', 'Music', 'Sports', 'Photography',
        'Gaming', 'Reading', 'Traveling', 'Cooking', 'Art',
        'Technology', 'Business', 'Volunteering', 'Dancing', 'Writing'
    ];

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        // Mock submission - in real app, send to backend
        console.log('Profile setup complete:', formData);
        navigate('/mentee');
    };

    const progress = (currentStep / totalSteps) * 100;

    return (
        <AuthLayout
            title="Setup Profil"
            subtitle="Lengkapi profil Anda untuk memulai pengalaman SIERA"
        >
            {/* Progress Bar */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-600">
                        Langkah {currentStep} dari {totalSteps}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-upn-green">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-upn-green to-upn-gold transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[300px]">
                {currentStep === 1 && (
                    <Step1PersonalInfo
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {currentStep === 2 && (
                    <Step2AcademicInfo
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {currentStep === 3 && (
                    <Step3Interests
                        interests={formData.interests}
                        toggleInterest={toggleInterest}
                        interestOptions={interestOptions}
                    />
                )}
                {currentStep === 4 && (
                    <Step4SocialConnect
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6 sm:mt-8">
                {currentStep > 1 && (
                    <button
                        onClick={prevStep}
                        className="flex-1 py-3 px-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        <span>Kembali</span>
                    </button>
                )}
                <button
                    onClick={currentStep === totalSteps ? handleSubmit : nextStep}
                    className="flex-1 btn-primary py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                    {currentStep === totalSteps ? (
                        <>
                            <Check size={18} />
                            <span>Selesai</span>
                        </>
                    ) : (
                        <>
                            <span>Lanjut</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </div>
        </AuthLayout>
    );
};

// Step 1: Personal Information
const Step1PersonalInfo: React.FC<{
    formData: any;
    setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => (
    <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center">
                <User className="text-upn-green" size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Informasi Pribadi</h3>
                <p className="text-xs text-slate-500">Masukkan data diri Anda</p>
            </div>
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                Nama Lengkap
            </label>
            <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                NIM
            </label>
            <input
                type="text"
                placeholder="Masukkan NIM"
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                value={formData.nim}
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
            />
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                Bio Singkat
            </label>
            <textarea
                placeholder="Ceritakan sedikit tentang diri Anda"
                rows={3}
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted resize-none"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
        </div>
    </div>
);

// Step 2: Academic Information
const Step2AcademicInfo: React.FC<{
    formData: any;
    setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => (
    <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-upn-green" size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Informasi Akademik</h3>
                <p className="text-xs text-slate-500">Data program studi Anda</p>
            </div>
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                Fakultas
            </label>
            <select
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
            >
                <option value="">Pilih Fakultas</option>
                <option value="Teknik">Fakultas Teknik</option>
                <option value="Ekonomi">Fakultas Ekonomi</option>
                <option value="Hukum">Fakultas Hukum</option>
                <option value="IlmuKomunikasi">Fakultas Ilmu Komunikasi</option>
                <option value="FISIP">Fakultas FISIP</option>
            </select>
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-dark-text mb-2">
                Program Studi
            </label>
            <select
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            >
                <option value="">Pilih Program Studi</option>
                <option value="Informatika">S1 Informatika</option>
                <option value="SistemInformasi">S1 Sistem Informasi</option>
                <option value="TeknikElektro">S1 Teknik Elektro</option>
                <option value="TeknikSipil">S1 Teknik Sipil</option>
                <option value="Manajemen">S1 Manajemen</option>
                <option value="Akuntansi">S1 Akuntansi</option>
            </select>
        </div>
    </div>
);

// Step 3: Interests
const Step3Interests: React.FC<{
    interests: string[];
    toggleInterest: (interest: string) => void;
    interestOptions: string[];
}> = ({ interests, toggleInterest, interestOptions }) => (
    <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center">
                <Heart className="text-upn-green" size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Minat & Hobi</h3>
                <p className="text-xs text-slate-500">Pilih minat Anda (boleh lebih dari satu)</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                    <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border-2 ${isSelected
                            ? 'bg-upn-green text-upn-gold border-upn-green'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-upn-green hover:text-upn-green'
                            }`}
                    >
                        {isSelected ? (
                            <span className="flex items-center gap-1">
                                <Check size={14} />
                                {interest}
                            </span>
                        ) : (
                            <span>{interest}</span>
                        )}
                    </button>
                );
            })}
        </div>

        {interests.length === 0 && (
            <p className="text-xs text-slate-400 italic mt-2">
                Pilih setidaknya satu minat untuk melanjutkan
            </p>
        )}
    </div>
);

// Step 4: Social Connect
const Step4SocialConnect: React.FC<{
    formData: any;
    setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => (
    <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center">
                <Share2 className="text-upn-green" size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Koneksi Sosial</h3>
                <p className="text-xs text-slate-500">Opsional: Hubungkan akun media sosial</p>
            </div>
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                Instagram
            </label>
            <div className="relative">
                <input
                    type="text"
                    placeholder="@username"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
                <span className="absolute left-3 top-3 sm:top-3.5 text-slate-400">@</span>
            </div>
        </div>

        <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                LinkedIn
            </label>
            <input
                type="text"
                placeholder="linkedin.com/in/username"
                className="w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 text-slate-800 placeholder:text-slate-400"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
        </div>

        <div className="p-3 sm:p-4 bg-upn-gold/10 border border-upn-gold/20 rounded-lg">
            <p className="text-xs text-slate-600">
                <span className="font-semibold">Opsional:</span> Informasi sosial media membantu teman baru menemukan Anda.
            </p>
        </div>
    </div>
);

export default ProfileSetup;
