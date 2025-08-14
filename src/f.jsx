<div>
  {(photos[album.album_id] || []).length === 0 ? (
    <p>No photos yet.</p>
  ) : (
    <ul className="space-y-4">
      {photos[album.album_id].map(photo => {
        // Generate public URL for the image
        const imageUrl = `https://ghnrakeyvviwyynpxjgm.supabase.co/storage/v1/object/public/images/${photo.filename}`

        return (
          <li key={photo.id} className="flex flex-col">
            {/* Display the image */}
            <img
              src={imageUrl}
              alt={photo.caption || photo.filename}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              onError={(e) => {
                e.target.src = 'https://placehold.co/300?text=Image+Not+Found'
                console.warn(`Image not found: ${imageUrl}`)
              }}
            />
            {/* Optional caption */}
            {photo.caption && (
              <em className="text-sm text-gray-600 mt-1">— {photo.caption}</em>
            )}
          </li>
        )
      })}
    </ul>
  )}
</div>