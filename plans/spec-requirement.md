# Technical Specification Document
## SIERA (Sistem Informasi PATRIBERA)

**Version:** 1.0  
**Date:** 2026-01-26  
**Project:** Website SIERA - Sistem Informasi PATRIBERA  
**Team:** Valtrizt, Kayla, Rafee, Rahel, Daffa (PID)  
**Status:** Planning  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [User Stories](#5-user-stories)
6. [Database Schema](#6-database-schema)
7. [API Specifications](#7-api-specifications)
8. [UI/UX Specifications](#8-uiux-specifications)
9. [Security Requirements](#9-security-requirements)
10. [Deployment Specifications](#10-deployment-specifications)
11. [Sprint Roadmap](#11-sprint-roadmap)

---

## 1. Executive Summary

### 1.1 Project Overview

SIERA (Sistem Informasi PATRIBERA) is a web-based centralized information management and Learning Management System (LMS) designed specifically for the PATRIBERA (PKKMB-U) orientation program at UPN "Veteran" Jakarta. The platform addresses the fragmentation of information across multiple third-party platforms by providing a unified ecosystem for new students (Maba), mentors, and administrators to manage orientation activities efficiently.

### 1.2 Problem Statement

The current implementation of PATRIBERA at UPN "Veteran" Jakarta faces significant operational challenges:

1. **Fragmented Information Distribution**
   - Information scattered across multiple disconnected platforms (Google Drive, Google Forms, LINE groups, Instagram)
   - Students struggle to locate and retrieve information consistently
   - No single source of truth exists for orientation activities

2. **Data Integrity Risks**
   - Manual data entry increases vulnerability to errors
   - Redundant data across platforms creates inconsistency
   - Lack of real-time data synchronization

3. **Operational Inefficiency**
   - Committees and mentors expend excessive effort distributing updates manually
   - Task distribution and collection require coordination across multiple channels
   - Attendance tracking lacks standardization

4. **Student Confusion**
   - New students experience difficulty navigating multiple platforms
   - Inconsistent information delivery leads to uncertainty
   - Lack of centralized support for student inquiries

### 1.3 Solution Overview

SIERA provides an integrated web platform that consolidates all orientation-related activities into a single, accessible system. The platform enables:

- Centralized information management and distribution
- Digital task assignment, submission, and grading
- Photo-based digital attendance with metadata validation
- Student discovery and networking features
- Real-time progress tracking and reporting

---

## 2. System Architecture

### 2.1 High-Level Architecture

```mermaid
graph TB
    subgraph Frontend Layer
        A[Web Browser<br/>Admin Dashboard]
        B[Web Browser<br/>Mentor Dashboard]
        C[Web Browser<br/>Mentee Dashboard]
        D[Web Browser<br/>Landing Page]
    end

    subgraph Application Layer
        E[Frontend Web App<br/>React/Next.js]
        F[Backend API<br/>Node.js/Express]
        G[Media Processing Service<br/>Image Processing]
    end

    subgraph Data Layer
        H[(Primary Database<br/>PostgreSQL)]
        I[(File Storage<br/>Cloud Storage)]
        J[(Cache<br/>Redis)]
    end

    A --> E
    B --> E
    C --> E
    D --> E
    E --> F
    F --> H
    F --> I
    F --> G
    G --> I
    F --> J
```

### 2.2 Architecture Components

#### 2.2.1 Frontend Web Layer

- **Technology:** React.js / Next.js
- **Target Users:** Admin, Mentor, Mentee, Public
- **Responsibilities:**
  - Render user interfaces for all dashboards
  - Handle user interactions and form submissions
  - Display real-time data and notifications
  - Responsive design for mobile and desktop

#### 2.2.2 Backend API Layer

- **Technology:** Node.js with Express.js
- **Responsibilities:**
  - RESTful API endpoints for all features
  - Authentication and authorization
  - Business logic implementation
  - Database operations
  - File upload handling

#### 2.2.3 Media Processing Service

- **Responsibilities:**
  - Process attendance photo uploads
  - Extract EXIF metadata from images
  - Validate photo timestamps
  - Generate image thumbnails

#### 2.2.4 Data Layer

- **Primary Database:** PostgreSQL
- **File Storage:** Cloud storage (AWS S3 / Cloudinary)
- **Caching:** Redis
- **Responsibilities:**
  - Persistent storage for all data
  - File and image storage
  - Session and cache management

### 2.3 Digital Attendance System Architecture

```mermaid
sequenceDiagram
    participant M as Mentee
    participant F as Frontend
    participant B as Backend API
    participant M as Media Service
    participant S as Storage
    participant D as Database

    M->>F: Upload attendance photo
    F->>B: POST /attendance/upload
    B->>M: Extract EXIF metadata
    M-->>B: Return metadata
    B->>S: Store original photo
    B->>D: Save attendance record
    D-->>B: Confirm save
    B-->>F: Return validation result
    F-->>M: Show validation status
```

**Key Notes:**
- Metadata EXIF (waktu pengambilan foto, device info) digunakan sebagai sinyal pendukung (soft validation)
- Tidak ada penolakan otomatis jika metadata tidak tersedia
- Validasi akhir tetap berada pada admin/mentor melalui indikator visual

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| AUTH-001 | User registration with NIM and email verification | High | Mentee, Mentor |
| AUTH-002 | Role-based authentication (Admin, Mentor, Mentee) | High | All |
| AUTH-003 | Session management with JWT tokens | High | All |
| AUTH-004 | Password reset functionality | Medium | All |
| AUTH-005 | Admin-specific authentication portal | High | Admin |

### 3.2 Profile Management

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| PROFILE-001 | Personal information (name, NIM, faculty, major) | High | All |
| PROFILE-002 | Profile photo upload | High | All |
| PROFILE-003 | Interests and hobbies | Medium | Mentee, Mentor |
| PROFILE-004 | Social media links (Instagram, TikTok, LinkedIn) | Medium | Mentee, Mentor |
| PROFILE-005 | Public/private profile settings | Medium | Mentee |
| PROFILE-006 | Admin profile management | High | Admin |

### 3.3 Task Management System

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| TASK-001 | Create tasks with parameters (title, description, deadline, file types) | High | Admin |
| TASK-002 | Edit tasks | Medium | Admin |
| TASK-003 | Delete tasks | Medium | Admin |
| TASK-004 | View task catalog with deadlines | High | Mentee |
| TASK-005 | Upload task submissions | High | Mentee |
| TASK-006 | Download submitted files | High | Mentor |
| TASK-007 | Grade submissions with feedback | High | Mentor |
| TASK-008 | Task status tracking (Pending, Submitted, Accepted, Rejected) | High | All |
| TASK-009 | Deadline notifications | Medium | Mentee |

### 3.4 Digital Attendance System

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| ATTEND-001 | Upload attendance photo with unique code | High | Mentee |
| ATTEND-002 | EXIF metadata extraction and validation | Medium | System |
| ATTEND-003 | Monitor group attendance status | High | Mentor |
| ATTEND-004 | View attendance validation indicators | Medium | Admin |
| ATTEND-005 | Attendance history and records | Medium | All |
| ATTEND-006 | Manual review capabilities for flagged attendance | Medium | Admin, Mentor |

### 3.5 Discovery & Networking

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| DISCOV-001 | Search by name, faculty, major, interests | Medium | Mentee |
| DISCOV-002 | Filter by common attributes | Medium | Mentee |
| DISCOV-003 | View public profiles | Medium | Mentee, Mentor |
| DISCOV-004 | Direct access to social media links | Medium | Mentee, Mentor |
| DISCOV-005 | Recommendation engine based on similarities | Low | Mentee |

### 3.6 Schedule & Event Management

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| EVENT-001 | Create, edit, publish events and announcements | High | Admin |
| EVENT-002 | View daily schedules and event timelines | High | All |
| EVENT-003 | Event status indicators (Upcoming, Ongoing, Completed) | Medium | All |
| EVENT-004 | Location and time details | Medium | All |
| EVENT-005 | Push notifications for updates | Low | All |

### 3.7 Dashboard & Analytics

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| DASH-001 | Executive statistics (total students, submission rates, attendance %) | High | Admin |
| DASH-002 | Group progress overview, pending tasks, attendance status | High | Mentor |
| DASH-003 | Personal progress percentage, upcoming events, nearest deadlines | Medium | Mentee |

### 3.8 User Management

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| USER-001 | View all users with search and filters (faculty, major, group) | High | Admin |
| USER-002 | Assign mentors to groups | High | Admin |
| USER-003 | Edit user information | Medium | Admin |
| USER-004 | Reset user passwords | Medium | Admin |
| USER-005 | Delete user accounts | Medium | Admin |
| USER-006 | Track user verification status | Medium | Admin |

### 3.9 Data Export & Reporting

| Requirement ID | Description | Priority | User Role |
|----------------|-------------|----------|-----------|
| REPORT-001 | Export attendance data to Excel/PDF | Medium | Admin |
| REPORT-002 | Export task grades to Excel/PDF | Medium | Admin |
| REPORT-003 | Generate summary reports | Medium | Admin |
| REPORT-004 | Custom date range filtering | Low | Admin |

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

| Metric | Requirement | Target |
|--------|-------------|--------|
| Page Load Time | Complete within 2 seconds | Standard broadband |
| Concurrent Users | Support at least 5,000 concurrent users | Peak orientation periods |
| File Upload | Support file uploads up to 50MB | With progress indicators |
| Search Performance | Return results within 1 second | All search queries |

### 4.2 Security Requirements

| Requirement | Description |
|-------------|-------------|
| Authentication | All users must authenticate before accessing restricted features |
| Authorization | Role-based access control (RBAC) must be enforced at all levels |
| Data Encryption | Passwords must be encrypted using bcrypt/argon2 |
| Session Management | JWT tokens with expiration and refresh mechanisms |
| HTTPS | All data transmission must use HTTPS/TLS encryption |
| Input Validation | All user inputs must be validated and sanitized to prevent injection attacks |

### 4.3 Reliability & Availability

| Metric | Requirement | Target |
|--------|-------------|--------|
| Uptime | System should maintain 99.5% availability | Critical orientation periods |
| Data Backup | Automated daily backups | Point-in-time recovery |
| Error Handling | Graceful error handling | User-friendly messages |
| Logging | Comprehensive audit logging | All administrative actions |

### 4.4 Scalability Requirements

| Requirement | Description |
|-------------|-------------|
| Database | Schema must support horizontal scaling |
| Storage | Cloud-based storage solution for user uploads |
| API | RESTful API design supporting future mobile app development |
| Caching | Implement caching strategies for frequently accessed data |

### 4.5 Usability Requirements

| Requirement | Description |
|-------------|-------------|
| Responsive Design | Interface must work seamlessly on desktop, tablet, and mobile devices |
| Accessibility | Comply with WCAG 2.1 AA standards |
| Browser Support | Support modern browsers (Chrome, Firefox, Safari, Edge) with last two versions |
| Language | Primary interface in Bahasa Indonesia with English support option |
| User Guidance | Clear onboarding and help documentation for all user types |

### 4.6 Compatibility Requirements

| Category | Requirement |
|----------|-------------|
| Operating Systems | Windows 10+, macOS 10.14+, iOS 13+, Android 8+ |
| Browsers | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Screen Resolutions | Support 320px to 4K displays with responsive layouts |

---

## 5. User Stories

### 5.1 Admin User Stories

| ID | Title | User Story | Priority |
|----|-------|------------|----------|
| A1 | Admin Authentication | As an admin, I want to log in using my admin account so that I can access sensitive data and manage the platform | High |
| A2 | Executive Dashboard | As an admin, I want to see summary statistics (active students, average task submission, attendance %) on the main page | High |
| A3 | Broadcast Announcement | As an admin, I want to create and publish official announcements so that all students and mentors receive uniform information | High |
| A4 | Schedule Management | As an admin, I want to upload daily activity schedules so that new students know the event sequence they must follow | Medium |
| A5 | Centralized Task Management | As an admin, I want to set task parameters (title, description, deadline, file type) so that the orientation process is standardized across all groups | High |
| A6 | User Database Overview | As an admin, I want to monitor the list of all new students by admission path (Mandiri, SNBP, etc.) to ensure no data is missed | Medium |
| A7 | Data Export/Reporting | As an admin, I want to export attendance and task grade data to Excel or PDF format to facilitate final reporting to the university | Medium |
| A8 | Mentor Management | As an admin, I want to manage mentor accounts (add/remove) and assign them to specific groups | High |
| A9 | Attendance Validation Overview | As an admin, I want to view attendance validation indicators (upload time and photo metadata) so I can identify attendance that needs further review | Medium |

### 5.2 Mentor User Stories

| ID | Title | User Story | Priority |
|----|-------|------------|----------|
| M1 | Mentor Authentication | As a mentor, I want to log in to my account so that I only see the list of students in my guidance group | High |
| M2 | Group Progress Dashboard | As a mentor, I want to see a group summary dashboard to know how many students have/have not completed attendance and tasks | High |
| M3 | Mentee Profile Access | As a mentor, I want to access mentee social media links so I can contact them without needing internal chat features | Medium |
| M4 | Attendance Monitoring | As a mentor, I want to check my group's attendance list so I can immediately reprimand students who have not completed attendance | High |
| M5 | Task Verification | As a mentor, I want to view and download files submitted by students to ensure the content is correct (not empty files) | High |
| M6 | Task Feedback & Grading | As a mentor, I want to provide "Accepted" or "Rejected" status on student tasks with brief reasons/comments | High |
| M7 | Internal Group Search | As a mentor, I want to search for student names within my group so I can quickly find data when there are thousands of students in the system | Medium |

### 5.3 Mentee User Stories

| ID | Title | User Story | Priority |
|----|-------|------------|----------|
| S1 | User Registration & Login | As a new student, I want to register an account using NIM and email so I can officially enter the SIERA system | High |
| S2 | Set Up Profile (FSP) | As a new student, I want to fill in personal data, photo, hobbies, and social media so my profile can be recognized by mentors and peers | High |
| S3 | Event Schedule View | As a new student, I want to view daily activity schedules so I don't miss the PATRIBERA event sequence | High |
| S4 | Discovery & Friend Recommendations | As a new student, I want to see friend recommendations with similar interests or majors so I can get acquainted more easily and I want to open friends' social media directly from their profiles so I can interact on platforms I already use | Medium |
| S5 | Task Catalog | As a new student, I want to see a list of tasks with their deadlines so I can prioritize work | High |
| S6 | Task Submission | As a new student, I want to upload task files directly on the SIERA platform without needing to open external Google Drive | High |
| S7 | Digital Attendance | As a new student, I want to fill in attendance using a unique code provided by the committee at the event location | High |
| S8 | Progress Tracking | As a new student, I want to see my overall orientation progress (e.g., "80% Complete") so I feel motivated to complete everything | Medium |

---

## 6. Database Schema

### 6.1 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ GROUPS : belongs_to
    USERS ||--o{ TASKS : creates
    USERS ||--o{ TASK_SUBMISSIONS : submits
    USERS ||--o{ ATTENDANCE : records
    GROUPS ||--o{ TASKS : assigned_to
    GROUPS ||--o{ TASK_SUBMISSIONS : receives
    GROUPS ||--o{ ATTENDANCE : tracks
    EVENTS ||--o{ ATTENDANCE : associated_with
    
    USERS {
        uuid id PK
        string email UK
        string nim UK
        string password_hash
        string full_name
        string faculty
        string major
        string role
        string profile_photo_url
        text bio
        array interests
        json social_links
        uuid group_id FK
        boolean is_public_profile
        timestamp created_at
        timestamp updated_at
    }
    
    GROUPS {
        uuid id PK
        string name
        uuid mentor_id FK
        string department
        timestamp created_at
    }
    
    TASKS {
        uuid id PK
        string title
        text description
        timestamp deadline
        array allowed_file_types
        uuid group_id FK
        string task_type
        timestamp created_at
    }
    
    TASK_SUBMISSIONS {
        uuid id PK
        uuid task_id FK
        uuid user_id FK
        string file_url
        string status
        text feedback
        timestamp submitted_at
    }
    
    ATTENDANCE {
        uuid id PK
        uuid user_id FK
        uuid event_id FK
        string photo_url
        json exif_metadata
        string unique_code
        string status
        timestamp uploaded_at
    }
    
    EVENTS {
        uuid id PK
        string title
        text description
        timestamp start_time
        timestamp end_time
        string location
        string status
        timestamp created_at
    }
}
```

### 6.2 Detailed Schema Specifications

#### 6.2.1 Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| nim | VARCHAR(50) | UNIQUE, NOT NULL | Student ID number |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| full_name | VARCHAR(255) | NOT NULL | User's full name |
| faculty | VARCHAR(100) | | Faculty/department |
| major | VARCHAR(100) | | Study program/major |
| role | ENUM | NOT NULL | User role (admin, mentor, mentee) |
| profile_photo_url | VARCHAR(500) | | URL to profile photo |
| bio | TEXT | | User biography |
| interests | JSON | | Array of interest tags |
| social_links | JSON | | Social media links object |
| group_id | UUID | FK | Reference to groups table |
| is_public_profile | BOOLEAN | DEFAULT true | Profile visibility setting |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

#### 6.2.2 Groups Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique group identifier |
| name | VARCHAR(100) | NOT NULL | Group name |
| mentor_id | UUID | FK | Reference to users table |
| department | VARCHAR(100) | | Associated department |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |

#### 6.2.3 Tasks Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique task identifier |
| title | VARCHAR(255) | NOT NULL | Task title |
| description | TEXT | | Detailed task description |
| deadline | TIMESTAMP | NOT NULL | Submission deadline |
| allowed_file_types | JSON | | Array of allowed file extensions |
| group_id | UUID | FK | Reference to groups table |
| task_type | ENUM | NOT NULL | Type (individual, group) |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |

#### 6.2.4 Task Submissions Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique submission identifier |
| task_id | UUID | FK | Reference to tasks table |
| user_id | UUID | FK | Reference to users table |
| file_url | VARCHAR(500) | NOT NULL | URL to submitted file |
| status | ENUM | DEFAULT 'pending' | Submission status |
| feedback | TEXT | | Mentor feedback/comment |
| submitted_at | TIMESTAMP | DEFAULT NOW() | Submission timestamp |

#### 6.2.5 Attendance Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique attendance record ID |
| user_id | UUID | FK | Reference to users table |
| event_id | UUID | FK | Reference to events table |
| photo_url | VARCHAR(500) | NOT NULL | URL to attendance photo |
| exif_metadata | JSON | | EXIF data from photo |
| unique_code | VARCHAR(50) | | Event-specific attendance code |
| status | ENUM | DEFAULT 'pending' | Verification status |
| uploaded_at | TIMESTAMP | DEFAULT NOW() | Upload timestamp |

#### 6.2.6 Events Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique event identifier |
| title | VARCHAR(255) | NOT NULL | Event title |
| description | TEXT | | Event description |
| start_time | TIMESTAMP | NOT NULL | Event start time |
| end_time | TIMESTAMP | | Event end time |
| location | VARCHAR(255) | | Event location |
| status | ENUM | NOT NULL | Event status |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |

---

## 7. API Specifications

### 7.1 Authentication API

#### POST /api/auth/register
**Purpose:** Register a new user

**Request Body:**
```json
{
  "nim": "string",
  "email": "string",
  "full_name": "string",
  "faculty": "string",
  "major": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user_id": "uuid",
    "email": "string"
  }
}
```

#### POST /api/auth/login
**Purpose:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "identifier": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "string",
      "role": "string",
      "full_name": "string"
    }
  }
}
```

#### POST /api/auth/refresh
**Purpose:** Refresh JWT token

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token"
  }
}
```

### 7.2 Profile API

#### GET /api/users/profile
**Purpose:** Get current user's profile

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "string",
    "email": "string",
    "nim": "string",
    "faculty": "string",
    "major": "string",
    "profile_photo_url": "string",
    "bio": "string",
    "interests": ["string"],
    "social_links": {
      "instagram": "string",
      "tiktok": "string",
      "linkedin": "string"
    },
    "group": {
      "id": "uuid",
      "name": "string"
    }
  }
}
```

#### PUT /api/users/profile
**Purpose:** Update user profile

**Headers:** Authorization: Bearer {token}

**Request Body:**
```json
{
  "full_name": "string",
  "bio": "string",
  "interests": ["string"],
  "social_links": {
    "instagram": "string",
    "tiktok": "string",
    "linkedin": "string"
  },
  "is_public_profile": true
}
```

### 7.3 Task API

#### GET /api/tasks
**Purpose:** Get list of tasks

**Headers:** Authorization: Bearer {token}

**Query Parameters:**
- status (optional): Filter by status
- page (optional): Page number
- limit (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "deadline": "timestamp",
      "task_type": "string",
      "status": "string",
      "allowed_file_types": ["string"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

#### POST /api/tasks
**Purpose:** Create a new task (Admin only)

**Headers:** Authorization: Bearer {token}

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "deadline": "timestamp",
  "group_id": "uuid",
  "task_type": "individual",
  "allowed_file_types": ["pdf", "docx", "jpg"]
}
```

#### POST /api/tasks/:id/submissions
**Purpose:** Submit a task

**Headers:** Authorization: Bearer {token}

**Content-Type:** multipart/form-data

**Request:** File upload with task_id and user_id

**Response:**
```json
{
  "success": true,
  "message": "Submission successful",
  "data": {
    "submission_id": "uuid",
    "file_url": "string",
    "submitted_at": "timestamp"
  }
}
```

### 7.4 Attendance API

#### POST /api/attendance
**Purpose:** Submit attendance with photo

**Headers:** Authorization: Bearer {token}

**Content-Type:** multipart/form-data

**Request:** Photo file with unique_code

**Response:**
```json
{
  "success": true,
  "message": "Attendance submitted",
  "data": {
    "attendance_id": "uuid",
    "photo_url": "string",
    "exif_metadata": {
      "capture_time": "timestamp",
      "device_model": "string"
    },
    "status": "pending"
  }
}
```

#### GET /api/attendance
**Purpose:** Get attendance records

**Headers:** Authorization: Bearer {token}

**Query Parameters:**
- event_id (optional): Filter by event
- status (optional): Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "user_id": "uuid",
      "photo_url": "string",
      "exif_metadata": {},
      "status": "verified",
      "uploaded_at": "timestamp"
    }
  ]
}
```

### 7.5 Discovery API

#### GET /api/discovery
**Purpose:** Search and discover other users

**Headers:** Authorization: Bearer {token}

**Query Parameters:**
- search (optional): Search query
- faculty (optional): Filter by faculty
- major (optional): Filter by major
- interests (optional): Filter by interests

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "full_name": "string",
      "faculty": "string",
      "major": "string",
      "profile_photo_url": "string",
      "interests": ["string"]
    }
  ]
}
```

### 7.6 Events API

#### GET /api/events
**Purpose:** Get list of events

**Headers:** Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "start_time": "timestamp",
      "end_time": "timestamp",
      "location": "string",
      "status": "upcoming"
    }
  ]
}
```

#### POST /api/events
**Purpose:** Create a new event (Admin only)

**Headers:** Authorization: Bearer {token}

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "start_time": "timestamp",
  "end_time": "timestamp",
  "location": "string",
  "status": "published"
}
```

---

## 8. UI/UX Specifications

### 8.1 Landing Page

| Section | Components | Data Fields |
|---------|------------|-------------|
| Navigation Bar | Logo, Menu Links (Home, Event), CTA Button (Masuk) | logo_image, nav_items, login_url |
| Hero Section | Headline, Sub-headline, Primary CTA, Secondary CTA, Illustration | hero_title, hero_subtitle, hero_image, cta_primary_link, cta_secondary_link |
| About Section | Title, Description, Feature List, Visual Asset | about_title, about_description, feature_list, visual_asset |
| Event Section | Event Cards/List, Status Indicators | event_name, event_date, event_status, event_location |
| Login Section | Login Form (Identifier, Password, Forgot Password) | input_identifier, input_password, forgot_password_link |
| Footer | Copyright, Social Media Links, Contact Info | social_media_links, copyright_text, contact_info |

**Important Notes:**
- Responsive Design: Hero and Event sections must adjust for mobile (stack vertically)
- Auth Flow: "Masuk" button in Navbar and Hero directs to same Login component
- For Sprint 1, content data can be hardcoded in Frontend, but data structure should support dynamic content

### 8.2 Admin Dashboard

| Page | Components | Data Fields |
|------|------------|-------------|
| Authentication | Email/Username, Password (encrypted), Auth Token | email, password, auth_token |
| Home/Dashboard | Statistics Cards (Total Maba, Submission Rate, Attendance Today), Active Event Widget | stats_total_maba, stats_submission_rate, stats_attendance_today, current_active_event |
| User Management | User Table (Search, Filter), Group Assignment, Action Buttons (Edit, Reset Password, Delete) | user_list, user_detail, group_assignment, verification_status |
| Event Management | CRUD Event Form, Event Details (Title, Description, Time, Location, Status) | task_title, task_instruction, deadline, allowed_file_types, submission_status |
| Profile | Edit Profile, Change Password, Logout | admin_name, admin_email, current_password, new_password, role_access_level |

**Important Notes:**
- Role-Based Access Control (RBAC): Admin can only access features per division (e.g., Event Division only access Event & Task)
- Data Export: User Management & Task Management must have "Export to Excel" button

### 8.3 Mentor Dashboard

| Page | Components | Data Fields |
|------|------------|-------------|
| Authentication | Email/Username, Password (encrypted), Auth Token | email, password, auth_token |
| Home/Dashboard | Group Info, Quick Stats (Attendance Rate, Pending Tasks), Active Event Widget | stats_total_maba, stats_submission_rate, stats_attendance_today, current_active_event |
| My Group | Mentee List (Name, NIM, Major), Contact Info (Social Media), Attendance Monitor | mentee_list, mentee_profile, social_media_links, attendance_status_daily |
| Task Grading | Submission List (Filter by Status), Validation Actions, Grading Form | task_title, submission_file_url, submission_grade, feedback_comment, submission_status |
| Event | Timeline (Daily Schedule), Briefing Notes | admin_name, admin_email, current_password, new_password, role_access_level |
| Profile | Personal Info (Biodata, Photo, Social Media), Security (Change Password) | mentor_bio, mentor_contacts, profile_picture, change_password_fields |

**Important Notes:**
- Data Isolation: Backend query only returns mentee data with same group_id as logged-in mentor

### 8.4 Mentee Dashboard

| Page | Components | Data Fields |
|------|------------|-------------|
| Authentication | Email/Username, Password (encrypted), Auth Token | email, password, auth_token |
| Home/Dashboard | Welcome Widget, Group Name, Progress Bar, Next Agenda Card, Task Reminder List | mentee_name, group_name, overall_progress_percentage, upcoming_event, nearest_deadline_tasks |
| Profile | Personal Info (Biodata, Jurusan, Interests), Social Media Links, Account (Change Password) | bio_description, interests, social_links, profile_picture |
| Discovery | Search & Filter, Friend Profile View | search_query, filter_faculty, filter_interest, public_mentee_list, friend_detail_view |
| Task Submission | Task Catalog (Individual & Group), Detail & Upload Form, Feedback View | task_list, task_instruction, file_upload, grade_feedback |
| Presence Submission | Upload Evidence (Photo), History (Attendance Status) | presence_photo, upload_timestamp, geolocation, presence_status |
| Event | Rundown View (Daily Schedule), Event Location | daily_schedule, event_location |

**Important Notes:**
- Presence Validation: System extracts EXIF metadata from uploaded photo for time validation (backend processing)
- Discovery Privacy: Only user-authorized data (Public Profile) appears in Discovery menu

### 8.5 Design System

#### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | #1E88E5 | Main buttons, links, accents |
| Secondary | #43A047 | Success states, confirmations |
| Warning | #FB8C00 | Warning states, pending items |
| Error | #E53935 | Error states, rejections |
| Background | #F5F5F5 | Page backgrounds |
| Surface | #FFFFFF | Card backgrounds, modals |
| Text Primary | #212121 | Main text |
| Text Secondary | #757575 | Secondary text |

#### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headings | Inter / Roboto | 24-48px | 600-700 |
| Body Text | Inter / Roboto | 14-16px | 400-500 |
| Captions | Inter / Roboto | 12px | 400 |
| Buttons | Inter / Roboto | 14-16px | 600 |

#### Spacing System
| Scale | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Small components |
| md | 16px | Standard padding |
| lg | 24px | Section spacing |
| xl | 32px | Page margins |
| 2xl | 48px | Hero sections |

#### Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| xs | 0-575px | Mobile portrait |
| sm | 576-767px | Mobile landscape |
| md | 768-991px | Tablet portrait |
| lg | 992-1199px | Tablet landscape / Small desktop |
| xl | 1200px+ | Desktop |

---

## 9. Security Requirements

### 9.1 Authentication Security

| Requirement | Implementation |
|-------------|----------------|
| Password Hashing | Use bcrypt with salt rounds ≥ 10 |
| Session Tokens | JWT with 24-hour expiration |
| Token Refresh | Refresh token mechanism with 7-day validity |
| Login Protection | Rate limiting (max 5 attempts per 15 minutes) |
| Password Requirements | Minimum 8 characters, mixed case, numbers |

### 9.2 Authorization Matrix

| Feature | Admin | Mentor | Mentee |
|---------|-------|--------|--------|
| Authentication | ✓ | ✓ | ✓ |
| Profile Management | ✓ (all users) | ✓ (own + group) | ✓ (own) |
| Task Creation | ✓ | ✗ | ✗ |
| Task Submission | ✗ | ✗ | ✓ |
| Task Grading | ✗ | ✓ (group only) | ✗ |
| Attendance Upload | ✗ | ✗ | ✓ |
| Attendance View | ✓ (all) | ✓ (group only) | ✓ (own) |
| Discovery | View | View | ✓ |
| Schedule Management | ✓ | View | View |
| User Management | ✓ | ✗ | ✗ |
| Data Export | ✓ | ✗ | ✗ |

### 9.3 Data Protection

| Requirement | Implementation |
|-------------|----------------|
| Data in Transit | HTTPS/TLS 1.3 |
| Data at Rest | Encrypted database storage |
| File Storage | Signed URLs with expiration |
| API Security | CORS, Helmet, Rate limiting |
| SQL Injection Prevention | Parameterized queries |
| XSS Prevention | Input sanitization, CSP |
| CSRF Protection | Anti-CSRF tokens |

### 9.4 Audit Logging

| Event Type | Logged Data |
|------------|-------------|
| Authentication | User ID, timestamp, IP, action (login/logout) |
| Data Modifications | User ID, timestamp, affected resource, changes |
| Administrative Actions | User ID, timestamp, action, target |
| Errors | Timestamp, error type, stack trace, user context |

---

## 10. Deployment Specifications

### 10.1 Infrastructure Requirements

| Component | Specification |
|-----------|---------------|
| Application Server | Node.js 18+ LTS |
| Database | PostgreSQL 14+ |
| Cache | Redis 7+ |
| File Storage | AWS S3 or Cloudinary |
| Reverse Proxy | Nginx or Caddy |
| Process Manager | PM2 or Docker |

### 10.2 Environment Configuration

```yaml
# Production Environment Variables
NODE_ENV: production
PORT: 3000
DATABASE_URL: postgresql://user:pass@host:5432/siera
REDIS_URL: redis://user:pass@host:6379
JWT_SECRET: ${JWT_SECRET_KEY}
JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET_KEY}
AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
AWS_S3_BUCKET: siera-uploads
CORS_ORIGIN: https://siera.upnvj.ac.id
```

### 10.3 Backup Strategy

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Database (Full) | Daily at 00:00 UTC | 30 days |
| Database (WAL) | Continuous | 7 days |
| File Storage | Daily incremental | 30 days |
| Configuration | On change | Unlimited |


### 10.4 Scalability Strategy

| Layer | Strategy |
|-------|----------|
| Application | Horizontal scaling with load balancer |
| Database | Read replicas, connection pooling |
| Cache | Redis cluster with replication |
| Storage | S3 with CDN (CloudFront) |

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| PATRIBERA | Penerimaan Mahasiswa Baru (PKKMB-U) - Orientation program for new students |
| Maba | Mahasiswa Baru - New student / Freshman |
| Mentee | Student being mentored (Maba) |
| Mentor | Senior student assigned to guide Maba |
| SIERA | Sistem Informasi PATRIBERA - The platform name |
| EXIF | Exchangeable Image File Format - Metadata embedded in digital photos |
| NIM | Nomor Induk Mahasiswa - Student ID number |
| JWT | JSON Web Token - Authentication token format |
| RBAC | Role-Based Access Control - Security model for access management |
| LMS | Learning Management System - Educational software platform |

### B. Success Metrics

#### Quantitative Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Registration Rate | 95% within first 3 days | Count of registered users |
| Active Mentor Usage | 100% | Mentor login frequency |
| Task Completion | 90% | Submitted vs assigned tasks |
| Attendance Rate | 95% | Attendance submissions vs expected |
| System Uptime | 99.5% | Monitoring tool availability |
| Page Load Time | < 2 seconds | Performance monitoring |
| Error Rate | < 0.1% | Error logging frequency |

#### Qualitative Metrics

| Metric | Measurement Method |
|--------|-------------------|
| User Satisfaction | Survey-based feedback |
| Information Quality | User error reports |
| Social Integration | Discovery feature usage |

### C. References

- UPN "Veteran" Jakarta Orientation Guidelines
- Previous PATRIBERA Implementation Reports
- University IT Security Standards
- Accessibility Guidelines (WCAG 2.1)
- OWASP Security Best Practices

---

**Document End**

**Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-26 | PID Team | Initial specification document |

---

© 2026 Veterantecht | All rights reserved
