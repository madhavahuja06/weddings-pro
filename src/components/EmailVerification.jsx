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
    <div className="min-h-screen hero-bg py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="glass-effect rounded-lg p-12 animate-scale-in">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center floating">
              <Mail className="text-white icon-glow" size={48} />
            </div>
            <h2 className="text-5xl font-heading font-bold gradient-text mb-4 glow-text">
              Verify Your Email
            </h2>
            <p className="text-xl text-gray-600 mb-4 font-medium">
              We've sent a verification link to:
            </p>
            <p className="text-2xl font-bold text-red-600 mb-2">{email}</p>
            <p className="text-gray-500">Check your inbox and click the verification link</p>
          </div>

          {message && (
            <div className={`p-6 rounded-lg mb-8 font-medium text-lg ${
              message.includes('Error') || message.includes('Invalid') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : message.includes('✅') 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            } animate-slide-up`}>
              {message}
            </div>
          )}

          <div className="space-y-8">
            <div className="text-center animate-fade-in">
              <CheckCircle className="mx-auto mb-6 text-green-500 icon-glow floating" size={64} />
              <p className="text-xl text-gray-600 font-medium">
                We're automatically checking your email verification status...
              </p>
            </div>

            <div className="grid gap-4">
              <button
                type="button"
                onClick={handleCheckNow}
                disabled={isChecking}
                className="btn-modern w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Checking Verification...
                  </>
                ) : (
                  '🔍 Check Verification Status'
                )}
              </button>

              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isResending}
                className="btn-outline w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? '📤 Sending...' : '📧 Resend Verification Email'}
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full flex items-center justify-center text-gray-600 py-3 rounded-lg font-semibold hover:text-gray-800 hover:bg-gray-50 transition-all duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Signup
              </button>
            </div>
          </div>

          <div className="mt-12 modern-card-outline">
            <h3 className="text-xl font-heading font-bold text-gray-800 mb-4">📋 Verification Instructions</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <p>Check your email inbox for a verification link from Supabase</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <p>Click the verification link in the email</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <p>This page will automatically detect when you're verified</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                <p>If you don't see the email, check your spam folder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification