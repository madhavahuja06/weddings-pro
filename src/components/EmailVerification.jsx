import { useState, useEffect } from 'react'
import { Mail, ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabase'

const EmailVerification = ({ email, onVerified, onBack }) => {
  const [isChecking, setIsChecking] = useState(false)
  const [message, setMessage] = useState('')
  const [isResending, setIsResending] = useState(false)

  // Check verification status periodically
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user && user.email_confirmed_at) {
        setMessage('✅ Email verified successfully!')
        setTimeout(() => onVerified(), 1500)
      }
    }

    // Check immediately
    checkVerificationStatus()

    // Set up polling every 3 seconds
    const interval = setInterval(checkVerificationStatus, 3000)

    return () => clearInterval(interval)
  }, [onVerified])

  const handleCheckNow = async () => {
    setIsChecking(true)
    setMessage('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user && user.email_confirmed_at) {
        setMessage('✅ Email verified successfully!')
        setTimeout(() => onVerified(), 1500)
      } else {
        setMessage('Email not yet verified. Please check your email and click the verification link.')
      }
    } catch (err) {
      console.error('Check verification error:', err)
      setMessage('Error checking verification status. Please try again.')
    }

    setIsChecking(false)
  }

  const handleResendEmail = async () => {
    setIsResending(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('📧 New verification email sent! Please check your inbox.')
      }
    } catch (err) {
      console.error('Resend error:', err)
      setMessage('Error sending verification email. Please try again.')
    }

    setIsResending(false)
  }

  return (
    <div className="min-h-screen indian-pattern bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-8 border-indian-gold">
          <div className="text-center mb-8">
            <Mail className="mx-auto mb-4 text-indian-red" size={48} />
            <h2 className="text-3xl font-playfair font-bold gradient-text mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to:
            </p>
            <p className="text-indian-red font-semibold mt-1">{email}</p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('Error') || message.includes('Invalid') 
                ? 'bg-red-100 text-red-800' 
                : message.includes('✅') 
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
              <p className="text-gray-600 mb-4">
                We're automatically checking your email verification status...
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCheckNow}
                disabled={isChecking}
                className="w-full bg-gradient-to-r from-indian-red to-maharaja-red text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={16} />
                    Checking...
                  </>
                ) : (
                  'Check Verification Status'
                )}
              </button>

              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full flex items-center justify-center bg-transparent text-gray-600 py-2 rounded-lg font-semibold hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Signup
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-saffron">
            <p className="text-sm text-gray-700">
              <strong>Instructions:</strong>
              <br />
              1. Check your email inbox for a verification link from Supabase
              <br />
              2. Click the verification link in the email
              <br />
              3. This page will automatically detect when you're verified
              <br />
              4. If you don't see the email, check your spam folder
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification