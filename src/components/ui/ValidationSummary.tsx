import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { ValidationMessage } from '../../types/validation';

export type { ValidationMessage };

export interface ValidationSummaryProps {
    messages: ValidationMessage[];
    onDismiss?: () => void;
    showFieldNames?: boolean;
    variant?: 'default' | 'compact' | 'detailed';
    className?: string;
}

export interface InlineValidationProps {
    error?: string;
    size?: 'sm' | 'md';
}

export const InlineValidation: React.FC<InlineValidationProps> = ({ error, size = 'md' }) => {
    if (!error) return null;
    
    return (
        <div className={`flex items-center gap-2 text-red-500 ${size === 'sm' ? 'text-xs' : 'text-sm'} mt-1`}>
            <AlertCircle size={size === 'sm' ? 12 : 16} />
            <span>{error}</span>
        </div>
    );
};

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
    messages,
    onDismiss,
    showFieldNames = false,
    variant = 'default',
    className = ''
}) => {
    if (!messages || messages.length === 0) return null;

    const errorCount = messages.filter(m => m.type === 'error').length;
    const isError = errorCount > 0;
    
    const bgColor = isError ? 'bg-red-50' : 'bg-green-50';
    const borderColor = isError ? 'border-red-200' : 'border-green-200';
    const textColor = isError ? 'text-red-800' : 'text-green-800';
    const iconColor = isError ? 'text-red-500' : 'text-green-500';

    return (
        <div className={`rounded-lg border p-4 ${bgColor} ${borderColor} ${className} transition-all animate-in fade-in slide-in-from-top-2`}>
            <div className="flex items-start gap-3">
                <div className={`shrink-0 mt-0.5 ${iconColor}`}>
                    {isError ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                </div>
                
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${textColor}`}>
                            {isError 
                                ? `Please correct the ${errorCount} error${errorCount > 1 ? 's' : ''} below` 
                                : 'Validation Successful'}
                        </h4>
                        {onDismiss && (
                            <button 
                                onClick={onDismiss}
                                className={`p-1 hover:bg-black/5 rounded ${textColor}`}
                                aria-label="Dismiss"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    
                    {variant !== 'compact' && (
                        <ul className={`text-sm list-disc pl-5 space-y-1 ${textColor} opacity-90`}>
                            {messages.map((msg, idx) => (
                                <li key={idx}>
                                    {showFieldNames && msg.field && (
                                        <span className="font-semibold capitalize">{msg.field}: </span>
                                    )}
                                    {msg.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
