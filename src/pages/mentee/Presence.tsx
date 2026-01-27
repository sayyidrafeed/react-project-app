import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Camera, MapPin, CheckCircle, XCircle, Clock, RefreshCw, AlertTriangle, Navigation } from 'lucide-react';
import { MOCK_EVENTS } from '../../data/mockData';

type ValidationStep = 'idle' | 'camera' | 'location' | 'validating' | 'success' | 'failed';

const PresencePage: React.FC = () => {
    const navigate = useNavigate();
    const [validationStep, setValidationStep] = useState<ValidationStep>('idle');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const validationSteps = [
        { icon: Camera, label: 'Mengakses Kamera', description: 'Memeriksa izin kamera...' },
        { icon: MapPin, label: 'Mendeteksi Lokasi', description: 'Memvalidasi koordinat GPS...' },
        { icon: Navigation, label: 'Validasi EXIF', description: 'Memverifikasi metadata foto...' },
        { icon: CheckCircle, label: 'Selesai', description: 'Presensi berhasil!' },
    ];

    const startValidation = () => {
        setIsProcessing(true);
        setValidationStep('camera');

        // Animate through steps
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setCurrentStepIndex(step);

            if (step >= validationSteps.length - 1) {
                clearInterval(interval);
                setValidationStep('success');
                setIsProcessing(false);
            }
        }, 1500);

        return () => clearInterval(interval);
    };

    const resetValidation = () => {
        setValidationStep('idle');
        setCurrentStepIndex(0);
        setIsProcessing(false);
    };

    const todayEvents = MOCK_EVENTS.filter(e => {
        const eventDate = new Date(e.date);
        const today = new Date();
        return eventDate.toDateString() === today.toDateString();
    });

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-dark-text">Presensi Digital</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                        Validasi kehadiran dengan geolokasi dan foto
                    </p>
                </div>

                {/* Today's Events */}
                {todayEvents.length > 0 && (
                    <div className="card p-4 sm:p-6">
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text mb-3 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-upn-gold" />
                            Acara Hari Ini
                        </h3>
                        <div className="space-y-2">
                            {todayEvents.slice(0, 2).map(event => (
                                <div key={event.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-bg rounded-xl">
                                    <div className="w-10 h-10 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green dark:text-upn-gold shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-slate-800 dark:text-dark-text text-sm">{event.title}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-dark-text-muted">{event.time} • {event.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Camera View Placeholder */}
                <div className="card p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text mb-4">
                        Kamera Presensi
                    </h3>
                    <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                        {validationStep === 'idle' ? (
                            <div className="text-center">
                                <Camera size={48} className="text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 text-sm">Kamera belum aktif</p>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <div className="w-20 h-20 bg-upn-green/20 rounded-full flex items-center justify-center animate-pulse">
                                    <Camera size={40} className="text-upn-green" />
                                </div>
                            </div>
                        )}
                        {/* Scan Line Animation */}
                        {validationStep !== 'idle' && (
                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-upn-gold/80 animate-scan"></div>
                        )}
                    </div>
                </div>

                {/* Map Preview Placeholder */}
                <div className="card p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text mb-4">
                        Lokasi GPS
                    </h3>
                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-dark-bg rounded-xl overflow-hidden">
                        {validationStep === 'idle' ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
                                    <p className="text-slate-500 text-sm">Lokasi belum terdeteksi</p>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                                {/* Mock Map Grid */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="grid grid-cols-6 grid-rows-4 h-full">
                                        {[...Array(24)].map((_, i) => (
                                            <div key={i} className="border border-slate-300 dark:border-dark-border"></div>
                                        ))}
                                    </div>
                                </div>
                                {/* Location Marker */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-8 h-8 bg-upn-green rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                                        <MapPin size={16} />
                                    </div>
                                </div>
                                {/* Location Info */}
                                <div className="absolute bottom-3 left-3 right-3 bg-white dark:bg-dark-surface rounded-lg p-2 shadow-lg">
                                    <p className="text-[10px] font-mono text-slate-700 dark:text-dark-text">
                                        -6.2088° S, 106.8456° E
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Live Validation Steps */}
                <div className="card p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text mb-4 flex items-center gap-2">
                        <RefreshCw size={18} className={isProcessing ? 'animate-spin text-upn-green' : 'text-slate-400'} />
                        Status Validasi Langsung
                    </h3>

                    {validationStep === 'idle' && (
                        <div className="text-center py-6 sm:py-8">
                            <p className="text-slate-500 dark:text-dark-text-muted text-sm sm:text-base mb-4">
                                Tekan tombol di bawah untuk memulai validasi presensi
                            </p>
                            <button
                                onClick={startValidation}
                                className="btn-primary py-3 px-6 rounded-xl text-sm sm:text-base font-semibold"
                            >
                                Mulai Validasi
                            </button>
                        </div>
                    )}

                    {validationStep !== 'idle' && (
                        <div className="space-y-3">
                            {validationSteps.map((step, index) => {
                                const isCurrent = index === currentStepIndex;
                                const isPast = index < currentStepIndex;
                                const StepIcon = step.icon;

                                return (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 p-3 rounded-xl transition-all ${isCurrent
                                                ? 'bg-upn-green/10 border-2 border-upn-green'
                                                : isPast
                                                    ? 'bg-green-50 dark:bg-green-900/20'
                                                    : 'bg-slate-50 dark:bg-dark-bg opacity-50'
                                            }`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isCurrent
                                                    ? 'bg-upn-green text-white animate-pulse'
                                                    : isPast
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-slate-200 dark:bg-dark-border text-slate-400 dark:text-dark-text-muted'
                                                }`}
                                        >
                                            <StepIcon size={18} />
                                        </div>
                                        <div className="flex-grow">
                                            <p
                                                className={`font-semibold text-sm ${isCurrent
                                                        ? 'text-upn-green dark:text-upn-gold'
                                                        : isPast
                                                            ? 'text-green-600 dark:text-green-400'
                                                            : 'text-slate-500 dark:text-dark-text-muted'
                                                    }`}
                                            >
                                                {step.label}
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted mt-0.5">
                                                {step.description}
                                            </p>
                                        </div>
                                        {isPast && (
                                            <CheckCircle size={20} className="text-green-600 dark:text-green-400 shrink-0" />
                                        )}
                                        {isCurrent && (
                                            <div className="w-5 h-5 border-2 border-upn-green border-t-transparent rounded-full animate-spin shrink-0"></div>
                                        )}
                                    </div>
                                );
                            })}

                            {validationStep === 'success' && (
                                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                                        <div>
                                            <p className="text-base sm:text-lg font-bold text-green-800 dark:text-green-400">
                                                Presensi Berhasil!
                                            </p>
                                            <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-text-muted mt-1">
                                                Data Anda telah tersimpan. Selamat mengikuti kegiatan!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {validationStep === 'success' && (
                        <button
                            onClick={() => navigate('/mentee')}
                            className="w-full btn-primary py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold mt-4"
                        >
                            Kembali ke Dashboard
                        </button>
                    )}

                    {validationStep !== 'idle' && validationStep !== 'success' && (
                        <button
                            onClick={resetValidation}
                            className="w-full py-3 px-6 border-2 border-slate-300 dark:border-dark-border rounded-xl text-sm sm:text-base font-semibold text-slate-600 dark:text-dark-text-muted hover:bg-slate-100 dark:hover:bg-dark-border transition-all"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PresencePage;
