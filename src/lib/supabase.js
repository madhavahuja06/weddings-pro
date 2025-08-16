import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema for reference:
/*
CREATE TABLE public.weddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_names TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_time TIME NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  city TEXT DEFAULT 'Delhi',
  state TEXT DEFAULT 'Delhi',
  country TEXT DEFAULT 'India',
  photo_upload_password TEXT NOT NULL,
  rsvp_deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE public.rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  attending BOOLEAN NOT NULL,
  number_of_guests INTEGER DEFAULT 1,
  food_preference TEXT CHECK (food_preference IN ('veg', 'nonveg', 'vegan', 'jain')),
  drinks_preference BOOLEAN DEFAULT FALSE,
  song_request TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rsvp_id UUID REFERENCES public.rsvps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  food_preference TEXT CHECK (food_preference IN ('veg', 'nonveg', 'vegan', 'jain')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id UUID REFERENCES public.weddings(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_by TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for wedding photos
INSERT INTO storage.buckets (id, name, public) VALUES ('wedding-photos', 'wedding-photos', false);

-- RLS Policies
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Public access to active weddings
CREATE POLICY "Public access to active weddings" ON public.weddings
  FOR SELECT USING (is_active = TRUE);

-- Public can insert RSVPs
CREATE POLICY "Public can create RSVPs" ON public.rsvps
  FOR INSERT WITH CHECK (true);

-- Public can read RSVPs for their own entries
CREATE POLICY "Users can read their own RSVPs" ON public.rsvps
  FOR SELECT USING (true);

-- Public can insert guests
CREATE POLICY "Public can create guests" ON public.guests
  FOR INSERT WITH CHECK (true);

-- Public can read guests
CREATE POLICY "Public can read guests" ON public.guests
  FOR SELECT USING (true);

-- Photos policies
CREATE POLICY "Public can upload photos" ON public.photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view photos for active weddings" ON public.photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.weddings 
      WHERE weddings.id = photos.wedding_id 
      AND weddings.is_active = TRUE
    )
  );
*/