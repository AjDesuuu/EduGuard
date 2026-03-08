# EduGuard AI - Quick Start Guide

## 🚀 Fast Deploy to Vercel

### Step 1: Push to GitHub (5 minutes)

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   cd EduGuard
   git init
   git add .
   git commit -m "Initial EduGuard MVP"
   git branch -M main
   git remote add origin https://github.com/yourusername/eduguard.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your EduGuard repository
4. Click **"Deploy"** (use default settings)
5. Wait for deployment to complete

### Step 3: Add Database (5 minutes)

1. In Vercel project dashboard, go to **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose your region and click **"Create"**
5. Go to **".env.local"** tab
6. Click **"Copy Snippet"**
7. These variables are automatically added to your project!

### Step 4: Initialize Database (1 minute)

1. Visit your deployed app: `https://your-app.vercel.app`
2. Navigate to: `https://your-app.vercel.app/api/init-db`
3. You should see: `{"message":"Database initialized successfully"}`

### Step 5: Test the App

Your app is now live! Test these features:

- ✅ Home page with feature cards
- ✅ Dashboard with mock data
- ✅ Learning page with quizzes
- ✅ Modules with digital literacy content
- ✅ Verify page for content checking

## 🎯 Demo Features

### For Presentation

1. **Start on Home Page**
   - Show the value proposition
   - Highlight the 4 main features

2. **Demo the Learning Engine**
   - Go to "Learn" tab
   - Start a lesson
   - Take the quiz
   - Show how AI adapts difficulty

3. **Show Misinformation Detection**
   - Go to "Verify" tab
   - Try the example content
   - Show credibility scoring

4. **Display Digital Literacy**
   - Go to "Modules" tab
   - Start a module
   - Show interactive learning

5. **Present Dashboard**
   - Go to "Dashboard" tab
   - Show progress tracking
   - Highlight performance trends
   - Show AI recommendations

## 📱 Mobile Testing

Open on your phone:

- Bottom navigation works
- Touch-friendly interface
- Responsive layouts

## 🔧 Customization

### Change Theme Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#3B82F6',  // Change this
  secondary: '#10B981',
  // ...
}
```

### Add Your Team Info

Edit `app/page.tsx` to customize the home page.

### Modify Mock Data

Edit these files for demo data:

- `app/dashboard/page.tsx` - Dashboard stats
- `app/learn/page.tsx` - Lessons and questions
- `app/modules/page.tsx` - Module content

## ⚡ Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod
```

## 🎨 Branding

Your app uses:

- **Primary Color**: Blue (#3B82F6)
- **Secondary Color**: Green (#10B981)
- **Font**: Inter (Google Fonts)

## 📊 Lean Canvas Features Implemented

Based on your Lean Canvas model:

✅ **Problem Solved**

- Low digital literacy
- Limited personalization
- Misinformation spread

✅ **Solution**

- Personalized learning pathways
- Content filtering and flagging
- Digital literacy training
- Source evaluation skills

✅ **Unique Value Proposition**

- AI-powered personalized roadmap
- Internal + marketplace content
- Data-driven improvement over time

✅ **Key Metrics**

- Student progress tracking
- Digital literacy scoring
- Learning time analytics
- Performance trends

## 🐛 Common Issues

**Database not working?**

- Make sure you visited `/api/init-db`
- Check environment variables in Vercel

**Build failing?**

- Try: `npm install` and `npm run build`
- Check Node.js version is 18+

**Styling looks broken?**

- Clear cache: `rm -rf .next`
- Rebuild: `npm run dev`

## 🎉 You're Ready!

Your EduGuard MVP is deployed and ready for demo. Test all features and customize as needed for your presentation.

**Live URL**: Check your Vercel dashboard for the deployed URL

---

Good luck with your demo! 🚀
