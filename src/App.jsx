import { useState } from 'react'
import { Heart, Camera, Users, Gift, AlertCircle } from 'lucide-react'
import PhotoUpload from './components/PhotoUpload'
import PhotoGallery from './components/PhotoGallery'
import EmailVerification from './components/EmailVerification'
import { supabase, isSupabaseConfigured } from './lib/supabase'

// Landing Page Component
const LandingPage = ({ setCurrentView }) => (
  <div className="min-h-screen relative overflow-hidden">
    {/* Configuration Warning Banner */}
    {!isSupabaseConfigured && (
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black p-3 text-center font-semibold">
        <AlertCircle className="inline mr-2" size={20} />
        Demo Mode: Supabase not configured. Set environment variables for full functionality.
      </div>
    )}
    
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/75 via-red-800/70 to-red-700/75"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-red-600/40"></div>
    </div>
    
    {/* Modern Header */}
    <header className={`relative z-10 overflow-hidden ${!isSupabaseConfigured ? 'pt-16' : ''}`}>
      <div className="relative container mx-auto px-6 py-12">
        <div className="flex items-center justify-center animate-fade-in">
          <Heart className="mr-6 text-red-200 icon-glow floating" size={50} />
          <h1 className="text-6xl font-heading font-bold text-white glow-text drop-shadow-2xl">
            Wedding Planner
          </h1>
          <Heart className="ml-6 text-red-200 icon-glow floating" size={50} />
        </div>
        <p className="text-center mt-6 text-red-100 text-2xl font-semibold animate-slide-up drop-shadow-lg">
          Making Your Dream Indian Wedding Come True
        </p>
        <div className="text-center mt-4">
          <span className="inline-block bg-red-600/80 backdrop-blur-sm text-white px-6 py-2 rounded-full text-lg font-medium border border-red-400/50">
            ✨ Joyful Wedding Planning for Happy Families ✨
          </span>
        </div>
      </div>
    </header>

    {/* Hero Section */}
    <section className="py-32 px-6 relative z-10">
      <div className="relative container mx-auto text-center">
        <div className="animate-bounce-in bg-white/10 backdrop-blur-lg rounded-lg p-12 border border-white/20 shadow-2xl">
          <h2 className="text-7xl font-heading font-bold text-white mb-8 glow-text drop-shadow-2xl">
            Wedding Celebration
          </h2>
          <p className="text-3xl text-red-100 mb-8 font-bold drop-shadow-lg">
            Create Beautiful Wedding Memories for Happy Families
          </p>
          <p className="text-xl text-red-50 mb-16 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-md">
            From grand Rajasthani themes to elegant South Indian ceremonies, 
            plan your perfect wedding with RSVP management, photo sharing, and guest coordination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
            <button
              onClick={() => setCurrentView('signup')}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-xl font-bold px-12 py-6 rounded-lg min-w-[280px] animate-scale-in shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 border-2 border-red-400"
            >
              ✨ Create Wedding Page
            </button>
            <button
              onClick={() => setCurrentView('rsvp')}
              className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-red-600 text-xl font-bold px-12 py-6 rounded-lg min-w-[280px] animate-scale-in shadow-2xl transition-all duration-300 hover:scale-105"
            >
              💌 RSVP to Wedding
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up mt-6">
            <button
              onClick={() => setCurrentView('photos')}
              className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-red-600 text-xl font-bold px-12 py-6 rounded-lg min-w-[280px] animate-scale-in shadow-2xl transition-all duration-300 hover:scale-105"
            >
              📸 Share Photos
            </button>
            <button
              onClick={() => setCurrentView('gallery')}
              className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-red-600 text-xl font-bold px-12 py-6 rounded-lg min-w-[280px] animate-scale-in shadow-2xl transition-all duration-300 hover:scale-105"
            >
              🖼️ View Photos
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-32 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-100"></div>
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <h3 className="text-5xl font-heading font-bold gradient-text mb-8 glow-text">
            Amazing Wedding Features
          </h3>
          <p className="text-2xl text-red-700 max-w-3xl mx-auto font-semibold">
            Discover the most comprehensive and joyful wedding planning experience for Indian families
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg p-10 card-hover text-center animate-slide-up shadow-2xl border-4 border-red-400">
            <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <Users className="text-white icon-glow" size={48} />
            </div>
            <h4 className="text-3xl font-heading font-bold mb-6">Smart RSVP Management</h4>
            <p className="text-red-100 text-lg leading-relaxed">
              Effortless guest management with personalized invitations, dietary preferences, and accommodation coordination
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg p-10 card-hover text-center animate-slide-up shadow-2xl border-4 border-red-400">
            <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <Camera className="text-white icon-glow" size={48} />
            </div>
            <h4 className="text-3xl font-heading font-bold mb-6">Beautiful Photo Gallery</h4>
            <p className="text-red-100 text-lg leading-relaxed">
              Professional photography management with instant sharing, stunning albums, and cherished guest memories
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg p-10 card-hover text-center animate-slide-up shadow-2xl border-4 border-red-400">
            <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <Gift className="text-white icon-glow" size={48} />
            </div>
            <h4 className="text-3xl font-heading font-bold mb-6">Traditional Indian Celebrations</h4>
            <p className="text-red-100 text-lg leading-relaxed">
              Authentic ceremonial elements, traditional rituals coordination, and beautiful cultural celebration management
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/85 via-red-800/80 to-red-900/85"></div>
      </div>
      <div className="relative container mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-16 border border-white/20 shadow-2xl">
          <h3 className="text-6xl font-heading font-bold text-white mb-8 animate-fade-in glow-text drop-shadow-2xl">
            Ready to Plan Your Dream Wedding?
          </h3>
          <p className="text-2xl text-red-100 mb-12 max-w-3xl mx-auto animate-slide-up font-semibold drop-shadow-lg">
            Join happy families who have created the most unforgettable and beautiful wedding experiences
          </p>
          <button
            onClick={() => setCurrentView('signup')}
            className="bg-gradient-to-r from-white to-red-50 text-red-700 px-16 py-6 rounded-lg text-2xl font-bold hover:from-red-50 hover:to-white transition-all duration-300 hover:scale-110 shadow-2xl animate-bounce-in border-4 border-red-300"
          >
            Start Your Wedding Journey ✨💕
          </button>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent"></div>
      <div className="relative container mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-6">
          <Heart className="mr-4 text-red-200 floating icon-glow" size={32} />
          <p className="text-white font-bold text-2xl glow-text">Made with Love for Happy Indian Families in Delhi</p>
          <Heart className="ml-4 text-red-200 floating icon-glow" size={32} />
        </div>
        <p className="text-red-100 text-lg font-medium">© 2025 Wedding Planner. Creating the most beautiful memories, one joyful wedding at a time.</p>
        <div className="mt-6">
          <span className="inline-block bg-red-600/80 backdrop-blur-sm text-white px-8 py-3 rounded-full text-base font-semibold border border-red-400/50">
            ✨ Beautiful Wedding Planning Since 2025 ✨
          </span>
        </div>
      </div>
    </footer>
  </div>
)

