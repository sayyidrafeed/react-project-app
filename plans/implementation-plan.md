# SIERA Frontend Implementation Plan
## Zero-Backend Demo Enhancement

**Date:** 2026-01-27
**Mode:** Architect
**Status:** Ready for Implementation

---

## Executive Summary

This plan outlines the implementation of pending features identified in the frontend audit report, transforming the SIERA application into a fully functional zero-backend demo with comprehensive mock data, enhanced authentication, and complete dashboard implementations for all user roles.

---

## 1. Authentication System Refactoring

### Current State
- [`LoginPage.tsx`](../siera-frontend/src/pages/LoginPage.tsx:1-101) requires manual email/password entry
- [`RegisterPage.tsx`](../siera-frontend/src/pages/RegisterPage.tsx:1-110) provides public registration
- [`AuthContext.tsx`](../siera-frontend/src/context/AuthContext.tsx:49-67) generates mock user from provided email

### Proposed Changes

#### 1.1 Login Page Enhancement
**File:** `siera-frontend/src/pages/LoginPage.tsx`

**Changes:**
- Auto-generate random email: `user_<random>@siera.upnvj.ac.id`
- Auto-generate random password: `pass_<random_8chars>`
- Display auto-generated credentials in readonly fields
- Keep free UserRole selection (admin/mentor/mentee)
- Remove "Daftar Akun" link pointing to /register
- Update login flow to use auto-generated credentials

**Implementation Details:**
```typescript
// Auto-generate credentials on mount
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState<UserRole>('mentee');

useEffect(() => {
  const randomId = Math.random().toString(36).substring(2, 8);
  setEmail(`user_${randomId}@siera.upnvj.ac.id`);
  setPassword(`pass_${Math.random().toString(36).substring(2, 10)}`);
}, []);
```

#### 1.2 Remove Public Registration
**Files:**
- Delete: `siera-frontend/src/pages/RegisterPage.tsx`
- Update: `siera-frontend/src/App.tsx` (remove /register route)

#### 1.3 Admin User Creation Functionality
**File:** `siera-frontend/src/pages/AdminUsers.tsx`

**New Features:**
- "TAMBAH USER BARU" button triggers Add User Modal
- Modal fields:
  - Full Name (required)
  - Email (auto-generated or custom)
  - Role selection (admin/mentor/mentee)
  - Generate Password button (auto-generates random password)
- Create user and store in mock database (localStorage)
- Display generated credentials for distribution

**Mock Database Structure:**
```typescript
interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this would be hashed
  role: UserRole;
  status: 'Active' | 'Inactive';
  createdAt: string;
}
```

#### 1.4 Update AuthContext
**File:** `siera-frontend/src/context/AuthContext.tsx`

**Changes:**
- Add `createUser` function for admin user creation
- Store admin-created users in localStorage
- Validate login against admin-created users or allow auto-generated credentials
- Maintain backward compatibility with auto-generated login

---

## 2. Data Model Updates

### 2.1 Task Model Refactoring

**Current Structure:**
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: string;
  status: string; // 'upcoming' | 'pending' | 'accepted' | 'rejected'
}
```

**New Structure:**
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: 'individual' | 'group';
  grade: number; // 0-100 integer
  submittedAt?: string;
  gradedAt?: string;
  gradedBy?: string; // mentor ID
  menteeId?: string;
}
```

### 2.2 Files to Update

#### 2.2.1 Mock Data
**File:** `siera-frontend/src/data/mockData.ts`

**Changes:**
- Update `MOCK_TASKS` with new structure
- Add `grade` field (0-100)
- Remove `status` field
- Add comprehensive mock events
- Add mock user accounts for admin management

