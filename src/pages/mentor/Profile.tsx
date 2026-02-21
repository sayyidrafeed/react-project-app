import React, { useRef } from 'react';
import { Camera, CheckCircle2, KeyRound, Mail, ShieldCheck, User as UserIcon, Users, LogOut } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { ValidatedForm, FormActions, FormField, FormSection } from '../../components/forms/ValidatedForm';
import { ValidationSchema } from '../../types/validation';
import { commonRules } from '../../utils/validation';
import { useProfileReducer } from './hooks/useProfileReducer';
import { usePasswordReducer } from './hooks/usePasswordReducer';

const profileSchema: ValidationSchema = {
    name: [
        commonRules.required('Nama lengkap wajib diisi'),
        commonRules.minLength(3, 'Nama minimal 3 karakter'),
        commonRules.maxLength(80, 'Nama maksimal 80 karakter'),
    ],
    email: [
        commonRules.required('Email wajib diisi'),
        commonRules.email('Format email tidak valid'),
    ],
    group: [
        commonRules.required('Kelompok wajib diisi'),
        commonRules.minLength(3, 'Kelompok minimal 3 karakter'),
        commonRules.maxLength(60, 'Kelompok maksimal 60 karakter'),
    ],
};

const passwordSchema: ValidationSchema = {
    currentPassword: [
        commonRules.required('Password saat ini wajib diisi'),
    ],
    newPassword: [
        commonRules.required('Password baru wajib diisi'),
        commonRules.minLength(8, 'Password baru minimal 8 karakter'),
    ],
    confirmPassword: [
        commonRules.required('Konfirmasi password wajib diisi'),
        commonRules.custom(
            (value, formData) => String(value ?? '') === String(formData?.newPassword ?? ''),
            'Konfirmasi password harus sama dengan password baru'
        ),
    ],
};

const MentorProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { state: profileState, dispatch: dispatchProfile } = useProfileReducer(user ?? undefined);
    const { state: passwordState, dispatch: dispatchPassword } = usePasswordReducer();

    if (!user) return null;

    const mentorGroup = profileState.data.group || '21 - PATRIBERA';
    const mentorInitial = profileState.data.name?.charAt(0)?.toUpperCase() || 'M';

    const handleProfileSave = async (values: Record<string, unknown>) => {
        dispatchProfile({
            type: 'SET_DATA',
            payload: {
                name: String(values.name ?? ''),
                email: String(values.email ?? ''),
                group: String(values.group ?? ''),
            },
        });
        dispatchProfile({ type: 'SET_SAVED', payload: true });
        setTimeout(() => dispatchProfile({ type: 'SET_SAVED', payload: false }), 2200);
    };

    const handlePasswordSubmit = async (values: Record<string, unknown>) => {
        dispatchPassword({
            type: 'SET_PENDING',
            payload: {
                currentPassword: String(values.currentPassword ?? ''),
                newPassword: String(values.newPassword ?? ''),
                confirmPassword: String(values.confirmPassword ?? ''),
            },
        });
        dispatchPassword({ type: 'SET_CONFIRM_OPEN', payload: true });
    };

    const handleConfirmPasswordChange = () => {
        if (!passwordState.pending) return;
        dispatchPassword({ type: 'SET_CONFIRM_OPEN', payload: false });
        dispatchPassword({ type: 'SET_PENDING', payload: null });
        dispatchPassword({ type: 'INCREMENT_FORM_KEY' });
        dispatchPassword({ type: 'SET_CHANGED', payload: true });
        setTimeout(() => dispatchPassword({ type: 'SET_CHANGED', payload: false }), 2200);
    };

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                dispatchProfile({ type: 'SET_AVATAR', payload: reader.result });
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">
                        Profil Mentor
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                        Kelola data profil, foto, dan keamanan akun Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-4 sm:gap-6">
                    <div className="space-y-4 sm:space-y-6">
                        <div className="card p-4 sm:p-6">
                            <ValidatedForm
                                schema={profileSchema}
                                initialValues={profileState.data}
                                onSubmit={handleProfileSave}
                                showSummary
                                showProgress={false}
                                layout="vertical"
                            >
                                <FormSection
                                    title="Informasi Profil"
                                    description="Perbarui data utama mentor yang tampil pada dashboard."
                                >
                                    <FormField
                                        name="name"
                                        label="Nama Lengkap"
                                        placeholder="Masukkan nama lengkap"
                                        required
                                        icon={UserIcon}
                                    />
                                    <FormField
                                        name="email"
                                        type="email"
                                        label="Email"
                                        placeholder="nama@upnvj.ac.id"
                                        required
                                        icon={Mail}
                                    />
                                    <FormField
                                        name="group"
                                        label="Kelompok"
                                        placeholder="Contoh: 21 - PATRIBERA"
                                        required
                                        icon={Users}
                                    />
                                </FormSection>

                                <FormActions align="left">
                                    <Button type="submit" variant="primary" size="md" className="rounded-xl">
                                        Simpan Perubahan
                                    </Button>
                                    {profileState.saved && (
                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                                            <CheckCircle2 size={16} />
                                            <span>Profil berhasil disimpan</span>
                                        </div>
                                    )}
                                </FormActions>
                            </ValidatedForm>
                        </div>

                        <div className="card p-4 sm:p-6">
                            <ValidatedForm
                                key={passwordState.formKey}
                                schema={passwordSchema}
                                initialValues={{
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                onSubmit={handlePasswordSubmit}
                                showSummary
                                showProgress={false}
                                layout="vertical"
                            >
                                <FormSection
                                    title="Ubah Password"
                                    description="Gunakan minimal 8 karakter agar akun tetap aman."
                                >
                                    <FormField
                                        name="currentPassword"
                                        type="password"
                                        label="Password Saat Ini"
                                        placeholder="Masukkan password saat ini"
                                        required
                                        icon={KeyRound}
                                    />
                                    <FormField
                                        name="newPassword"
                                        type="password"
                                        label="Password Baru"
                                        placeholder="Masukkan password baru"
                                        required
                                        icon={ShieldCheck}
                                    />
                                    <FormField
                                        name="confirmPassword"
                                        type="password"
                                        label="Konfirmasi Password Baru"
                                        placeholder="Ulangi password baru"
                                        required
                                        icon={ShieldCheck}
                                    />
                                </FormSection>

                                <FormActions align="left">
                                    <Button type="submit" variant="outline" size="md" className="rounded-xl">
                                        Simpan Password
                                    </Button>
                                    {passwordState.changed && (
                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                                            <CheckCircle2 size={16} />
                                            <span>Password berhasil diperbarui</span>
                                        </div>
                                    )}
                                </FormActions>
                            </ValidatedForm>
                        </div>
                    </div>

                    <div className="card p-4 sm:p-6 h-fit">
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-upn-green/15 dark:bg-upn-gold/15 border border-upn-green/25 dark:border-upn-gold/35 flex items-center justify-center">
{profileState.avatarPreview ? (
                                        <img src={profileState.avatarPreview} alt={profileState.data.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl sm:text-4xl font-black text-upn-green dark:text-upn-gold">{mentorInitial}</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-base sm:text-lg font-black text-slate-800 dark:text-dark-text truncate">
                                        {profileState.data.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted truncate">
                                        {profileState.data.email}
                                    </p>
                                </div>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                size="md"
                                className="w-full rounded-xl"
                                icon={Camera}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Ubah Foto
                            </Button>

                            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-dark-border">
                                <InfoRow label="Nama Lengkap" value={profileState.data.name} />
                                <InfoRow label="Email" value={profileState.data.email} />
                                <InfoRow label="Kelompok" value={mentorGroup} />
                            </div>

                            {/* Actions */}
                            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-dark-border">
                                <button
                                    onClick={logout}
                                    className="w-full py-3 sm:py-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-black rounded-2xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <LogOut size={20} />
                                    KELUAR SESI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
isOpen={passwordState.confirmOpen}
                onClose={() => dispatchPassword({ type: 'SET_CONFIRM_OPEN', payload: false })}
                title="Konfirmasi Ubah Password"
                size="sm"
                className="dark:bg-dark-surface dark:border dark:border-dark-border"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-dark-text-muted">
                        Anda yakin ingin mengubah password akun mentor ini?
                    </p>
                    <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => dispatchPassword({ type: 'SET_CONFIRM_OPEN', payload: false })}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            className="rounded-lg"
                            onClick={handleConfirmPasswordChange}
                        >
                            Konfirmasi
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="space-y-1">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 dark:text-dark-text-muted">
            {label}
        </p>
        <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-dark-text break-words">
            {value}
        </p>
    </div>
);

export default MentorProfilePage;
