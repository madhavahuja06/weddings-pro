# शादी Planner - Indian Wedding Planning Tool

A beautiful, modern Indian wedding planning application built with React and Supabase, specifically designed for South Delhi's elite families.

## 🎯 Features

- **Multi-stage Landing Page**: Beautiful Indian-themed landing page with traditional elements
- **Wedding Creation**: Set up wedding details, date, time, venue, and photo upload password
- **RSVP Management**: Comprehensive RSVP system with:
  - Indian food preferences (Veg, Non-veg, Vegan, Jain)
  - Guest count with +1, +2 options
  - Drink preferences
  - Song requests
  - Special dietary requirements
- **Photo Sharing**: Secure photo upload during wedding ceremony with password protection
- **Indian Cultural Elements**: Traditional colors, fonts, and patterns throughout

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Supabase account

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `src/lib/supabase.js` in your Supabase SQL editor
   - Get your Project URL and Anon Key
   - Update `src/lib/supabase.js` with your credentials

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173

## 🗄️ Database Schema

The application uses the following Supabase tables:

- **weddings**: Store wedding details, venue, dates, passwords
- **rsvps**: Guest RSVP responses with preferences
- **guests**: Additional guest details for plus-ones
- **photos**: Wedding photo metadata
- **Storage**: `wedding-photos` bucket for photo uploads

## 🎨 Design Features

- **Traditional Indian Colors**: Saffron, Deep Orange, Indian Red, Gold
- **Typography**: Playfair Display for headings, Inter for body text
- **Patterns**: Custom mandala and traditional Indian patterns
- **Responsive**: Mobile-first design optimized for all devices
- **Cultural Elements**: Hindi text, Indian wedding terminology

## 📱 Usage Flow

### For Wedding Couples:
1. Create wedding page with details
2. Share RSVP link with guests
3. Set photo upload password
4. After wedding, download all photos

### For Wedding Guests:
1. Visit wedding RSVP page
2. Fill out preferences (food, drinks, plus-ones)
3. During ceremony, upload photos with password
4. Enjoy the celebration! 🎉

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Customization
- Update colors in `tailwind.config.js`
- Modify Indian elements in `src/index.css`
- Add more regional preferences as needed

## 🚧 Todo / Future Enhancements

- [ ] Complete Supabase integration
- [ ] Email notifications for RSVPs
- [ ] Wedding timeline management
- [ ] Vendor management
- [ ] Multi-language support (Hindi, English)
- [ ] WhatsApp integration
- [ ] Payment integration for booking
- [ ] Admin dashboard for wedding management

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 📧 Support

Made with ❤️ for Indian families in Delhi. For support or feature requests, please create an issue in the repository.

## 🎊 Cultural Notes

This application is specifically designed for Indian wedding traditions:
- Traditional color schemes reflecting Indian culture
- Food preferences common in Indian weddings
- Wedding ceremony photo sharing culture
- Family-oriented approach to wedding planning
- Respect for traditional and modern fusion elements

---

**Happy Wedding Planning! शुभ विवाह!** 🎉💕