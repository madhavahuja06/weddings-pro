import { useState } from 'react'
import { Heart, Camera, Users, Gift } from 'lucide-react'
import PhotoUpload from './components/PhotoUpload'
import EmailVerification from './components/EmailVerification'
import { supabase } from './lib/supabase'

// Landing Page Component
const LandingPage = ({ setCurrentView }) => (
  <div className="min-h-screen mandala-bg">
    {/* Header */}
    <header className="bg-gradient-to-r from-indian-red to-maharaja-red text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Heart className="mr-3 text-indian-gold" size={32} />
          <h1 className="text-4xl font-playfair font-bold">शादी Planner</h1>
          <Heart className="ml-3 text-indian-gold" size={32} />
        </div>
        <p className="text-center mt-2 text-indian-gold opacity-90">Making Your Dream Indian Wedding Come True</p>
      </div>
    </header>

    {/* Hero Section */}
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-6xl font-playfair font-bold gradient-text mb-6">
          विवाह समारोह
        </h2>
        <p className="text-2xl text-gray-700 mb-8 font-medium">
          Create Beautiful Wedding Memories for South Delhi's Elite Families
        </p>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          From grand Rajasthani themes to elegant South Indian ceremonies, 
          plan your perfect wedding with RSVP management, photo sharing, and guest coordination.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center flex-wrap">
          <button
            onClick={() => setCurrentView('signup')}
            className="bg-gradient-to-r from-indian-red to-maharaja-red text-white px-8 py-4 rounded-lg text-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border-2 border-indian-gold"
          >
            Create Wedding Page
          </button>
          <button
            onClick={() => setCurrentView('rsvp')}
            className="bg-gradient-to-r from-saffron to-deep-orange text-white px-8 py-4 rounded-lg text-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            RSVP to Wedding
          </button>
          <button
            onClick={() => setCurrentView('photos')}
            className="bg-gradient-to-r from-royal-blue to-deep-orange text-white px-8 py-4 rounded-lg text-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            📸 Share Photos
          </button>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 bg-white bg-opacity-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-playfair font-bold text-center gradient-text mb-12">
          Wedding Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-indian-gold">
            <Users className="mx-auto mb-4 text-indian-red" size={48} />
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">RSVP Management</h4>
            <p className="text-gray-600">Easy guest management with food preferences, plus-ones, and special requests</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-saffron">
            <Camera className="mx-auto mb-4 text-indian-red" size={48} />
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">Photo Sharing</h4>
            <p className="text-gray-600">Secure photo uploads during the ceremony with password protection</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-deep-orange">
            <Gift className="mx-auto mb-4 text-indian-red" size={48} />
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">Indian Traditions</h4>
            <p className="text-gray-600">Customized for Indian weddings with traditional elements and preferences</p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gradient-to-r from-maharaja-red to-indian-red text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-indian-gold">Made with ❤️ for Indian Families in Delhi</p>
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
    <div className="min-h-screen indian-pattern bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-8 border-indian-gold">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-playfair font-bold gradient-text mb-2">Create Your Wedding</h2>
            <p className="text-gray-600">Set up your beautiful Indian wedding page</p>
          </div>
          
          {submitMessage && (
            <div className={`p-4 rounded-lg mb-6 ${submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bride's Name</label>
                <input
                  type="text"
                  name="brideName"
                  value={formData.brideName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                  placeholder="Enter bride's name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Groom's Name</label>
                <input
                  type="text"
                  name="groomName"
                  value={formData.groomName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                  placeholder="Enter groom's name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                placeholder="+91 9876543210"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Wedding Date</label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Photo Upload Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                  placeholder="Set secure password"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Details</label>
              <textarea
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indian-gold focus:outline-none"
                placeholder="Wedding venue address in Delhi"
              ></textarea>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('landing')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indian-red to-maharaja-red text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Wedding...' : 'Create Wedding Page'}
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
    <div className="min-h-screen mandala-bg py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-8 border-saffron">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-playfair font-bold gradient-text mb-2">Wedding RSVP</h2>
            <p className="text-gray-600">Please confirm your attendance</p>
          </div>
          
          {submitMessage && (
            <div className={`p-4 rounded-lg mb-6 ${submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleRSVPSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={rsvpData.name}
                onChange={handleRSVPChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-saffron focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={rsvpData.email}
                onChange={handleRSVPChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-saffron focus:outline-none"
                placeholder="your.email@gmail.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Will you be attending?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="attending" 
                    value="yes" 
                    checked={rsvpData.attending === 'yes'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>Yes, I will be there! 🎉</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="attending" 
                    value="no" 
                    checked={rsvpData.attending === 'no'}
                    onChange={handleRSVPChange}
                    className="mr-2" 
                  />
                  <span>Sorry, I can't make it 😢</span>
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
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('landing')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-saffron to-deep-orange text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
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
    </div>
  )
}

export default App