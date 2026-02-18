import React from 'react';
import { Select, SelectProps } from './Input';

export interface ValidatedSelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface ValidatedSelectProps extends Omit<SelectProps, 'children'> {
    options: ValidatedSelectOption[];
    placeholder?: string;
}

export const ValidatedSelect: React.FC<ValidatedSelectProps> = ({
    options,
    placeholder,
    value,
    ...props
}) => {
    return (
        <Select value={value} {...props}>
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option 
                    key={option.value} 
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
            ))}
        </Select>
    );
};
