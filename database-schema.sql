-- Indian Wedding Planning App Database Schema
-- Run this in your Supabase SQL Editor

-- Create weddings table
CREATE TABLE public.weddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_names TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
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

-- Create RSVPs table
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

-- Create guests table for additional party members
CREATE TABLE public.guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rsvp_id UUID REFERENCES public.rsvps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  food_preference TEXT CHECK (food_preference IN ('veg', 'nonveg', 'vegan', 'jain')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create photos table
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

-- Enable RLS on all tables
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Public access to active weddings
CREATE POLICY "Public access to active weddings" ON public.weddings
  FOR SELECT USING (is_active = TRUE);

-- Wedding owners can update their own weddings
CREATE POLICY "Wedding owners can update" ON public.weddings
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- Public can create RSVPs
CREATE POLICY "Public can create RSVPs" ON public.rsvps
  FOR INSERT WITH CHECK (true);

-- Public can read RSVPs for active weddings
CREATE POLICY "Public can read RSVPs" ON public.rsvps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.weddings 
      WHERE weddings.id = rsvps.wedding_id 
      AND weddings.is_active = TRUE
    )
  );

-- Public can create guests
CREATE POLICY "Public can create guests" ON public.guests
  FOR INSERT WITH CHECK (true);

-- Public can read guests for active weddings
CREATE POLICY "Public can read guests" ON public.guests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.rsvps 
      JOIN public.weddings ON weddings.id = rsvps.wedding_id
      WHERE rsvps.id = guests.rsvp_id 
      AND weddings.is_active = TRUE
    )
  );

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

-- Storage policies for wedding photos bucket
CREATE POLICY "Anyone can upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'wedding-photos');

CREATE POLICY "Anyone can view photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'wedding-photos');

CREATE POLICY "Anyone can delete their photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'wedding-photos');