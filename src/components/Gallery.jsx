// Gallery.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Gallery({ albumId }) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null) // track which photo is open

  useEffect(() => {
    if (albumId) {
      fetchPhotos(albumId)
    }
  }, [albumId])

  // Fetch all photos for a given album
  async function fetchPhotos(albumId) {
    setLoading(true)
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('album_id', albumId)
      .order('album_position', { ascending: true }) // keep them in order

    if (error) {
      console.error(`Error loading photos for album ${albumId}:`, error)
      alert('Failed to load photos')
    } else {
      setPhotos(data)
    }
    setLoading(false)
  }

  if (loading) return <p>Loading photos...</p>
  if (photos.length === 0) return <p>No photos found in this album.</p>

  const handleClose = () => setSelectedIndex(null)
  const prevPhoto = () => setSelectedIndex((i) => (i > 0 ? i - 1 : photos.length - 1))
  const nextPhoto = () => setSelectedIndex((i) => (i < photos.length - 1 ? i + 1 : 0))

  return (
    <div className="p-3 sm:p-8 max-w-full">
      {/* Grid of photos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {photos.map((photo, idx) => {
          const imageUrl = `https://ghnrakeyvviwyynpxjgm.supabase.co/storage/v1/object/public/images/${photo.filename}`

          return (
            <div key={photo.photo_id} className="cursor-pointer" onClick={() => setSelectedIndex(idx)}>
              <img
                src={imageUrl}
                alt={photo.filename}
                className="w-full shadow-md hover:opacity-80 transition"
              />
              {photo.caption && (
                <p className="flex text-white text-sm pt-2 font-[Lexend] font-light">
                  {photo.caption}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Fullscreen modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative max-w-6xl w-full flex justify-center">
            <img
              src={`https://ghnrakeyvviwyynpxjgm.supabase.co/storage/v1/object/public/images/${photos[selectedIndex].filename}`}
              alt={photos[selectedIndex].filename}
              className="max-h-[90vh] max-w-[95vw] rounded-lg shadow-lg"
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={handleClose}
            >
              &times;
            </button>

            {/* Prev button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold"
              onClick={prevPhoto}
            >
              &#8249;
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold"
              onClick={nextPhoto}
            >
              &#8250;
            </button>
          </div>

          {/* Optional caption under image */}
          {photos[selectedIndex].caption && (
            <div className="absolute bottom-6 text-center w-full">
              <p className="inline-block bg-black/70 text-white px-4 py-2 rounded font-[Lexend] font-light">
                {photos[selectedIndex].caption}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
