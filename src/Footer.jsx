import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import { Link } from "react-router-dom"
import InstaButton from "./components/InstaButton"
import myLogoW from './assets/logow.png'

function Footer() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetchAlbums()
  }, [])

  async function fetchAlbums() {
    const { data, error } = await supabase
      .from("albums")
      .select("album_id, album_name")
      .order("album_name", { ascending: true })

    if (error) {
      console.error("Error fetching albums:", error)
    } else {
      setAlbums(data)
    }
  }

  return (
    <div className="w-vw bg-black bg-center bg-cover justify-self-end flex flex-col justify-center sm:flex-row items-center mt-1 sm:mt-20 text-white">
      {/* Logo section */}
      <div className="w-full sm:w-1/3">
        <div className="p-12 flex flex-row justify-center sm:justify-start">
          <img className="h-32" id="pageHeaderLogo" src={myLogoW} alt="Logo" />
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full sm:w-1/3">
        <div className="p-12 flex flex-col items-center gap-5">
          <InstaButton />
          <p className="font-[Lexend] text-sm">&copy; 2025. Copyright Angus Bodle Media</p>
          
        </div>
      </div>

      {/* Album links grid */}
      <div className="w-full sm:w-1/3 flex flex-row justify-center">
        <div className="flex-shrink">
          <div className="p-12 grid grid-cols-2 gap-3 gap-x-16 text-sm font-[Lexend]">
            {albums.map(album => (
              <Link 
                key={album.album_id} 
                to={`/album/${album.album_id}`} 
                state={{ albumName: album.album_name }}
                className="hover:bg-[rgba(0,166,244,0.6)] p-1 rounded"
              >
                {album.album_name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
