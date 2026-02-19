import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Event, EventFormData, EventStatus } from '../../../types/event';

type EventFormValue = string | number;

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: EventFormData) => void;
    event?: Event | null;
}

export const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    event
}) => {
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        venue: '',
        capacity: 0,
        organizer: '',
        status: 'draft'
    });

    const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof EventFormData, boolean>>>({});

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                venue: event.venue,
                capacity: event.capacity,
                organizer: event.organizer,
                status: event.status
            });
        } else {
            setFormData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                location: '',
                venue: '',
                capacity: 0,
                organizer: '',
                status: 'draft'
            });
        }
        setErrors({});
        setTouched({});
    }, [event, isOpen]);

    const validateField = (name: keyof EventFormData, value: EventFormValue): string | undefined => {
        const strValue = value as string;
        switch (name) {
            case 'title':
                if (!strValue || strValue.trim().length === 0) {
                    return 'Event title is required';
                }
                if (strValue.trim().length < 3) {
                    return 'Event title must be at least 3 characters';
                }
                if (strValue.trim().length > 100) {
                    return 'Event title must not exceed 100 characters';
                }
                break;
            case 'description':
                if (!strValue || strValue.trim().length === 0) {
                    return 'Description is required';
                }
                if (strValue.trim().length < 10) {
                    return 'Description must be at least 10 characters';
                }
                if (strValue.trim().length > 1000) {
                    return 'Description must not exceed 1000 characters';
                }
                break;
            case 'startDate':
                if (!value) {
                    return 'Start date is required';
                }
                break;
            case 'endDate':
                if (!strValue) {
                    return 'End date is required';
                }
                if (formData.startDate && new Date(strValue) <= new Date(formData.startDate)) {
                    return 'End date must be after start date';
                }
                break;
            case 'location':
                if (!strValue || strValue.trim().length === 0) {
                    return 'Location is required';
                }
                if (strValue.trim().length < 2) {
                    return 'Location must be at least 2 characters';
                }
                break;
            case 'venue':
                if (!strValue || strValue.trim().length === 0) {
                    return 'Venue is required';
                }
                if (strValue.trim().length < 2) {
                    return 'Venue must be at least 2 characters';
                }
                break;
            case 'capacity':
                const numValue = value as number;
                if (!numValue || numValue <= 0) {
                    return 'Capacity must be greater than 0';
                }
                if (numValue > 10000) {
                    return 'Capacity must not exceed 10,000';
                }
                break;
            case 'organizer':
                if (!strValue || strValue.trim().length === 0) {
                    return 'Organizer is required';
                }
                if (strValue.trim().length < 2) {
                    return 'Organizer must be at least 2 characters';
                }
                break;
            case 'status':
                if (!strValue) {
                    return 'Status is required';
                }
                break;
        }
        return undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof EventFormData, string>> = {};
        let isValid = true;

        (Object.keys(formData) as Array<keyof EventFormData>).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleFieldChange = (name: keyof EventFormData, value: EventFormValue) => {
        setFormData((prev: EventFormData) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleFieldBlur = (name: keyof EventFormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, formData[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched: Partial<Record<keyof EventFormData, boolean>> = {};
        (Object.keys(formData) as Array<keyof EventFormData>).forEach((key) => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={event ? 'Edit Event' : 'Create New Event'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Event Title"
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    onBlur={() => handleFieldBlur('title')}
                    error={touched.title ? errors.title : undefined}
                    placeholder="Enter event title"
                    required
                />

                <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    onBlur={() => handleFieldBlur('description')}
                    error={touched.description ? errors.description : undefined}
                    placeholder="Enter event description"
                    rows={4}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Start Date & Time"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => handleFieldChange('startDate', e.target.value)}
                        onBlur={() => handleFieldBlur('startDate')}
                        error={touched.startDate ? errors.startDate : undefined}
                        required
                    />

                    <Input
                        label="End Date & Time"
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => handleFieldChange('endDate', e.target.value)}
                        onBlur={() => handleFieldBlur('endDate')}
                        error={touched.endDate ? errors.endDate : undefined}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Location"
                        value={formData.location}
                        onChange={(e) => handleFieldChange('location', e.target.value)}
                        onBlur={() => handleFieldBlur('location')}
                        error={touched.location ? errors.location : undefined}
                        placeholder="e.g., UPN Veteran Jakarta"
                        required
                    />

                    <Input
                        label="Venue"
                        value={formData.venue}
                        onChange={(e) => handleFieldChange('venue', e.target.value)}
                        onBlur={() => handleFieldBlur('venue')}
                        error={touched.venue ? errors.venue : undefined}
                        placeholder="e.g., Auditorium, Room 101"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Capacity"
                        type="number"
                        min="1"
                        max="10000"
                        value={formData.capacity}
                        onChange={(e) => handleFieldChange('capacity', parseInt(e.target.value) || 0)}
                        onBlur={() => handleFieldBlur('capacity')}
                        error={touched.capacity ? errors.capacity : undefined}
                        placeholder="Enter maximum capacity"
                        required
                    />

                    <Input
                        label="Organizer"
                        value={formData.organizer}
                        onChange={(e) => handleFieldChange('organizer', e.target.value)}
                        onBlur={() => handleFieldBlur('organizer')}
                        error={touched.organizer ? errors.organizer : undefined}
                        placeholder="Enter organizer name"
                        required
                    />
                </div>

                <Select
                    label="Status"
                    value={formData.status}
                    onChange={(e) => handleFieldChange('status', e.target.value as EventStatus)}
                    onBlur={() => handleFieldBlur('status')}
                    error={touched.status ? errors.status : undefined}
                    required
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </Select>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">
                        {event ? 'Update Event' : 'Create Event'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EventModal;
