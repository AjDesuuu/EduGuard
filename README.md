# EduGuard AI - MVP

An AI-powered personalized learning platform with misinformation detection and digital literacy training for students.

![EduGuard Banner](https://img.shields.io/badge/EduGuard-AI%20Learning-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## 🎯 Overview

EduGuard addresses three critical problems in modern education:

- **Low Digital Literacy** among students and educators
- **Limited Personalization** in learning systems
- **Rapid spread of misinformation** online

## ✨ Core MVP Features

### MUST-HAVE Features Implemented

#### 1. 🧠 AI Adaptive Learning Engine

- Adjusts lesson difficulty based on quiz performance
- Recommends personalized study materials
- Tracks learning patterns and adapts content
- Interactive quizzes with immediate feedback

#### 2. 🛡️ Basic Misinformation Detection (NLP-based)

- Flags potentially unreliable sources
- Highlights credibility indicators (date, author, references)
- Real-time content analysis
- Credibility scoring system

#### 3. 📚 Digital Literacy Mini-Modules

- **Source Evaluation**: Learn to assess source credibility
- **Fact-Checking Basics**: Master verification techniques
- **AI Detection**: Identify AI-generated content
- Interactive learning with practical examples

#### 4. 📊 Student Progress Dashboard

- Performance trends visualization
- Digital literacy score tracking
- Learning analytics
- Personalized AI recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (for deployment)

### Local Development

1. **Clone and Install**

   ```bash
   cd EduGuard
   npm install
   ```

2. **Set Up Environment Variables**

   ```bash
   cp .env.example .env
   ```

   Add your Vercel Postgres credentials (see Database Setup below)

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

4. **Initialize Database**
   Navigate to `/api/init-db` in your browser to create tables

## 🗄️ Database Setup

### Using Vercel Postgres

1. **Create a Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your EduGuard repository

2. **Add Postgres Database**
   - In your Vercel project dashboard
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Click "Continue"

3. **Copy Environment Variables**
   - Vercel will show your database credentials
   - Click "Copy Snippet" for `.env.local`
   - Paste into your `.env` file

4. **Initialize Database**
   - After deployment, visit: `https://your-app.vercel.app/api/init-db`
   - This creates all necessary tables

### Database Schema

The app uses these tables:

- `students` - User profiles and digital literacy scores
- `learning_progress` - Lesson completion and scores
- `quiz_results` - Quiz performance tracking
- `digital_literacy_modules` - Module completion status
- `misinformation_checks` - Content verification history

## 📦 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/eduguard)

### Manual Deploy

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Set Environment Variables**

   ```bash
   vercel env add POSTGRES_URL
   vercel env add POSTGRES_PRISMA_URL
   # ... add all database variables
   ```

5. **Deploy Production**
   ```bash
   vercel --prod
   ```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Mobile-First Design

The app is fully responsive and optimized for mobile devices with:

- Bottom navigation for mobile
- Touch-friendly interface
- Responsive layouts
- Progressive Web App capabilities

## 🎓 Target Users

### Primary Users

- Primary to Secondary Students (K-12)
- Undergraduate university students

### Economic Buyers

- Parents
- Private Schools
- School Administrators

### Secondary Stakeholders

- Teachers
- Academic Coordinators

## 📈 Key Metrics

- Monthly Active Users (MAU)
- Roadmap Completion Rate
- Premium Conversion Rate
- Average Time Spent per User
- Uploader Retention Rate
- School Subscription Retention

## 🔮 Future Features (Post-MVP)

### SHOULD-HAVE

- Explainable AI transparency view
- Citation assistance tool
- Professor dashboard
- Plagiarism similarity check

### COULD-HAVE

- Gamification (badges, leaderboards)
- Peer collaboration mode
- Native mobile app
- AI writing assistant
- Blockchain certificates

## 🤝 Contributing

This is an MVP for the EduGuard EdTech platform. For suggestions or contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 👥 Team - Group 1 Technopreneurs

- Alvarez, Aaron Jetro C.
- Cruz, Ethan Lyle C.
- Hernandez, Mark Jason P.
- Ngan, Mark Jefferson G.
- Sumngat, Jhaun Simon A.

## 📄 License

This project is part of an academic MVP demonstration.

## 🐛 Known Issues & Tips

- First database query might be slow (cold start)
- Mock AI detection uses rule-based logic (not real ML)
- Demo student ID is hardcoded as ID: 1
- Progress data persists in Vercel Postgres

## 🆘 Troubleshooting

### Database Connection Issues

- Verify environment variables are set correctly
- Check Vercel Postgres is active in your project
- Visit `/api/init-db` to initialize tables

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Development Issues

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📞 Support

For questions or issues, contact the development team or refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Built with ❤️ by Group 1 Technopreneurs
