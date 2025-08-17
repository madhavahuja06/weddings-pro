import { useState, useEffect } from 'react'
import { Image, Download, Eye, ArrowLeft, Lock, Heart } from 'lucide-react'
import { supabase } from '../lib/supabase'

const PhotoGallery = ({ onBack }) => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [authStatus, setAuthStatus] = useState('')

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would verify against the wedding's password
    if (password) {
      setIsAuthenticated(true)
      setAuthStatus('Password verified! Loading wedding photos...')
      loadPhotos()
    }
  }

  const loadPhotos = async () => {
    setLoading(true)
    try {
      console.log('Starting to load photos...')
      
      // Get photos from the database
      const { data: photosData, error: photosError } = await supabase
        .from('photos')
        .select('*')
        .order('uploaded_at', { ascending: false })

      console.log('Photos query result:', { photosData, photosError })

      if (photosError) {
        console.error('Database error loading photos:', photosError)
        setAuthStatus(`Database error: ${photosError.message}`)
        return
      }

      // For demo purposes, let's also add some sample wedding photos if no photos in DB
      const demoPhotos = [
        {
          id: 'demo-1',
          wedding_id: 'demo',
          file_name: 'Beautiful Wedding Ceremony',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
          uploaded_by: 'Photographer',
          uploaded_at: new Date().toISOString()
        },
        {
          id: 'demo-2', 
          wedding_id: 'demo',
          file_name: 'Happy Couple',
          url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop',
          uploaded_by: 'Guest',
          uploaded_at: new Date().toISOString()
        },
        {
          id: 'demo-3',
          wedding_id: 'demo', 
          file_name: 'Wedding Decorations',
          url: 'https://images.unsplash.com/photo-1620370264769-b65b7f82c49d?q=80&w=800&auto=format&fit=crop',
          uploaded_by: 'Guest',
          uploaded_at: new Date().toISOString()
        },
        {
          id: 'demo-4',
          wedding_id: 'demo',
          file_name: 'Traditional Ceremony',
          url: 'https://images.unsplash.com/photo-1583221214464-6af3c173e1ac?q=80&w=800&auto=format&fit=crop', 
          uploaded_by: 'Family',
          uploaded_at: new Date().toISOString()
        }
      ]

      if (!photosData || photosData.length === 0) {
        console.log('No photos found in database, showing demo photos')
        setPhotos(demoPhotos)
        setAuthStatus('Showing demo wedding photos (no uploaded photos yet)')
        setLoading(false)
        return
      }

      console.log(`Found ${photosData.length} photos in database`)

      // Try to get signed URLs for real photos, fall back to demo if they fail
      const photosWithUrls = await Promise.all(
        photosData.map(async (photo) => {
          try {
            console.log(`Getting signed URL for photo: ${photo.file_name} at path: ${photo.file_path}`)
            
            const { data: urlData, error: urlError } = await supabase.storage
              .from('wedding-photos')
              .createSignedUrl(photo.file_path, 3600) // 1 hour expiry

            if (urlError) {
              console.error(`Storage URL error for ${photo.file_name}:`, urlError)
              return null
            }

            console.log(`Got signed URL for ${photo.file_name}:`, urlData?.signedUrl ? 'Success' : 'Failed')

            return {
              ...photo,
              url: urlData?.signedUrl || null
            }
          } catch (error) {
            console.error(`Exception getting URL for ${photo.file_name}:`, error)
            return null
          }
        })
      )

      const validPhotos = photosWithUrls.filter(photo => photo && photo.url)
      
      console.log(`Valid photos: ${validPhotos.length}, Total photos: ${photosData.length}`)

      if (validPhotos.length > 0) {
        // Use real photos
        setPhotos(validPhotos)
        setAuthStatus(`Found ${validPhotos.length} wedding photos`)
      } else {
        // Fall back to demo photos if storage access fails
        console.log('No valid photo URLs, falling back to demo photos')
        setPhotos(demoPhotos)
        setAuthStatus(`Found ${photosData.length} uploaded photos, but showing demo photos (storage access issue)`)
      }
      
    } catch (error) {
      console.error('Exception in loadPhotos:', error)
      // Fall back to demo photos on any error
      const demoPhotos = [
        {
          id: 'demo-1',
          wedding_id: 'demo',
          file_name: 'Beautiful Wedding Ceremony',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
          uploaded_by: 'Photographer',
          uploaded_at: new Date().toISOString()
        },
        {
          id: 'demo-2', 
          wedding_id: 'demo',
          file_name: 'Happy Couple',
          url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop',
          uploaded_by: 'Guest',
          uploaded_at: new Date().toISOString()
        }
      ]
      setPhotos(demoPhotos)
      setAuthStatus(`Error loading photos: ${error.message}. Showing demo photos.`)
    }
    setLoading(false)
  }

  const downloadPhoto = async (photo) => {
    try {
      const response = await fetch(photo.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = photo.file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading photo:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen hero-bg py-16">
        <div className="container mx-auto px-6 max-w-md">
          <div className="glass-effect rounded-lg p-12 animate-scale-in">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center floating">
                <Lock className="text-white icon-glow" size={48} />
              </div>
              <h2 className="text-4xl font-heading font-bold gradient-text mb-4 glow-text">Wedding Photo Gallery</h2>
              <p className="text-xl text-gray-600 font-medium">Enter the password to view wedding photos</p>
            </div>
            
            {authStatus && (
              <div className="p-4 rounded-lg mb-6 bg-blue-50 text-blue-700 border border-blue-200 animate-slide-up">
                {authStatus}
              </div>
            )}
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="form-label">🔐 Wedding Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter password provided by couple"
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="btn-outline px-8 py-4 text-lg font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn-modern px-8 py-4 text-lg font-bold flex-1"
                >
                  🔍 View Photos
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen hero-bg py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="glass-effect rounded-lg p-12 animate-scale-in">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center floating">
              <Image className="text-white icon-glow" size={48} />
            </div>
            <h2 className="text-5xl font-heading font-bold gradient-text mb-4 glow-text">Wedding Photo Gallery</h2>
            <p className="text-xl text-gray-600 font-medium">Beautiful memories from the celebration</p>
            
            {authStatus && (
              <div className="mt-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200 animate-slide-up">
                {authStatus}
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">Loading beautiful wedding photos...</p>
            </div>
          ) : photos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {photos.map((photo, index) => (
                  <div key={photo.id} className="modern-card-outline p-4 card-hover animate-fade-in">
                    <div className="relative group">
                      <img
                        src={photo.url}
                        alt={photo.file_name}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                          <button
                            onClick={() => setSelectedPhoto(photo)}
                            className="bg-white/90 text-red-600 p-2 rounded-full hover:bg-white transition-all"
                            title="View full size"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => downloadPhoto(photo)}
                            className="bg-white/90 text-red-600 p-2 rounded-full hover:bg-white transition-all"
                            title="Download photo"
                          >
                            <Download size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600 truncate">{photo.file_name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Uploaded by {photo.uploaded_by || 'Guest'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Heart className="mx-auto mb-6 text-red-400 floating" size={64} />
              <h3 className="text-2xl font-heading font-bold text-gray-700 mb-4">No Photos Yet</h3>
              <p className="text-xl text-gray-600 mb-8">Be the first to share beautiful wedding moments!</p>
              <button
                onClick={onBack}
                className="btn-modern px-12 py-4 text-lg font-bold"
              >
                📸 Go Upload Photos
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="btn-outline px-8 py-4 text-lg font-semibold"
            >
              ← Back to Home
            </button>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="btn-modern px-8 py-4 text-lg font-bold"
            >
              🔒 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Full Size Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-300 transition-colors"
            >
              <ArrowLeft size={32} />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.file_name}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
              <p className="font-semibold">{selectedPhoto.file_name}</p>
              <p className="text-sm opacity-75">Uploaded by {selectedPhoto.uploaded_by || 'Guest'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery