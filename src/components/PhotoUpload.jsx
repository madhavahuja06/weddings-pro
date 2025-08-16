import { useState } from 'react'
import { Camera, Upload, Lock, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const PhotoUpload = ({ onBack }) => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would verify against the wedding's password
    if (password) {
      setIsAuthenticated(true)
      setUploadStatus('Password verified! You can now upload photos.')
    }
  }

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const handleCameraCapture = () => {
    // This would trigger camera capture on mobile devices
    document.getElementById('camera-input').click()
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return
    
    setIsUploading(true)
    setUploadStatus('Uploading photos...')

    try {
      // First, get a wedding ID (in a real app, this would come from context)
      // For demo, let's get the most recent wedding or use a mock ID
      const { data: weddings, error: weddingError } = await supabase
        .from('weddings')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)

      let weddingId
      if (weddings && weddings.length > 0) {
        weddingId = weddings[0].id
      } else {
        // Create a mock wedding ID for demo purposes
        weddingId = crypto.randomUUID()
      }

      const uploadPromises = selectedFiles.map(async (file) => {
        try {
          // Generate unique filename
          const timestamp = Date.now()
          const fileExt = file.name.split('.').pop()
          const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `wedding-photos/${weddingId}/${fileName}`

          // Upload file to Supabase Storage
          const { data: storageData, error: storageError } = await supabase.storage
            .from('wedding-photos')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (storageError) {
            console.error('Storage upload error:', storageError)
            throw new Error(`Storage upload failed: ${storageError.message}`)
          }

          // Save photo metadata to database
          const { data: dbData, error: dbError } = await supabase
            .from('photos')
            .insert([{
              wedding_id: weddingId,
              file_name: file.name,
              file_path: filePath,
              uploaded_by: 'Guest'
            }])
            .select()

          if (dbError) {
            console.error('Database insert error:', dbError)
            throw new Error(`Database insert failed: ${dbError.message}`)
          }

          return { success: true, fileName: file.name, data: dbData }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)
          return { success: false, fileName: file.name, error: error.message }
        }
      })

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises)
      
      // Check results
      const successful = results.filter(r => r.success)
      const failed = results.filter(r => !r.success)

      if (successful.length === selectedFiles.length) {
        setUploadStatus(`🎉 Successfully uploaded ${successful.length} photo(s) to the wedding album!`)
        console.log('All photos uploaded successfully:', successful)
      } else if (successful.length > 0) {
        setUploadStatus(`⚠️ Uploaded ${successful.length} of ${selectedFiles.length} photos. ${failed.length} failed.`)
        console.log('Partial success:', { successful, failed })
      } else {
        setUploadStatus(`❌ Failed to upload photos. Please try again.`)
        console.error('All uploads failed:', failed)
      }

      // Clear selected files after upload attempt
      setSelectedFiles([])

    } catch (error) {
      console.error('Upload process error:', error)
      setUploadStatus(`❌ Upload error: ${error.message}`)
    }

    setIsUploading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen indian-pattern bg-gradient-to-br from-orange-50 to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-2xl p-8 border-t-8 border-deep-orange">
            <div className="text-center mb-8">
              <Lock className="mx-auto mb-4 text-deep-orange" size={48} />
              <h2 className="text-3xl font-playfair font-bold gradient-text mb-2">Wedding Photos</h2>
              <p className="text-gray-600">Enter the password to upload photos</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Wedding Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-deep-orange focus:outline-none"
                  placeholder="Enter password provided by couple"
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-deep-orange to-saffron text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mandala-bg py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-8 border-deep-orange">
          <div className="text-center mb-8">
            <Camera className="mx-auto mb-4 text-deep-orange" size={48} />
            <h2 className="text-3xl font-playfair font-bold gradient-text mb-2">Share Wedding Moments</h2>
            <p className="text-gray-600">Upload photos from the ceremony</p>
            {uploadStatus && (
              <div className={`mt-3 p-3 rounded-lg ${
                uploadStatus.includes('Successfully') || uploadStatus.includes('🎉') 
                  ? 'bg-green-100 text-green-800' 
                  : uploadStatus.includes('❌') || uploadStatus.includes('Failed')
                  ? 'bg-red-100 text-red-800'
                  : uploadStatus.includes('⚠️')
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {uploadStatus.includes('Successfully') && <CheckCircle className="inline mr-2" size={16} />}
                {uploadStatus}
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Desktop/Mobile Upload Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-deep-orange transition-colors">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 mb-4">Upload from device</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelection}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload"
                  className={`bg-gradient-to-r from-deep-orange to-saffron text-white px-6 py-2 rounded-lg cursor-pointer hover:shadow-lg transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isUploading ? 'Uploading...' : 'Choose Photos'}
                </label>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-deep-orange transition-colors">
                <Camera className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 mb-4">Take photo now</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelection}
                  className="hidden"
                  id="camera-input"
                  disabled={isUploading}
                />
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  disabled={isUploading}
                  className={`bg-gradient-to-r from-saffron to-indian-gold text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isUploading ? 'Uploading...' : 'Open Camera'}
                </button>
              </div>
            </div>
            
            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Selected Photos ({selectedFiles.length})</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload Button */}
            {selectedFiles.length > 0 && (
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`w-full bg-gradient-to-r from-deep-orange to-saffron text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`}
              </button>
            )}
            
            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-800 mb-2">📸 Photo Upload Tips</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Photos are saved to Supabase storage and database</li>
                <li>• Best quality photos get the best memories!</li>
                <li>• You can upload multiple photos at once</li>
                <li>• Photos will be available for download after the wedding</li>
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </button>
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="flex-1 bg-indian-red text-white py-3 rounded-lg font-semibold hover:bg-maharaja-red transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoUpload