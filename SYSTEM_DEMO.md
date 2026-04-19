# EduGuard MVP System Documentation

**Live Application:** [https://edu-guard-ruddy.vercel.app/](https://edu-guard-ruddy.vercel.app/)

**Version:** 1.0.0  
**Date:** March 8, 2026  
**Technology Stack:** Next.js 14, TypeScript, Neon Postgres, Tailwind CSS

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Core Features](#core-features)
4. [User Roles and Access](#user-roles-and-access)
5. [Feature Demonstrations](#feature-demonstrations)
6. [Database Schema](#database-schema)
7. [Security and Authentication](#security-and-authentication)
8. [Testing Credentials](#testing-credentials)

---

## Executive Summary

EduGuard is a comprehensive digital literacy and misinformation detection platform designed for elementary through high school students. The MVP implements four core features: AI-Adaptive Learning, Misinformation Detection, Educational Modules, and Student Progress Dashboard. The platform uses role-based access control to serve students, educators, and administrators with tailored experiences.

### Key Achievements

- Full-stack web application with responsive mobile-first design
- Real-time database integration with Neon Serverless Postgres
- Role-based authentication system with three distinct user types
- AI-powered content credibility analysis
- Interactive learning modules with progress tracking
- Comprehensive analytics dashboard

---

## System Architecture

### Technology Stack

**Frontend:**

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for responsive styling
- React Context API for state management
- Lucide React for iconography
- Recharts for data visualization

**Backend:**

- Next.js API Routes
- Neon Serverless Postgres database
- RESTful API architecture
- Foreign key constraints for data integrity

**Deployment:**

- Vercel hosting platform
- Continuous deployment via GitHub integration
- Environment variable management for secure credentials

### Database Structure

The application uses five primary tables:

1. **students** - User accounts and profiles
2. **learning_progress** - Subject-wise learning metrics
3. **quiz_results** - Assessment scores and attempts
4. **digital_literacy_modules** - Educational content and completion tracking
5. **misinformation_checks** - Content verification history

---

## Core Features

### 1. AI-Adaptive Learning System

**Description:**  
Personalized learning experience that adjusts difficulty based on student performance and provides intelligent module recommendations.

**Key Capabilities:**

- Dynamic difficulty adjustment based on quiz performance
- Subject-specific progress tracking (Science, Math, English, History)
- AI-powered learning path recommendations
- Performance analytics with trend visualization

**Implementation:**

- Real-time progress calculation from quiz results
- Adaptive algorithm considers accuracy and attempt count
- Personalized dashboard showing current performance levels

### 2. Misinformation Detection Engine

**Description:**  
AI-powered tool that analyzes online content and URLs for credibility indicators, helping students identify reliable information sources.

**Key Capabilities:**

- URL credibility analysis with domain reputation scoring
- Content flag detection (missing sources, suspicious patterns)
- Credibility score calculation (0-100 scale)
- Historical verification records stored in database

**Analysis Criteria:**

- Domain authority (.edu, .gov domains receive higher scores)
- Secure connection verification (HTTPS requirement)
- Content structure analysis
- Source attribution checking
- Date and publication information validation

**Access:** [https://edu-guard-ruddy.vercel.app/verify](https://edu-guard-ruddy.vercel.app/verify)

### 3. Digital Literacy Modules

**Description:**  
Interactive educational modules created and verified by educators, covering essential digital literacy skills.

**Available Modules:**

1. **Evaluating Online Sources** - Learn to assess website credibility and author expertise
2. **Fact-Checking Techniques** - Master cross-referencing and verification methods
3. **Spotting AI-Generated Content** - Identify patterns in synthetic media

**Features:**

- Educator-verified curriculum
- Progress tracking per module
- Interactive quizzes with immediate feedback
- Completion status monitoring

**Access:** [https://edu-guard-ruddy.vercel.app/modules](https://edu-guard-ruddy.vercel.app/modules)

### 4. Student Progress Dashboard

**Description:**  
Comprehensive analytics dashboard providing real-time insights into learning progress, quiz performance, and module completion.

**Metrics Displayed:**

- Overall progress percentage across all subjects
- Modules completed count
- Average quiz score with trend analysis
- Subject-specific performance breakdown
- Interactive line charts showing progress over time
- Quiz attempt history with detailed results

**Data Visualization:**

- Progress trend graphs using Recharts library
- Color-coded performance indicators
- Subject-wise progress cards
- Recent quiz results table

**Access:** [https://edu-guard-ruddy.vercel.app/dashboard](https://edu-guard-ruddy.vercel.app/dashboard)

---

## User Roles and Access

### Student Role

**Primary Functions:**

- Complete learning modules and quizzes
- Verify online content for misinformation
- Track personal progress and performance
- Access AI-powered learning recommendations

**Dashboard Access:**

- Personal progress metrics
- Quiz history and scores
- Module completion status
- Performance trends over time

### Educator Role

**Primary Functions:**

- Create and manage educational modules
- Monitor student progress across classes
- Verify and approve learning materials
- Access aggregated student analytics

**Dashboard Features:**

- Class-wide performance overview
- Module effectiveness analytics
- Student engagement metrics
- Content management tools

### Administrator Role

**Primary Functions:**

- System-wide user management
- Platform configuration and settings
- Access to all educator and student data
- Database administration capabilities

**Dashboard Features:**

- Comprehensive system analytics
- User account management
- Platform usage statistics
- System health monitoring

---

## Feature Demonstrations

### Registration and Authentication

**New User Registration:**

1. Navigate to [https://edu-guard-ruddy.vercel.app/signup](https://edu-guard-ruddy.vercel.app/signup)
2. Enter full name, email, and password
3. Select role (Student, Educator, or Admin)
4. For students: select grade level and academic interests
5. System creates account in database with encrypted credentials
6. Automatic redirect to personalized dashboard

**Interest Selection (Students):**

- Grade levels: Elementary, Middle School, High School
- Interest categories provided via autocomplete
- Supports multiple interest selection

### Personalized Homepage

**For Authenticated Users:**

- Personalized greeting: "Welcome back, [Name]!"
- Quick access to Dashboard
- Feature overview cards
- Direct navigation to all core features

**For Guest Users:**

- "Get Started" and "Sign In" call-to-action buttons
- Platform feature highlights
- Information about core capabilities

**Access:** [https://edu-guard-ruddy.vercel.app/](https://edu-guard-ruddy.vercel.app/)

### Learning Experience

**Taking Quizzes:**

1. Navigate to Learn page
2. Select subject area (Science, Math, English, History)
3. Answer quiz questions with multiple-choice options
4. Submit and receive immediate feedback
5. View correct answers and explanations
6. Results automatically saved to database
7. Receive AI recommendations for next steps

**Module Completion:**

1. Access Modules page
2. Select from three digital literacy modules
3. Read educator-verified content
4. Complete module quiz
5. Progress tracked in database
6. Completion status updated on dashboard

### Content Verification

**Using Misinformation Detection:**

1. Navigate to Verify page
2. Enter URL or paste content text
3. Click "Verify Content" button
4. System analyzes credibility indicators
5. Receive credibility score (0-100)
6. View detected warning flags
7. Review detailed analysis results
8. Verification saved to personal history

**Credibility Indicators:**

- High Credibility (75-100): Green indicator, trusted source
- Moderate Credibility (50-74): Yellow indicator, verify claims
- Low Credibility (0-49): Red indicator, significant concerns

---

## Database Schema

### Students Table

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  grade_level VARCHAR(50),
  interests TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Learning Progress Table

```sql
CREATE TABLE learning_progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  subject VARCHAR(100),
  progress INTEGER,
  difficulty_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Quiz Results Table

```sql
CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  subject VARCHAR(100),
  score INTEGER,
  total_questions INTEGER,
  difficulty VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Digital Literacy Modules Table

```sql
CREATE TABLE digital_literacy_modules (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  module_name VARCHAR(255),
  completion_percentage INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Misinformation Checks Table

```sql
CREATE TABLE misinformation_checks (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  url TEXT,
  content TEXT,
  credibility_score INTEGER,
  flags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Security and Authentication

### Authentication Flow

1. **User Registration:**
   - Email uniqueness validation
   - Password storage (production recommendation: bcrypt hashing)
   - Role assignment with validation
   - Automatic session creation

2. **User Login:**
   - Database credential verification
   - Role-based access control
   - Session persistence via localStorage
   - Automatic redirects based on authentication state

3. **Session Management:**
   - User state managed via React Context API
   - Persistent sessions across page refreshes
   - Secure logout with state cleanup
   - Protected routes requiring authentication

### Data Security

- Foreign key constraints ensure referential integrity
- Input validation on all user submissions
- SQL injection prevention via parameterized queries
- HTTPS encryption for all data transmission
- Environment variables for sensitive credentials

---

## Testing Credentials

### Student Account

**Email:** emma@student.com  
**Password:** student123  
**Role:** Student  
**Access Features:**

- Personal dashboard with progress tracking
- All learning modules and quizzes
- Content verification tool
- Quiz history and results

**Pre-populated Data:**

- 5 quiz results across multiple subjects
- Progress in Science, Math, English, History
- 2 completed digital literacy modules
- 3 misinformation verification records

### Educator Account

**Email:** prof.smith@edu.com  
**Password:** educator123  
**Role:** Educator  
**Access Features:**

- Educator dashboard
- Student management tools
- Module creation and approval
- Class analytics

### Administrator Account

**Email:** admin@eduguard.com  
**Password:** admin123  
**Role:** Administrator  
**Access Features:**

- Full system access
- User account management
- Platform configuration
- System-wide analytics

---

## API Endpoints

### Authentication Endpoints

**POST /api/auth/login**

- Validates user credentials against database
- Returns user object with role and profile data
- Creates authenticated session

**POST /api/auth/signup**

- Creates new user account
- Validates email uniqueness
- Inserts record into students table
- Returns new user object

### Data Endpoints

**GET /api/user/[id]**

- Fetches user-specific dashboard data
- Returns learning progress, quiz results, module completion
- Requires authenticated session

**POST /api/verify**

- Analyzes content for credibility
- Calculates credibility score
- Detects warning flags
- Saves verification to database

**POST /api/progress**

- Updates student learning progress
- Records quiz results
- Updates module completion status

### Utility Endpoints

**POST /api/init-db**

- Initializes database schema
- Creates all required tables
- Sets up foreign key relationships

**POST /api/seed-db**

- Populates database with demo data
- Creates 10 students, 5 educators, 1 admin
- Generates sample progress and quiz records

---

## Responsive Design

### Mobile-First Approach

- Optimized for mobile devices (320px and above)
- Touch-friendly interface elements
- Responsive navigation with mobile menu
- Adaptive layouts for tablets and desktops

### Dark Mode Support

- Automatic dark mode detection
- Manual theme toggle option
- Accessible color contrast ratios
- Consistent styling across themes

### Cross-Browser Compatibility

- Tested on Chrome, Firefox, Safari, Edge
- Progressive enhancement strategy
- Fallback support for older browsers

---

## Future Enhancements

### Phase 2 Features

1. **Real-Time Collaboration**
   - Group study sessions
   - Peer review system
   - Discussion forums

2. **Advanced AI Integration**
   - Natural language processing for content analysis
   - Personalized learning recommendations
   - Automated essay grading

3. **Parent Portal**
   - Progress report access
   - Communication with educators
   - Learning goal setting

4. **Gamification**
   - Achievement badges
   - Leaderboards
   - Learning streaks
   - Reward system

5. **Content Library Expansion**
   - Video tutorials
   - Interactive simulations
   - Downloadable resources
   - Multi-language support

---

## Technical Documentation

### Environment Setup

**Required Environment Variables:**

```
DATABASE_URL=postgresql://[connection-string]
NEXT_PUBLIC_APP_URL=https://edu-guard-ruddy.vercel.app
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Initialization

Access the initialization endpoint to create database schema:

```
POST https://edu-guard-ruddy.vercel.app/api/init-db
```

Seed with demo data:

```
POST https://edu-guard-ruddy.vercel.app/api/seed-db
```

---

## Conclusion

EduGuard MVP successfully demonstrates a comprehensive digital literacy platform with robust authentication, personalized learning experiences, and AI-powered misinformation detection. The system is production-ready with a scalable architecture, secure data handling, and an intuitive user interface designed for students, educators, and administrators.

The platform addresses critical needs in digital education by combining adaptive learning technology with practical tools for identifying misinformation, preparing students for safe and informed online engagement.

---

**For questions or technical support, please contact the development team.**

**Live Application:** [https://edu-guard-ruddy.vercel.app/](https://edu-guard-ruddy.vercel.app/)
