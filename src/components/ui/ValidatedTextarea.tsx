import React, { useEffect, useRef } from 'react';
import { Textarea, TextareaProps } from './Input';

export interface ValidatedTextareaProps extends TextareaProps {
    characterCount?: boolean;
    maxLength?: number;
    autoResize?: boolean;
    minHeight?: string;
    maxHeight?: string;
}

export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
    characterCount,
    maxLength,
    autoResize,
    minHeight = '120px',
    maxHeight = '300px',
    value,
    className,
    style,
    ...props
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = minHeight;
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${Math.min(scrollHeight, parseInt(maxHeight))}px`;
        }
    }, [value, autoResize, minHeight, maxHeight]);

    return (
        <div className="relative">
            <Textarea
                {...props}
                ref={textareaRef}
                value={value}
                maxLength={maxLength}
                className={className}
                style={{
                    ...style,
                    minHeight,
                    maxHeight: autoResize ? maxHeight : undefined,
                }}
            />
            
            {characterCount && maxLength && (
                <div className="text-xs text-slate-400 text-right mt-1">
                    {value?.toString().length || 0}/{maxLength}
                </div>
            )}
        </div>
    );
};