**New Mock Events:**
```typescript
export const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'Pembukaan PKKMB-U',
    date: '2026-08-14',
    time: '07:30 - 12:00',
    location: 'Auditorium G.W.J',
    description: 'Upacara pembukaan PKKMB Universitas',
    status: 'scheduled',
    attendees: 4201
  },
  {
    id: 'e2',
    title: 'Talkshow Bela Negara',
    date: '2026-08-14',
    time: '13:00 - 15:30',
    location: 'Selasar Fak. Kedokteran',
    description: 'Sesi talkshow dengan pembicara ahli',
    status: 'scheduled',
    attendees: 4201
  },
  // ... more events
];
```

#### 2.2.2 Task Catalog
**File:** `siera-frontend/src/pages/TaskCatalog.tsx`

**Changes:**
- Update Task interface to use `grade` field
- Change status badges to show grade (0-100)
- Update filter options: 'all', 'pending' (grade === null), 'graded' (grade !== null)
- Display grade instead of status in task cards
- Update submission flow to set grade to null initially

#### 2.2.3 Mentor Tasks
**File:** `siera-frontend/src/pages/MentorTasks.tsx`

**Changes:**
- Remove feedback textarea from validation modal
- Add grade input field (type="number", min="0", max="100")
- Update validation buttons to set grade
- Change status display to show grade value
- Update stats to show average grade

**New Validation Modal UI:**
```typescript
// Grade Input Field
<div className="space-y-2">
  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
    Nilai Tugas (0-100)
  </label>
  <input
    type="number"
    min="0"
    max="100"
    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-2xl font-black text-center focus:ring-2 focus:ring-upn-green outline-none"
    placeholder="0-100"
  />
</div>
```

---

## 3. Admin Dashboard Implementation

### 3.1 Admin Home Overview
**File:** `siera-frontend/src/pages/DashboardPages.tsx` (AdminHome component)

**Enhancements:**
- Use actual mock data from localStorage
- Calculate real statistics:
  - Total registered users (from mock user database)
  - Total tasks submitted (from task submissions)
  - Active mentors count
  - Total events count
- Display activity log from mock data
- Add interactive elements (buttons, links)

### 3.2 User Management CRUD
**File:** `siera-frontend/src/pages/AdminUsers.tsx`

**Features:**

#### Create (Add User)
- Modal with form fields:
  - Name (text input)
  - Email (text input, optional - auto-generated if empty)
  - Role (select: admin/mentor/mentee)
  - Status (select: Active/Inactive)
  - Generate Password button
- Validation: name required, email format
- Store in localStorage `siera_users`
- Display success message with generated credentials

#### Read (List Users)
- Already implemented with mock data
- Update to use localStorage data
- Add real pagination
- Add search functionality (by name/email)
- Add filter by role and status

#### Update (Edit User)
- Modal with pre-filled user data
- Editable fields: name, email, role, status
- Save changes to localStorage
- Update UI immediately

#### Delete (Remove User)
- Confirmation modal
- Remove from localStorage
- Update UI
- Show success notification

**State Management:**
```typescript
const [users, setUsers] = useState<UserAccount[]>([]);
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
```

### 3.3 Event Management Page
**File:** Create new: `siera-frontend/src/pages/AdminEvents.tsx`

**Features:**
- List all events from mock data
- Add new event modal
- Edit event modal
- Delete event functionality
- Event status management (scheduled, ongoing, completed)
- Display event details (date, time, location, attendees)

**Route Addition:**
**File:** `siera-frontend/src/App.tsx`

```typescript
<Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><AdminEvents /></ProtectedRoute>} />
```

---

## 4. Mentor Dashboard Implementation

### 4.1 Mentor Home Overview
**File:** `siera-frontend/src/pages/DashboardPages.tsx` (MentorHome component)

**Enhancements:**
- Use actual mock data from localStorage
- Calculate real statistics:
  - Total mentees assigned
  - Tasks pending validation
  - Average grade of graded tasks
  - Attendance rate (mock)
- Display mentee list preview
- Add action buttons (Download Report, Broadcast Message)

### 4.2 Mentee List Page
**File:** Create new: `siera-frontend/src/pages/MentorGroup.tsx`

**Features:**
- List all mentees in the group
- Display mentee profile information
- Show task completion status
- Show average grade per mentee
- View mentee details modal
- Filter by status (active, inactive)

**Route Addition:**
**File:** `siera-frontend/src/App.tsx`

```typescript
<Route path="/mentor/group" element={<ProtectedRoute allowedRoles={['mentor']}><MentorGroup /></ProtectedRoute>} />
```

### 4.3 Task Validation Interface
**File:** `siera-frontend/src/pages/MentorTasks.tsx`

**Changes:**
- Remove feedback textarea
- Add grade input (0-100)
- Update validation buttons:
  - "Set Grade" button to submit grade
  - Validation to ensure grade is 0-100
- Display grade in mentee list
- Update stats cards to show grade distribution

---

## 5. Mentee Dashboard Implementation

### 5.1 Mentee Home Overview
**File:** `siera-frontend/src/pages/DashboardPages.tsx` (MenteeHome component)

**Enhancements:**
- Use actual mock data from localStorage
- Calculate real statistics:
  - Total tasks completed
  - Average grade
  - Attendance percentage
  - Notifications count
- Display upcoming events
- Show mentor information
- Add quick action buttons

### 5.2 Task Catalog Redesign
**File:** `siera-frontend/src/pages/TaskCatalog.tsx`

**Changes:**
- Update to use grade field
- Display grade instead of status
- Filter options: 'all', 'pending' (not submitted), 'submitted' (awaiting grade), 'graded' (has grade)
- Show grade value in task card
- Update submission flow

### 5.3 Presence Page Redesign
**File:** `siera-frontend/src/pages/PresencePage.tsx`

**Changes:**
- Remove AI face matching references
- Remove geo-fencing references
- Focus on metadata extraction:
  - Location coordinates (mocked)
  - Device information
  - Timestamp
  - Image metadata (EXIF simulation)
- Update warning messages
- Simplify verification process

**New Metadata Display:**
```typescript
const metadata = {
  location: 'UPN "Veteran" Jakarta (6.321°S, 106.791°E)',
  device: 'iPhone 15 Pro • iOS 17.2',
  timestamp: new Date().toISOString(),
  imageMetadata: {
    resolution: '4032x3024',
    fileSize: '2.4 MB',
    format: 'HEIC',
    takenAt: new Date().toISOString()
  }
};
```

### 5.4 Remove Discovery Feature
**Files:**
- `siera-frontend/src/components/Sidebar.tsx` - Remove "Temukan Teman" from mentee menu
- `siera-frontend/src/App.tsx` - Remove /mentee/discovery route
- Keep `siera-frontend/src/pages/DiscoveryPage.tsx` (for potential future use)

---

## 6. Mock Data Structure

### 6.1 Flexible Data Schema

**Users Database:**
```typescript
interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  createdAt: string;
  lastLogin?: string;
}
```

**Tasks Database:**
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: 'individual' | 'group';
  grade: number | null;
  submittedAt?: string;
  gradedAt?: string;
  gradedBy?: string;
  menteeId?: string;
  createdAt: string;
}
```

**Events Database:**
```typescript
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'scheduled' | 'ongoing' | 'completed';
  attendees: number;
  createdAt: string;
}
```

**Attendance Records:**
```typescript
interface Attendance {
  id: string;
  menteeId: string;
  eventId: string;
  timestamp: string;
  location: string;
  deviceInfo: string;
  imageData?: string;
  metadata: {
    resolution: string;
    fileSize: string;
    format: string;
  };
}
```

### 6.2 Data Persistence Strategy

**localStorage Keys:**
- `siera_users` - User accounts database
- `siera_tasks` - Task submissions and grades
- `siera_events` - Event data
- `siera_attendance` - Attendance records
- `siera_user` - Current logged-in user (existing)

**Data Initialization:**
- Check localStorage on app load
- Initialize with mock data if empty
- Maintain backward compatibility

---

## 7. Navigation Fixes

### 7.1 Sidebar Updates
**File:** `siera-frontend/src/components/Sidebar.tsx`

**Changes:**
- Remove "Temukan Teman" from mentee menu
- Ensure all menu items have valid routes
- Add active state highlighting for all routes

### 7.2 Route Updates
**File:** `siera-frontend/src/App.tsx`

**New Routes:**
```typescript
// Admin Events
<Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><AdminEvents /></ProtectedRoute>} />

