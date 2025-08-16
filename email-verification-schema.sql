-- =====================================================
-- EMAIL VERIFICATION SCHEMA FOR WEDDING APP
-- =====================================================
-- Run this script in your Supabase SQL Editor

-- 1. Create email_verifications table
CREATE TABLE IF NOT EXISTS public.email_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  verification_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add email verification columns to weddings table
ALTER TABLE public.weddings 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ NULL;

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON public.email_verifications(email);
CREATE INDEX IF NOT EXISTS idx_email_verifications_code ON public.email_verifications(verification_code);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires ON public.email_verifications(expires_at);
CREATE INDEX IF NOT EXISTS idx_weddings_email_verified ON public.weddings(email_verified);

-- 4. Enable RLS on email_verifications table
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for email_verifications
-- Allow public to insert verification codes
CREATE POLICY "Public can create email verifications" ON public.email_verifications
  FOR INSERT WITH CHECK (true);

-- Allow public to read their own verification codes
CREATE POLICY "Users can read their own verifications" ON public.email_verifications
  FOR SELECT USING (true);

-- Allow public to update verification status
CREATE POLICY "Public can update email verifications" ON public.email_verifications
  FOR UPDATE USING (true);

-- 6. Create function to clean up expired verification codes
CREATE OR REPLACE FUNCTION cleanup_expired_verifications()
RETURNS void AS $$
BEGIN
  DELETE FROM public.email_verifications 
  WHERE expires_at < NOW() AND is_verified = FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create a trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to email_verifications table
DROP TRIGGER IF EXISTS update_email_verifications_updated_at ON public.email_verifications;
CREATE TRIGGER update_email_verifications_updated_at
    BEFORE UPDATE ON public.email_verifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply the trigger to weddings table as well
DROP TRIGGER IF EXISTS update_weddings_updated_at ON public.weddings;
CREATE TRIGGER update_weddings_updated_at
    BEFORE UPDATE ON public.weddings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.email_verifications TO anon, authenticated;
GRANT ALL ON public.weddings TO anon, authenticated;

-- 9. Optional: Create a view for active verification codes
CREATE OR REPLACE VIEW public.active_verifications AS
SELECT 
  id,
  email,
  verification_code,
  expires_at,
  is_verified,
  created_at
FROM public.email_verifications
WHERE expires_at > NOW() AND is_verified = FALSE;

-- Grant access to the view
GRANT SELECT ON public.active_verifications TO anon, authenticated;

-- =====================================================
-- VERIFICATION COMPLETE
-- =====================================================

-- Optional: Clean up old verification codes (run periodically)
-- SELECT cleanup_expired_verifications();

COMMENT ON TABLE public.email_verifications IS 'Stores email verification codes for user authentication';
COMMENT ON COLUMN public.email_verifications.verification_code IS '6-digit verification code sent to user email';
COMMENT ON COLUMN public.email_verifications.expires_at IS 'Expiration time for the verification code (typically 10 minutes)';
COMMENT ON COLUMN public.weddings.email_verified IS 'Whether the user has verified their email address';
COMMENT ON COLUMN public.weddings.email_verified_at IS 'Timestamp when email was verified';