# 🎉 Wedding Planner - Modern Indian Wedding Management App

A beautiful, modern wedding planning application built with React, Vite, Tailwind CSS, and Supabase. Perfect for managing Indian weddings with RSVP functionality, photo sharing, and guest coordination.

## ✨ Features

- **🎨 Modern Design**: Beautiful red and white color scheme with glass morphism effects
- **💌 RSVP Management**: Complete guest management with food preferences and special requests
- **📸 Photo Gallery**: Secure photo upload and viewing with password protection
- **📱 Responsive**: Works perfectly on mobile and desktop
- **🔐 Email Verification**: Secure signup with Supabase Auth
- **🇮🇳 Indian Wedding Focus**: Tailored for Indian wedding traditions and preferences

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Supabase account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/madhavahuja06/weddings-pro.git
   cd weddings-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:5173`

## 🌐 Deploy to Netlify

### Option 1: One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/madhavahuja06/weddings-pro)

### Option 2: Manual Deployment

1. **Fork this repository** on GitHub

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the forked repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

4. **Set environment variables** in Netlify Dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live in minutes!

## 🗄️ Database Setup

The app uses Supabase as the backend. Set up your database with these tables:

### Tables Required:
- `weddings` - Wedding information
- `rsvps` - Guest RSVP responses  
- `photos` - Photo uploads metadata
- `guests` - Additional guest details

### Storage Buckets:
- `wedding-photos` - For photo uploads

## 🎨 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Fonts**: Google Fonts (Playfair Display, Inter, Dancing Script, Poppins)

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/
│   ├── PhotoUpload.jsx      # Photo upload functionality
│   ├── PhotoGallery.jsx     # Photo viewing gallery
│   └── EmailVerification.jsx # Email verification flow
├── lib/
│   └── supabase.js          # Supabase client configuration
├── App.jsx                  # Main app component
├── index.css               # Global styles and Tailwind
└── main.jsx               # App entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For production deployment on Netlify, add these in the dashboard under Site Settings → Environment Variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for Happy Indian Families

🎉 **Ready to plan your dream wedding? Get started today!** ✨
