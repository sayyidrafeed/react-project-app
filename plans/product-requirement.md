# Product Requirements Document
## SIERA (Sistem Informasi PATRIBERA)

**Version:** 1.0  
**Last Updated:** 2026-01-26  
**Project Team:** Valtrizt, Kayla, Rafee, Rahel, Daffa (PID)  
**Status:** Planning  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Background & Problem Statement](#background--problem-statement)
3. [Product Objectives](#product-objectives)
4. [User Personas](#user-personas)
5. [Feature Scope](#feature-scope)
6. [User Stories](#user-stories)
7. [Non-Functional Requirements](#non-functional-requirements)
8. [Success Metrics](#success-metrics)
9. [Sprint Roadmap](#sprint-roadmap)

---

## Executive Summary

SIERA (Sistem Informasi PATRIBERA) is a web-based centralized information management and Learning Management System (LMS) designed specifically for the PATRIBERA (PKKMB-U) orientation program at UPN "Veteran" Jakarta. The platform addresses the fragmentation of information across multiple third-party platforms by providing a unified ecosystem for new students (Maba), mentors, and administrators to manage orientation activities efficiently.

---

## Background & Problem Statement

### Current Challenges

The implementation of PATRIBERA at UPN "Veteran" Jakarta currently faces significant operational challenges:

1. **Fragmented Information Distribution**
   - Information is scattered across multiple disconnected platforms (Google Drive, Google Forms, LINE groups, Instagram)
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

### Solution Overview

SIERA provides an integrated web platform that consolidates all orientation-related activities into a single, accessible system. The platform enables:

- Centralized information management and distribution
- Digital task assignment, submission, and grading
- Photo-based digital attendance with metadata validation
- Student discovery and networking features
- Real-time progress tracking and reporting

---

## Product Objectives

### Primary Objectives

1. **Information Centralization**
   - Establish a single, authoritative source of truth for all PATRIBERA-related information
   - Ensure consistent and accessible information delivery to all stakeholders
   - Reduce information asymmetry across the orientation ecosystem

2. **Efficient Task Management**
   - Streamline task distribution, monitoring, and collection processes
   - Provide structured digital submission workflows
   - Enable real-time tracking of task completion status

3. **Transparent Attendance System**
   - Implement centralized digital attendance with time validation
   - Leverage photo metadata (EXIF) as supporting verification mechanisms
   - Enable real-time attendance monitoring for administrators and mentors

4. **Student Connectivity**
   - Facilitate student-to-student connections across faculties and majors
   - Enable mentor-student relationship building
   - Support early social integration through shared interests

5. **Early Social Experience**
   - Create natural opportunities for students to build initial connections
   - Match students based on common interests and academic backgrounds
   - Reduce social anxiety during orientation period

6. **Data Accuracy & Integrity**
   - Minimize information errors through structured data entry
   - Ensure all users access current, real-time data
   - Eliminate data redundancy through centralized storage

### Secondary Objectives

- Reduce administrative overhead for orientation committees
- Improve student satisfaction with orientation experience
- Create scalable foundation for future orientation programs
- Establish data-driven decision-making capabilities for program improvement

---

## User Personas

### 1. Vice Project Officer (Administrator)

**Role Description:** The Vice Project Officer serves as the primary administrator responsible for overseeing the entire PATRIBERA orientation program. This role requires comprehensive oversight of all activities, data, and stakeholder management.

**Demographics:**
- Senior student or faculty member
- Previous experience with orientation programs
- Technical proficiency with digital platforms
- Strong organizational and leadership skills

**Goals:**
- Monitor overall program progress and metrics
- Manage all user accounts and permissions
- Distribute official announcements and updates
- Generate reports for university stakeholders
- Ensure smooth operation of all orientation activities

**Pain Points:**
- Difficulty tracking real-time participation across thousands of students
- Manual coordination across multiple platforms is time-consuming
- Lack of consolidated reporting capabilities
- Inability to quickly identify and address issues

**Key Features Needed:**
- Executive dashboard with real-time statistics
- Broadcast announcement system
- Comprehensive user management
- Schedule and event management
- Data export and reporting capabilities
- Attendance validation overview

---

### 2. Mentor

**Role Description:** Mentors are senior students assigned to guide small groups of new students (mentees) through the orientation process. They serve as the primary point of contact and support for their assigned group.

**Demographics:**
- Second-year or higher students
- Previous PATRIBERA participation
- Familiar with university systems and culture
- Strong communication and interpersonal skills

**Goals:**
- Monitor mentee group progress and attendance
- Provide guidance and support to assigned students
- Review and grade submitted tasks
- Identify and assist struggling students
- Maintain communication with mentees

**Pain Points:**
- Difficulty tracking individual mentee progress
- Manual task review and grading is time-consuming
- Lack of visibility into mentee attendance patterns
- Inability to quickly contact mentees for urgent matters

**Key Features Needed:**
- Group-specific dashboard with progress metrics
- Mentee profile access with contact information
- Task verification and grading interface
- Attendance monitoring for assigned group
- Internal group search functionality

---

### 3. Mentee (Mahasiswa Baru)

**Role Description:** Mentees are first-year students participating in the PATRIBERA orientation program. They are new to the university and require guidance, information, and support throughout the orientation period.

**Demographics:**
- Recent high school graduates
- Ages 17-19
- Diverse academic backgrounds and interests
- Varying levels of digital literacy
- Eager to make social connections

**Goals:**
- Complete all orientation requirements successfully
- Understand university systems and expectations
- Connect with peers and mentors
- Access timely information about activities
- Submit tasks and attendance on time

**Pain Points:**
- Confusion about where to find information
- Difficulty tracking multiple deadlines
- Uncertainty about attendance requirements
- Limited opportunities to meet peers
- Anxiety about meeting expectations

**Key Features Needed:**
- Personalized dashboard with progress tracking
- Clear task catalog with deadlines
- Digital attendance submission
- Discovery feature to find peers
- Access to mentor contact information
- Real-time schedule and updates

---

## Feature Scope

### Core Features

#### 1. Authentication & Authorization
- **Description:** Secure login system with role-based access control
- **Users:** All (Admin, Mentor, Mentee)
- **Key Capabilities:**
  - User registration with NIM and email verification
  - Role-based authentication (Admin, Mentor, Mentee)
  - Session management with JWT tokens
  - Password reset functionality

#### 2. Profile Management
- **Description:** Comprehensive user profile system for identity and discovery
- **Users:** All (Admin, Mentor, Mentee)
- **Key Capabilities:**
  - Personal information (name, NIM, faculty, major)
  - Profile photo upload
  - Interests and hobbies
  - Social media links (Instagram, TikTok, LinkedIn)
  - Public/private profile settings

#### 3. Task Management System
- **Description:** End-to-end task lifecycle management
- **Users:** All (Admin, Mentor, Mentee)
- **Key Capabilities:**
  - **Admin:** Create, edit, delete tasks with parameters (title, description, deadline, file types)
  - **Mentor:** Review, download, grade submissions with feedback
  - **Mentee:** View task catalog, upload submissions, view grades and feedback
  - Task status tracking (Pending, Submitted, Accepted, Rejected)
  - Deadline notifications

#### 4. Digital Attendance System
- **Description:** Photo-based attendance with metadata validation
- **Users:** All (Admin, Mentor, Mentee)
- **Key Capabilities:**
  - **Mentee:** Upload attendance photo with unique code
  - **Mentor:** Monitor group attendance status
  - **Admin:** View attendance validation indicators (upload time, EXIF metadata)
  - Attendance history and records
  - Soft validation using EXIF metadata (capture time, device info)
  - Manual review capabilities for flagged attendance

#### 5. Discovery & Networking
- **Description:** Student discovery and connection platform
- **Users:** Mentee (primary), Mentor (view)
- **Key Capabilities:**
  - Search by name, faculty, major, interests
  - Filter by common attributes
  - View public profiles
  - Direct access to social media links
  - Recommendation engine based on similarities

#### 6. Schedule & Event Management
- **Description:** Centralized schedule and announcement system
- **Users:** All (Admin, Mentor, Mentee)
- **Key Capabilities:**
  - **Admin:** Create, edit, publish events and announcements
  - **All:** View daily schedules and event timelines
  - Event status indicators (Upcoming, Ongoing, Completed)
  - Location and time details
  - Push notifications for updates

#### 7. Dashboard & Analytics
- **Description:** Role-specific dashboards with real-time metrics
- **Users:** All (Admin, Mentor, Mentee)
- **Key Capabilities:**
  - **Admin:** Executive statistics (total students, submission rates, attendance percentages)
  - **Mentor:** Group progress overview, pending tasks, attendance status
  - **Mentee:** Personal progress percentage, upcoming events, nearest deadlines

#### 8. User Management
- **Description:** Comprehensive user administration
- **Users:** Admin
- **Key Capabilities:**
  - View all users with search and filters (faculty, major, group)
  - Assign mentors to groups
  - Edit user information
  - Reset user passwords
  - Delete user accounts
  - Track user verification status

#### 9. Data Export & Reporting
- **Description:** Reporting and data export capabilities
- **Users:** Admin
- **Key Capabilities:**
  - Export attendance data to Excel/PDF
  - Export task grades to Excel/PDF
  - Generate summary reports
  - Custom date range filtering

### Feature Matrix

| Feature | Admin | Mentor | Mentee |
|---------|-------|--------|--------|
| Authentication | ✓ | ✓ | ✓ |
| Profile Management | ✓ | ✓ | ✓ |
| Task Creation | ✓ | ✗ | ✗ |
| Task Submission | ✗ | ✗ | ✓ |
| Task Review/Grading | ✗ | ✓ | ✗ |
| Attendance Upload | ✗ | ✗ | ✓ |
| Attendance Monitoring | ✓ | ✓ | ✗ |
| Discovery/Networking | View | View | ✓ |
| Schedule Management | ✓ | View | View |
| Dashboard/Analytics | ✓ | ✓ | ✓ |
| User Management | ✓ | ✗ | ✗ |
| Data Export | ✓ | ✗ | ✗ |

---

## User Stories

### Admin User Stories

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

### Mentor User Stories

| ID | Title | User Story | Priority |
|----|-------|------------|----------|
| M1 | Mentor Authentication | As a mentor, I want to log in to my account so that I only see the list of students in my guidance group | High |
| M2 | Group Progress Dashboard | As a mentor, I want to see a group summary dashboard to know how many students have/have not completed attendance and tasks | High |
| M3 | Mentee Profile Access | As a mentor, I want to access mentee social media links so I can contact them without needing internal chat features | Medium |
| M4 | Attendance Monitoring | As a mentor, I want to check my group's attendance list so I can immediately reprimand students who have not completed attendance | High |
| M5 | Task Verification | As a mentor, I want to view and download files submitted by students to ensure the content is correct (not empty files) | High |
| M6 | Task Feedback & Grading | As a mentor, I want to provide "Accepted" or "Rejected" status on student tasks with brief reasons/comments | High |
| M7 | Internal Group Search | As a mentor, I want to search for student names within my group so I can quickly find data when there are thousands of students in the system | Medium |

### Mentee User Stories

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

## Non-Functional Requirements

### Performance Requirements

- **Response Time:** Page loads should complete within 2 seconds on standard broadband connections
- **Concurrent Users:** System must support at least 5,000 concurrent users during peak orientation periods
- **File Upload:** Support file uploads up to 50MB with progress indicators
- **Search Performance:** Search queries should return results within 1 second

### Security Requirements

- **Authentication:** All users must authenticate before accessing restricted features
- **Authorization:** Role-based access control (RBAC) must be enforced at all levels
- **Data Encryption:** Passwords must be encrypted using industry-standard hashing (bcrypt/argon2)
- **Session Management:** JWT tokens with expiration and refresh mechanisms
- **HTTPS:** All data transmission must use HTTPS/TLS encryption
- **Input Validation:** All user inputs must be validated and sanitized to prevent injection attacks

### Reliability & Availability

- **Uptime:** System should maintain 99.5% availability during critical orientation periods
- **Data Backup:** Automated daily backups with point-in-time recovery capability
- **Error Handling:** Graceful error handling with user-friendly messages
- **Logging:** Comprehensive audit logging for all administrative actions

### Scalability Requirements

- **Database:** Database schema must support horizontal scaling
- **Storage:** Cloud-based storage solution for user uploads (photos, task files)
- **API:** RESTful API design supporting future mobile app development
- **Caching:** Implement caching strategies for frequently accessed data

### Usability Requirements

- **Responsive Design:** Interface must work seamlessly on desktop, tablet, and mobile devices
- **Accessibility:** Comply with WCAG 2.1 AA standards for accessibility
- **Browser Support:** Support modern browsers (Chrome, Firefox, Safari, Edge) with last two versions
- **Language:** Primary interface in Bahasa Indonesia with English support option
- **User Guidance:** Clear onboarding and help documentation for all user types

### Compatibility Requirements

- **Operating Systems:** Windows 10+, macOS 10.14+, iOS 13+, Android 8+
- **Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen Resolutions:** Support 320px to 4K displays with responsive layouts

---

## Success Metrics

### Quantitative Metrics

1. **Adoption Rate**
   - Target: 95% of new students registered within first 3 days
   - Target: 100% of mentors actively using the platform

2. **Engagement Metrics**
   - Average daily active users during orientation period
   - Task submission completion rate (target: 90%)
   - Attendance submission rate (target: 95%)

3. **Efficiency Metrics**
   - Reduction in time spent on manual coordination (target: 60% reduction)
   - Reduction in information-related inquiries (target: 70% reduction)
   - Average task grading time for mentors (target: < 2 minutes per submission)

4. **Technical Metrics**
   - System uptime during critical periods (target: 99.5%)
   - Average page load time (target: < 2 seconds)
   - Error rate (target: < 0.1%)

### Qualitative Metrics

1. **User Satisfaction**
   - Student satisfaction with orientation experience (survey-based)
   - Mentor satisfaction with platform usability
   - Administrator satisfaction with reporting capabilities

2. **Information Quality**
   - Reduction in information confusion among students
   - Consistency of information across all stakeholders
   - Accuracy of data records

3. **Social Integration**
   - Number of student connections made through discovery feature
   - Student confidence in navigating university systems
   - Reduction in social anxiety reported by new students

---

## Sprint Roadmap

### Sprint 1 (January 2026)
**Focus:** Foundation and Core Infrastructure

**Deliverables:**
- Landing page with public information
- User authentication system (registration, login)
- Basic profile setup for all user types
- Admin dashboard with basic statistics
- Database schema implementation
- Backend API foundation

**Key Features:**
- Landing Page (Hero, About, Event Schedule, Login)
- Authentication & Authorization
- Profile Management (basic)
- Executive Dashboard (Admin)

---

### Sprint 2 (January 2026)
**Focus:** Task Management and Attendance

**Deliverables:**
- Task management system (admin creation, mentee submission)
- Digital attendance system with photo upload
- Mentor group dashboard
- Task review and grading interface
- EXIF metadata extraction service

**Key Features:**
- Centralized Task Management (Admin)
- Task Submission (Mentee)
- Task Verification & Grading (Mentor)
- Digital Attendance (upload, validation indicators)
- Group Progress Dashboard (Mentor)

---

### Sprint 3 (February 2026)
**Focus:** Discovery, Networking, and Advanced Features

**Deliverables:**
- Discovery and recommendation engine
- Advanced search and filtering
- Schedule and event management system
- Broadcast announcement system
- Data export and reporting
- User management enhancements

**Key Features:**
- Discovery & Friend Recommendations (Mentee)
- Schedule Management (Admin)
- Broadcast Announcement (Admin)
- User Management (Admin)
- Data Export/Reporting (Admin)
- Internal Group Search (Mentor)

---

### Sprint 4 (February 2026)
**Focus:** Polish, Testing, and Deployment

**Deliverables:**
- UI/UX refinements based on feedback
- Performance optimization
- Security audit and hardening
- Comprehensive testing (unit, integration, E2E)
- Documentation completion
- Production deployment

**Key Activities:**
- Bug fixes and refinements
- Load testing and optimization
- User acceptance testing
- Training materials creation
- Go-live preparation

---

## Appendix

### Glossary

- **PATRIBERA:** Penerimaan Mahasiswa Baru (PKKMB-U) - Orientation program for new students
- **Maba:** Mahasiswa Baru - New student / Freshman
- **Mentee:** Student being mentored (Maba)
- **Mentor:** Senior student assigned to guide Maba
- **SIERA:** Sistem Informasi PATRIBERA - The platform name
- **EXIF:** Exchangeable Image File Format - Metadata embedded in digital photos
- **NIM:** Nomor Induk Mahasiswa - Student ID number
- **JWT:** JSON Web Token - Authentication token format

### References

- UPN "Veteran" Jakarta Orientation Guidelines
- Previous PATRIBERA Implementation Reports
- University IT Security Standards
- Accessibility Guidelines (WCAG 2.1)

---

**Document End**
