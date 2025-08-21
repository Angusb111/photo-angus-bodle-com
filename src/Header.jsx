import InstaButton from "./components/InstaButton"
import myHeroW from './assets/logo_white.png'

function Header({ albumName }) {
  return (
    <div className="sticky max-w-lvw">
    
        <div className="flex flex-nowrap top-0 columns-2 items-center justify-between p-1 sm:p-4">
            <div className="flex items-center gap-16">
                <img className="aspect-418.88/128 max-h-32" id="pageHeaderLogo" src={myHeroW} alt="Logo" />

                {/* Only render this block if albumName is truthy */}
                {albumName && (
                <>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 mt-6"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 20.247 6-16.5" />
                    </svg>
                    <p className="inline-block text-white mt-6 text-2xl font-[Lexend] font-extralight">
                    {albumName}
                    </p>
                </>
                )}
            </div>

            <div className="flex justify-end gap-8 mt-5 p-4 sm:p-8">
                <InstaButton />
            </div>
        </div>
        
    </div>
  )
}

export default Header