// Signup Page Component
const SignupPage = ({ setCurrentView, formData, handleInputChange, setTempFormData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Validate required fields
      if (!formData.brideName || !formData.groomName || !formData.email || !formData.weddingDate || !formData.password) {
        setSubmitMessage('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      if (!isSupabaseConfigured) {
        // Demo mode - simulate success
        setSubmitMessage('🎉 Demo Mode: Wedding page created successfully! (Configure Supabase for real functionality)')
        setTimeout(() => {
          setCurrentView('landing')
          // Reset form
          setFormData({
            brideName: '',
            groomName: '',
            email: '',
            phone: '',
            weddingDate: '',
            venue: '',
            password: ''
          })
        }, 3000)
        setIsSubmitting(false)
        return
      }

      // Use Supabase Auth to sign up user with email verification
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            bride_name: formData.brideName,
            groom_name: formData.groomName,
            phone: formData.phone,
            wedding_date: formData.weddingDate,
            venue: formData.venue
          }
        }
      })

      if (authError) {
        console.error('Error with signup:', authError)
        setSubmitMessage(`Error: ${authError.message}`)
        setIsSubmitting(false)
        return
      }

      if (authData.user && !authData.user.email_confirmed_at) {
        // Email verification required
        setSubmitMessage('📧 Please check your email and click the verification link to complete registration!')
        setTempFormData(formData)
        setTimeout(() => {
          setCurrentView('emailVerification')
        }, 3000)
      } else {
        // User already verified or confirmation not required
        await createWeddingRecord(authData.user.id)
      }

    } catch (err) {
      console.error('Unexpected error:', err)
      setSubmitMessage('An unexpected error occurred. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen hero-bg py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass-effect rounded-lg p-12 animate-scale-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-heading font-bold gradient-text mb-4 glow-text">Create Your Wedding</h2>
            <p className="text-xl text-gray-600 font-medium">Set up your beautiful Indian wedding page with modern elegance</p>
          </div>
          
          {submitMessage && (
            <div className={`p-6 rounded-lg mb-8 font-medium text-lg ${
              submitMessage.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            } animate-slide-up`}>
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-fade-in">
                <label className="form-label">✨ Bride's Name</label>
                <input
                  type="text"
                  name="brideName"
                  value={formData.brideName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter bride's beautiful name"
                />
              </div>
              <div className="animate-fade-in">
                <label className="form-label">🤵 Groom's Name</label>
                <input
                  type="text"
                  name="groomName"
                  value={formData.groomName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter groom's name"
                />
              </div>
            </div>
            
            <div className="animate-slide-up">
              <label className="form-label">📧 Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <div className="animate-slide-up">
              <label className="form-label">📱 Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="+91 9876543210"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-fade-in">
                <label className="form-label">📅 Wedding Date</label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="animate-fade-in">
                <label className="form-label">🔐 Photo Upload Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Set secure password for guests"
                />
              </div>
            </div>
            
            <div className="animate-slide-up">
              <label className="form-label">🏛️ Venue Details</label>
              <textarea
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                rows="4"
                className="form-input resize-none"
                placeholder="Beautiful wedding venue address in Delhi..."
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="button"
                onClick={() => setCurrentView('landing')}
                className="btn-outline px-8 py-4 text-lg font-semibold"
              >
                ← Back to Home
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-modern px-8 py-4 text-lg font-bold flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '✨ Creating Your Wedding...' : '🎉 Create Wedding Page'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// RSVP Page Component  
const RSVPPage = ({ setCurrentView }) => {
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: 1,
    foodPreference: '',
    drinks: '',
    songRequest: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleRSVPChange = (e) => {
    setRsvpData({
      ...rsvpData,
      [e.target.name]: e.target.value
    })
  }

  const handleRSVPSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      if (!rsvpData.name || !rsvpData.attending) {
        setSubmitMessage('Please fill in your name and attendance status')
        setIsSubmitting(false)
        return
      }

      if (!isSupabaseConfigured) {
        // Demo mode - simulate success
        setSubmitMessage('🎉 Demo Mode: RSVP submitted successfully! (Configure Supabase for real functionality)')
        setTimeout(() => setCurrentView('landing'), 3000)
        setIsSubmitting(false)
        return
      }

      const rsvpDbData = {
        wedding_id: null, // Will be set by wedding context in real app
        guest_name: rsvpData.name,
        email: rsvpData.email || null,
        attending: rsvpData.attending === 'yes',
        number_of_guests: parseInt(rsvpData.guests),
        food_preference: rsvpData.foodPreference || null,
        drinks_preference: rsvpData.drinks === 'yes',
        song_request: rsvpData.songRequest || null,
        special_requests: rsvpData.specialRequests || null
      }

      const { data, error } = await supabase
        .from('rsvps')
        .insert([rsvpDbData])
        .select()

      if (error) {
        console.error('Error submitting RSVP:', error)
        setSubmitMessage(`Error: ${error.message}`)
      } else {
        console.log('RSVP submitted successfully:', data)
        setSubmitMessage('🎉 Thank you! Your RSVP has been submitted successfully.')
        setTimeout(() => setCurrentView('landing'), 3000)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setSubmitMessage('An unexpected error occurred. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen hero-bg py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass-effect rounded-lg p-12 animate-scale-in">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-heading font-bold gradient-text mb-4 glow-text">Wedding RSVP</h2>
            <p className="text-xl text-gray-600 font-medium">Please confirm your attendance for this special celebration</p>
          </div>
          
          {submitMessage && (
            <div className={`p-6 rounded-lg mb-8 font-medium text-lg ${
              submitMessage.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            } animate-slide-up`}>
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleRSVPSubmit} className="space-y-8">
            <div className="animate-fade-in">
              <label className="form-label">👤 Your Name</label>
              <input
                type="text"
                name="name"
                value={rsvpData.name}
                onChange={handleRSVPChange}
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="animate-slide-up">
              <label className="form-label">📧 Email Address</label>
              <input
                type="email"
                name="email"
                value={rsvpData.email}
                onChange={handleRSVPChange}
                className="form-input"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <div className="animate-fade-in">
              <label className="form-label">✨ Will you be attending?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="modern-card-outline cursor-pointer hover:border-red-300 transition-all duration-300">
                  <input 
                    type="radio" 
                    name="attending" 
                    value="yes" 
                    checked={rsvpData.attending === 'yes'}
                    onChange={handleRSVPChange}
                    className="sr-only" 
                  />
                  <div className={`text-center p-6 rounded-lg ${rsvpData.attending === 'yes' ? 'bg-red-50 border-red-400' : ''}`}>
                    <div className="text-4xl mb-2">🎉</div>
                    <span className="text-lg font-semibold">Yes, I will be there!</span>
                  </div>
                </label>
                <label className="modern-card-outline cursor-pointer hover:border-red-300 transition-all duration-300">
                  <input 
                    type="radio" 
                    name="attending" 
                    value="no" 
                    checked={rsvpData.attending === 'no'}
                    onChange={handleRSVPChange}
                    className="sr-only" 
                  />
                  <div className={`text-center p-6 rounded-lg ${rsvpData.attending === 'no' ? 'bg-red-50 border-red-400' : ''}`}>
                    <div className="text-4xl mb-2">😢</div>
                    <span className="text-lg font-semibold">Sorry, I can't make it</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests (including you)</label>
              <select 
                name="guests"
                value={rsvpData.guests}
                onChange={handleRSVPChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-saffron focus:outline-none"
              >
                <option value="1">1 person</option>
                <option value="2">2 people (+1)</option>
                <option value="3">3 people (+2)</option>
                <option value="4">4 people (+3)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Food Preference</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="foodPreference" 
                    value="veg" 
                    checked={rsvpData.foodPreference === 'veg'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>🥬 Pure Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="foodPreference" 
                    value="nonveg" 
                    checked={rsvpData.foodPreference === 'nonveg'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>🍗 Non-Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="foodPreference" 
                    value="vegan" 
                    checked={rsvpData.foodPreference === 'vegan'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>🌱 Vegan</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="foodPreference" 
                    value="jain" 
                    checked={rsvpData.foodPreference === 'jain'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>🙏 Jain Food</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Drink Preferences</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="drinks" 
                    value="no" 
                    checked={rsvpData.drinks === 'no'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>No alcohol please</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="drinks" 
                    value="yes" 
                    checked={rsvpData.drinks === 'yes'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>I enjoy a drink</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Song Request</label>
              <input
                type="text"
                name="songRequest"
                value={rsvpData.songRequest}
                onChange={handleRSVPChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-saffron focus:outline-none"
                placeholder="Any special song for the couple?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests or Dietary Requirements</label>
              <textarea
                name="specialRequests"
                value={rsvpData.specialRequests}
                onChange={handleRSVPChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-saffron focus:outline-none"
                placeholder="Any special requirements we should know about?"
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="button"
                onClick={() => setCurrentView('landing')}
                className="btn-outline px-8 py-4 text-lg font-semibold"
              >
                ← Back to Home
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-modern px-8 py-4 text-lg font-bold flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '✨ Submitting RSVP...' : '💌 Submit RSVP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    email: '',
    phone: '',
    weddingDate: '',
    venue: '',
    password: ''
  })
  const [tempFormData, setTempFormData] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const createWeddingRecord = async (userId) => {
    const formDataToUse = tempFormData || formData
    
    try {
      // Prepare data for database
      const weddingData = {
        user_id: userId, // Link to authenticated user
        couple_names: `${formDataToUse.brideName} & ${formDataToUse.groomName}`,
        bride_name: formDataToUse.brideName,
        groom_name: formDataToUse.groomName,
        email: formDataToUse.email,
        phone: formDataToUse.phone || null,
        wedding_date: formDataToUse.weddingDate,
        wedding_time: '18:00:00',
        venue_name: formDataToUse.venue.split(',')[0] || 'Wedding Venue',
        venue_address: formDataToUse.venue,
        photo_upload_password: formDataToUse.password,
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        email_verified: true,
        email_verified_at: new Date().toISOString()
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('weddings')
        .insert([weddingData])
        .select()

      if (error) {
        console.error('Error creating wedding:', error)
        alert(`Error: ${error.message}`)
      } else {
        console.log('Wedding created successfully:', data)
        alert('🎉 Wedding page created successfully! Your Indian wedding is ready.')
        setCurrentView('landing')
        setTempFormData(null)
        // Reset form
        setFormData({
          brideName: '',
          groomName: '',
          email: '',
          phone: '',
          weddingDate: '',
          venue: '',
          password: ''
        })
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred. Please try again.')
    }
  }

  const handleEmailVerified = async () => {
    // Check if user is now authenticated and verified
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user && user.email_confirmed_at) {
      await createWeddingRecord(user.id)
    } else {
      alert('Please complete email verification first.')
    }
  }

  return (
    <div className="App">
      {currentView === 'landing' && <LandingPage setCurrentView={setCurrentView} />}
      {currentView === 'signup' && <SignupPage setCurrentView={setCurrentView} formData={formData} handleInputChange={handleInputChange} setTempFormData={setTempFormData} />}
      {currentView === 'emailVerification' && <EmailVerification email={tempFormData?.email} onVerified={handleEmailVerified} onBack={() => setCurrentView('signup')} />}
      {currentView === 'rsvp' && <RSVPPage setCurrentView={setCurrentView} />}
      {currentView === 'photos' && <PhotoUpload onBack={() => setCurrentView('landing')} />}
      {currentView === 'gallery' && <PhotoGallery onBack={() => setCurrentView('landing')} />}
    </div>
  )
}

export default App