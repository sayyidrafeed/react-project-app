import React, { useMemo, useRef, useState } from 'react';
import { Camera, CheckCircle2, KeyRound, Mail, ShieldCheck, User as UserIcon, Users } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { ValidatedForm, FormActions, FormField, FormSection } from '../../components/forms/ValidatedForm';
import { ValidationSchema } from '../../types/validation';
import { commonRules } from '../../utils/validation';

const DEFAULT_MENTOR_GROUP = '21 - PATRIBERA';

interface MentorProfileFormValues {
    name: string;
    email: string;
    group: string;
}

interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

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
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initialProfileValues = useMemo<MentorProfileFormValues>(() => ({
        name: user?.name ?? 'Kak Mentor Patribera',
        email: user?.email ?? 'mentor@upnvj.ac.id',
        group: user?.major ?? DEFAULT_MENTOR_GROUP,
    }), [user?.email, user?.major, user?.name]);

    const [profileData, setProfileData] = useState<MentorProfileFormValues>(initialProfileValues);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar ?? null);
    const [isProfileSaved, setIsProfileSaved] = useState(false);

    const [pendingPassword, setPendingPassword] = useState<PasswordFormValues | null>(null);
    const [isPasswordConfirmOpen, setIsPasswordConfirmOpen] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [passwordFormKey, setPasswordFormKey] = useState(0);

    if (!user) return null;

    const mentorGroup = profileData.group || DEFAULT_MENTOR_GROUP;
    const mentorInitial = profileData.name?.charAt(0)?.toUpperCase() || 'M';

    const handleProfileSave = async (values: Record<string, unknown>) => {
        const updatedData: MentorProfileFormValues = {
            name: String(values.name ?? ''),
            email: String(values.email ?? ''),
            group: String(values.group ?? ''),
        };
        setProfileData(updatedData);
        setIsProfileSaved(true);
        setTimeout(() => setIsProfileSaved(false), 2200);
    };

    const handlePasswordSubmit = async (values: Record<string, unknown>) => {
        setPendingPassword({
            currentPassword: String(values.currentPassword ?? ''),
            newPassword: String(values.newPassword ?? ''),
            confirmPassword: String(values.confirmPassword ?? ''),
        });
        setIsPasswordConfirmOpen(true);
    };

    const handleConfirmPasswordChange = () => {
        if (!pendingPassword) return;
        setIsPasswordConfirmOpen(false);
        setPendingPassword(null);
        setPasswordFormKey((prev) => prev + 1);
        setIsPasswordChanged(true);
        setTimeout(() => setIsPasswordChanged(false), 2200);
    };

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setAvatarPreview(reader.result);
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
                                initialValues={profileData}
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
                                    {isProfileSaved && (
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
                                key={passwordFormKey}
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
                                    {isPasswordChanged && (
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
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt={profileData.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl sm:text-4xl font-black text-upn-green dark:text-upn-gold">{mentorInitial}</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-base sm:text-lg font-black text-slate-800 dark:text-dark-text truncate">
                                        {profileData.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted truncate">
                                        {profileData.email}
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
                                <InfoRow label="Nama Lengkap" value={profileData.name} />
                                <InfoRow label="Email" value={profileData.email} />
                                <InfoRow label="Kelompok" value={mentorGroup} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isPasswordConfirmOpen}
                onClose={() => setIsPasswordConfirmOpen(false)}
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
                            onClick={() => setIsPasswordConfirmOpen(false)}
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