// Mentor Group
<Route path="/mentor/group" element={<ProtectedRoute allowedRoles={['mentor']}><MentorGroup /></ProtectedRoute>} />
```

**Removed Routes:**
```typescript
// Remove mentee discovery
// <Route path="discovery" element={<ProtectedRoute allowedRoles={['mentee']}><DiscoveryPage /></ProtectedRoute>} />
```

---

## 8. Implementation Priority

### Phase 1: Core Authentication (High Priority)
1. Modify LoginPage with auto-generated credentials
2. Remove RegisterPage and /register route
3. Update AuthContext for user management
4. Create admin user creation modal

### Phase 2: Data Model Updates (High Priority)
1. Update mockData.ts with new structures
2. Refactor Task interface (status → grade)
3. Update TaskCatalog to use grade field
4. Update MentorTasks validation interface

### Phase 3: Admin Dashboard (High Priority)
1. Implement AdminHome with real data
2. Build User Management CRUD
3. Create AdminEvents page
4. Add missing routes

### Phase 4: Mentor Dashboard (Medium Priority)
1. Implement MentorHome with real data
2. Create MentorGroup page
3. Update Task Validation interface

### Phase 5: Mentee Dashboard (Medium Priority)
1. Implement MenteeHome with real data
2. Redesign TaskCatalog
3. Redesign PresencePage
4. Remove Discovery feature

### Phase 6: Testing & Verification (Low Priority)
1. Test all authentication flows
2. Test CRUD operations
3. Test navigation
4. Verify data persistence

---

## 9. Technical Considerations

### 9.1 Zero-Backend Architecture
- All data stored in localStorage
- No external API calls
- Client-side validation only
- Mock data for all features

### 9.2 Flexibility for Future Integration
- Data structures mirror expected backend schemas
- Service layer pattern for easy API integration
- Type-safe interfaces throughout
- Separation of concerns (UI, data, business logic)

### 9.3 Code Quality
- TypeScript for type safety
- Component reusability
- Consistent naming conventions
- Error handling
- Loading states

### 9.4 Performance
- Efficient localStorage operations
- Debounced search inputs
- Lazy loading for large datasets
- Optimized re-renders

---

## 10. Success Criteria

✅ Authentication system allows free role selection with auto-generated credentials
✅ Public registration removed, admin-only user creation implemented
✅ Task model uses grade field (0-100 integer), feedback field removed
✅ Comprehensive mock event data generated
✅ Admin Dashboard Overview implemented with real data
✅ Full CRUD for User Management functional
✅ Event Management navigation fixed
✅ Mentor Dashboard Overview implemented
✅ Mentee List routing fixed
✅ Task Validation interface updated for grading system
✅ Mentee Dashboard Overview implemented
✅ Task Catalog redesigned
✅ Presence feature redesigned (metadata only, no AI/geo-fencing)
✅ Discovery feature removed from navigation
✅ All features work with zero backend dependencies

---

## 11. Next Steps

1. **Review this plan** with stakeholders
2. **Approve implementation approach**
3. **Switch to Code mode** for implementation
4. **Execute implementation** following the priority phases
5. **Test and verify** each feature
6. **Document any deviations** from the plan

---

**Plan Status:** ✅ Ready for Implementation
**Estimated Complexity:** High
**Dependencies:** None (zero-backend architecture)
