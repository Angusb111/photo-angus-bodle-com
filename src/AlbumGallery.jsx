import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function AlbumGallerys() {
  const [albums, setAlbums] = useState([])
  const [photos, setPhotos] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlbums()
  }, [])

  // Fetch all albums
  async function fetchAlbums() {
    setLoading(true)
    const { data, error } = await supabase
      .from('albums') // Schema-qualified table name
      .select('*')

    if (error) {
      console.error('Error loading albums:', error)
      alert('Failed to load albums')
    } else {
      setAlbums(data)

      // Optionally preload photos
      data.forEach(album => fetchfirstPhoto(album.album_id))
    }
    setLoading(false)
  }

  // Fetch photos for a specific album
  async function fetchfirstPhoto(albumId) {
    const { data, error } = await supabase
      .from('photos')
      .select('filename')
      .eq('album_id', albumId)
      .eq('album_position', '1')

    if (error) {
      console.error(`Error loading photos for album ${albumId}:`, error)
    } else {
      setPhotos(prev => ({
        ...prev,
        [albumId]: data
      }))
    }
  }

  if (loading) return <p>Loading albums...</p>

  return (
    <div className=''>
      <div className="flex flex-col gap-8 px-8">
        {albums.map(album => {
          const albumPhotos = photos[album.album_id] || [];
          const firstPhoto = albumPhotos[0]; // First photo for the album
          const imageUrl = firstPhoto
            ? `https://ghnrakeyvviwyynpxjgm.supabase.co/storage/v1/object/public/images/${firstPhoto.filename}`
            : 'https://placehold.co/300?text=No+Image';

          return (
            <div key={album.album_id} className="">
              <div className="bg-cover bg-center w-160 h-70 rounded-lg" style={{ backgroundImage: `url(${imageUrl})` }} >
                <div className='flex flex-col justify-end size-full w-fill backdrop-saturate-150 backdrop-brightness-70 rounded-lg border border-gray-400'
                style={{
                  background: `linear-gradient(
                    0deg,
                    rgba(0,0,0,0.8) 0%,     /* dark */
                    rgba(0,0,0,0) 60%,      /* transparent */
                    rgba(0,0,0,0) 70%,      /* transparent */
                    rgba(0,0,0,0.5) 100%    /* dark */
                  )`
                }}
                >
                  <div className='p-8 flex flex-row justify-between'>
                    <p className='text-5xl font-[Coolvetica]'>{album.album_name}</p>
                  </div>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}