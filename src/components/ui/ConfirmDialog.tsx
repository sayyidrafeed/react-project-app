import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger'
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const variants = {
        danger: {
            iconColor: 'text-semantic-error',
            bgColor: 'bg-red-50',
            btnVariant: 'primary' as const
        },
        warning: {
            iconColor: 'text-semantic-warning',
            bgColor: 'bg-yellow-50',
            btnVariant: 'secondary' as const
        },
        info: {
            iconColor: 'text-semantic-info',
            bgColor: 'bg-blue-50',
            btnVariant: 'primary' as const
        }
    };

    const currentVariant = variants[variant];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            showCloseButton={false}
        >
            <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${currentVariant.bgColor} flex items-center justify-center`}>
                    <AlertTriangle size={32} className={currentVariant.iconColor} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {title}
                </h3>

                <p className="text-slate-600 mb-6">
                    {message}
                </p>

                <div className="flex gap-3 justify-center">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'primary' : currentVariant.btnVariant}
                        onClick={handleConfirm}
                        className={`flex-1 ${variant === 'danger' ? 'bg-semantic-error hover:bg-red-700' : ''}`}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
