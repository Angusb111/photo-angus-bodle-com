import InstaButton from "./components/InstaButton"
import myHeroW from './assets/logo_white.png'

function Header({ albumName }) {
  return (
    <div className="sticky max-w-lvw">
    
        <div className="flex top-0 columns-2 items-center p-4">
            <div className="flex w-6/10 items-center gap-16">
                <img className="h-32" id="pageHeaderLogo" src={myHeroW} alt="Logo" />

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

            <div className="w-4/10 flex justify-end gap-8 p-8">
                <InstaButton />
            </div>
        </div>
        
    </div>
  )
}

export default Header
