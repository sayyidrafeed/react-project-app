# Event Management Module

A comprehensive event management module for the administrative dashboard that enables complete CRUD operations with a clean, responsive interface.

## Features

### Core Functionality
- **Create Events**: Add new events with comprehensive details including title, description, dates, location, venue, capacity, organizer, and status
- **Read Events**: View all events in a clean data grid with sortable columns
- **Update Events**: Edit existing event details through a modal form
- **Delete Events**: Remove events with secure confirmation dialogs

### Advanced Features
- **Search**: Real-time search across event title, description, location, and organizer
- **Filter**: Filter events by status (draft, published, ongoing, completed, cancelled) and date range
- **Sort**: Sort events by any column (title, date, location, status, organizer) in ascending or descending order
- **Validation**: Comprehensive input validation for all form fields with real-time error feedback
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

## Components

### EventManagement
Main component that orchestrates the entire event management interface.

**Props:**
- `events: Event[]` - Array of events to display
- `onCreate: (data: EventFormData) => void` - Callback for creating new events
- `onUpdate: (id: string, data: EventFormData) => void` - Callback for updating events
- `onDelete: (id: string) => void` - Callback for deleting events

**Usage:**
```tsx
<EventManagement
  events={events}
  onCreate={handleCreateEvent}
  onUpdate={handleUpdateEvent}
  onDelete={handleDeleteEvent}
/>
```

### EventModal
Modal component for creating and editing events with form validation.

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Callback for closing the modal
- `onSave: (data: EventFormData) => void` - Callback for saving event data
- `event?: Event | null` - Event to edit (null for create mode)

**Usage:**
```tsx
<EventModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSaveEvent}
  event={selectedEvent}
/>
```

### ConfirmDialog
Reusable confirmation dialog component for critical actions.

**Props:**
- `isOpen: boolean` - Controls dialog visibility
- `onClose: () => void` - Callback for closing the dialog
- `onConfirm: () => void` - Callback for confirming the action
- `title: string` - Dialog title
- `message: string` - Dialog message
- `confirmText?: string` - Text for confirm button (default: "Confirm")
- `cancelText?: string` - Text for cancel button (default: "Cancel")
- `variant?: 'danger' | 'warning' | 'info'` - Visual variant (default: "danger")

**Usage:**
```tsx
<ConfirmDialog
  isOpen={isDeleteDialogOpen}
  onClose={() => setIsDeleteDialogOpen(false)}
  onConfirm={handleConfirmDelete}
  title="Hapus Event?"
  message="Apakah Anda yakin ingin menghapus event ini?"
  confirmText="Hapus"
  cancelText="Batal"
  variant="danger"
/>
```

## Data Types

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO datetime string
  endDate: string;   // ISO datetime string
  location: string;
  venue: string;
  capacity: number;
  organizer: string;
  status: EventStatus;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}
```

### EventFormData
```typescript
interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  capacity: number;
  organizer: string;
  status: EventStatus;
}
```

### EventStatus
```typescript
type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
```

### EventFilters
```typescript
interface EventFilters {
  search: string;
  status?: EventStatus;
  dateFrom?: string;
  dateTo?: string;
}
```

### EventSort
```typescript
interface EventSort {
  field: keyof Event;
  direction: 'asc' | 'desc';
}
```

## Form Validation

The event form includes comprehensive validation for all fields:

| Field | Validation Rules |
|-------|-----------------|
| Title | Required, 3-100 characters |
| Description | Required, 10-1000 characters |
| Start Date | Required |
| End Date | Required, must be after start date |
| Location | Required, minimum 2 characters |
| Venue | Required, minimum 2 characters |
| Capacity | Required, must be > 0 and ≤ 10,000 |
| Organizer | Required, minimum 2 characters |
| Status | Required |

## Status Badges

Events are displayed with color-coded status badges:

| Status | Badge Color |
|--------|-------------|
| Draft | Warning (yellow) |
| Published | Success (green) |
| Ongoing | Info (blue) |
| Completed | Secondary (gray) |
| Cancelled | Error (red) |

## Example Usage

```tsx
import React, { useState } from 'react';
import { EventManagement } from '../components/events/EventManagement';
import { Event, EventFormData } from '../types/event';
import { mockEvents } from '../data/mockEvents';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleCreateEvent = (data: EventFormData) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEvents([newEvent, ...events]);
  };

  const handleUpdateEvent = (id: string, data: EventFormData) => {
    setEvents(events.map((event) =>
      event.id === id
        ? { ...event, ...data, updatedAt: new Date().toISOString() }
        : event
    ));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <EventManagement
      events={events}
      onCreate={handleCreateEvent}
      onUpdate={handleUpdateEvent}
      onDelete={handleDeleteEvent}
    />
  );
};

export default AdminEvents;
```

## UI Components Used

- **Button**: Reusable button component with variants (primary, secondary, outline, ghost)
- **Input**: Text input with label, error, and hint support
- **Select**: Dropdown select with label and error support
- **Textarea**: Multi-line text input with label and error support
- **Badge**: Status indicator with color variants
- **Card**: Container component for content grouping
- **Modal**: Overlay modal for dialogs and forms
- **ConfirmDialog**: Specialized modal for confirmations

## Styling

The module uses Tailwind CSS with custom utility classes defined in `src/index.css`:

- `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost` - Button styles
- `card`, `card-elevated`, `card-outlined` - Card variants
- `input-field`, `input-error` - Input styles
- `badge-primary`, `badge-secondary`, `badge-success`, `badge-warning`, `badge-error`, `badge-info` - Badge variants

## Accessibility

- All form inputs have proper labels and ARIA attributes
- Error messages are associated with their inputs using `aria-describedby`
- Modals have proper `role="dialog"` and `aria-modal="true"` attributes
- Buttons have descriptive titles for icon-only buttons
- Keyboard navigation is fully supported

## Future Enhancements

Potential improvements for the module:

1. **Pagination**: Add pagination for large event lists
2. **Bulk Actions**: Support for bulk delete and status updates
3. **Export**: Export events to CSV/PDF
4. **Calendar View**: Switch between list and calendar views
5. **Event Categories**: Add category/tag system for events
6. **Event Registration**: Track event registrations
7. **Notifications**: Add email/SMS notifications for events
8. **Image Upload**: Support for event images/banners
9. **Recurring Events**: Support for recurring event patterns
10. **Event Analytics**: Dashboard with event statistics

## Testing

The module should be tested for:

- CRUD operations (create, read, update, delete)
- Form validation (all fields and edge cases)
- Search functionality (various search terms)
- Filter functionality (status and date filters)
- Sort functionality (all columns and directions)
- Responsive design (desktop, tablet, mobile)
- Accessibility (keyboard navigation, screen readers)
- Error handling (network errors, validation errors)
