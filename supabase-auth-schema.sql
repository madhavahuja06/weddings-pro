-- =====================================================
-- SUPABASE AUTH INTEGRATION FOR WEDDING APP
-- =====================================================
-- Run this script in your Supabase SQL Editor

-- 1. Add user_id column to weddings table to link with auth.users
ALTER TABLE public.weddings 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Add email verification columns (if not already added)
ALTER TABLE public.weddings 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ NULL;

-- 3. Create index for performance
CREATE INDEX IF NOT EXISTS idx_weddings_user_id ON public.weddings(user_id);

-- 4. Update RLS policies for weddings table
-- Drop existing policies
DROP POLICY IF EXISTS "Public access to active weddings" ON public.weddings;

-- Create new policies that work with authentication
-- Allow authenticated users to insert their own weddings
CREATE POLICY "Users can create their own weddings" ON public.weddings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own weddings
CREATE POLICY "Users can read their own weddings" ON public.weddings
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to update their own weddings
CREATE POLICY "Users can update their own weddings" ON public.weddings
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow public read access to active weddings for RSVP and photo sharing
CREATE POLICY "Public can read active weddings for RSVP" ON public.weddings
  FOR SELECT USING (is_active = TRUE);

-- 5. Update RSVP policies to work with wedding owners
-- Allow public to insert RSVPs (unchanged)
-- Allow wedding owners to read RSVPs for their weddings
CREATE POLICY "Wedding owners can read their RSVPs" ON public.rsvps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.weddings 
      WHERE weddings.id = rsvps.wedding_id 
      AND weddings.user_id = auth.uid()
    )
  );

-- 6. Update photos policies
-- Allow wedding owners to read photos for their weddings
CREATE POLICY "Wedding owners can read their photos" ON public.photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.weddings 
      WHERE weddings.id = photos.wedding_id 
      AND weddings.user_id = auth.uid()
    )
  );

-- 7. Clean up the old email_verifications table (optional)
-- DROP TABLE IF EXISTS public.email_verifications;

-- 8. Create a function to automatically set email_verified when user is confirmed
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- This function can be used to handle new user signups
  -- For now, it's just a placeholder
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create a trigger for when users confirm their email
-- This trigger will fire when a user's email_confirmed_at is updated
CREATE OR REPLACE FUNCTION update_wedding_email_verified()
RETURNS trigger AS $$
BEGIN
  -- Update any weddings for this user to mark email as verified
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE public.weddings 
    SET 
      email_verified = TRUE,
      email_verified_at = NEW.email_confirmed_at
    WHERE user_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION update_wedding_email_verified();

-- 10. Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO anon, authenticated;
GRANT SELECT ON auth.users TO authenticated; -- Allow authenticated users to read user data

-- =====================================================
-- SUPABASE DASHBOARD CONFIGURATION NEEDED
-- =====================================================
-- 
-- In your Supabase Dashboard, you need to:
-- 1. Go to Authentication > Settings
-- 2. Enable "Confirm email" under Auth Settings
-- 3. Set up Email Templates (optional but recommended)
-- 4. Configure SMTP settings for email delivery
-- 
-- For development, you can use the default Supabase email service
-- For production, configure your own SMTP provider
-- 
-- =====================================================

COMMENT ON TABLE public.weddings IS 'Wedding information linked to authenticated users';
COMMENT ON COLUMN public.weddings.user_id IS 'References auth.users.id - the user who created this wedding';
COMMENT ON COLUMN public.weddings.email_verified IS 'Whether the user has verified their email address';
COMMENT ON COLUMN public.weddings.email_verified_at IS 'Timestamp when email was verified';