import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Camera, MapPin, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const PresencePage: React.FC = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleCapture = async () => {
        setIsCapturing(true);
        await new Promise(r => setTimeout(r, 1500));
        setCapturedImage('https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=400');
        setIsCapturing(false);
    };

    const handleSubmit = async () => {
        setIsCapturing(true);
        await new Promise(r => setTimeout(r, 2000));
        setIsSubmitted(true);
        setIsCapturing(false);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black">Presensi Digital</h1>
                    <p className="text-slate-500 font-medium mt-1">Verifikasi kehadiran PATRIBERA dengan ekstraksi metadata foto.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* Camera View Subcomponent */}
                    <div className="space-y-4">
                        <h3 className="font-black text-lg flex items-center gap-2">
                            <Camera size={20} className="text-upn-green" /> Camera Preview
                        </h3>
                        <div className="aspect-[4/5] bg-slate-900 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center border-8 border-white shadow-2xl">
                            {capturedImage ? (
                                <img src={capturedImage} className="w-full h-full object-cover grayscale-[20%]" />
                            ) : (
                                <div className="text-center space-y-4 px-12">
                                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white mx-auto animate-pulse">
                                        <Camera size={32} />
                                    </div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Position your face within the frame</p>
                                </div>
                            )}

                            <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-white/20 rounded-full border-dashed"></div>

                            {!capturedImage && !isCapturing && (
                                <button
                                    onClick={handleCapture}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-1 border-4 border-white/20 active:scale-95 transition-all"
                                >
                                    <div className="w-full h-full bg-slate-900 rounded-full border-2 border-white border-dashed"></div>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Verification Details */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="card bg-white p-6 md:p-8 space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Metadata Kehadiran</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-upn-green"><MapPin size={16} /></div>
                                        <div>
                                            <p className="font-bold leading-none">UPN "Veteran" Jakarta</p>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Campus Pondok Labu (6.321°S, 106.791°E)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-upn-green"><ShieldCheck size={16} /></div>
                                        <div>
                                            <p className="font-bold leading-none">Keadaan Perangkat</p>
                                            <p className="text-[10px] text-green-500 uppercase font-black mt-0.5">TERAUTENTIKASI • NO ROOT/JB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-upn-gold/5 rounded-2xl border border-upn-gold/20 flex items-start gap-3">
                                <AlertTriangle size={18} className="text-upn-gold shrink-0 mt-0.5" />
                                <p className="text-[11px] font-medium text-upn-green leading-relaxed">
                                    Pastikan pencahayaan cukup dan wajah terlihat jelas tanpa aksesoris yang menutupi (masker/kacamata hitam).
                                </p>
                            </div>

                            {isSubmitted ? (
                                <div className="bg-upn-green text-upn-gold p-6 rounded-2xl text-center space-y-3 shadow-xl shadow-green-900/10">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <div>
                                        <h5 className="font-black text-lg">KEHADIRAN DICATAT</h5>
                                        <p className="text-[10px] font-bold uppercase opacity-80">27 Jan 2026 • 08:32:10 WIB</p>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    disabled={!capturedImage || isCapturing}
                                    onClick={handleSubmit}
                                    className="w-full btn-primary py-5 text-xl font-black flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-green-900/20"
                                >
                                    {isCapturing ? 'MEMPROSES...' : 'VERIFIKASI HADIR'}
                                </button>
                            )}
                        </div>

                        {!isSubmitted && (
                            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-8 leading-loose">
                                Data presensi akan diverifikasi berdasarkan metadata foto yang diunggah.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PresencePage;
