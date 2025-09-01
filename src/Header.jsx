import myHeroW from './assets/logo_white.png'

function goBack() {
    history.back()
}

function Header({ albumName, page }) {
  return (
        <div className="flex flex-nowrap top-0 items-center justify-between p-1 sm:p-4 w-full">
            <div className="flex items-center flex-row justify-between sm:justify-start w-full gap-0 sm:gap-16">
                <img className="aspect-418.88/128 h-20 sm:h-32" id="pageHeaderLogo" src={myHeroW} alt="Logo" />

                {/* Only render this block if albumName is truthy */}
                {albumName && (
                <>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 mt-6 hidden sm:block"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 20.247 6-16.5" />
                    </svg>
                    <p className="text-white mt-6 text-2xl font-[Lexend] font-extralight hidden sm:inline-block">
                        {albumName}
                    </p>
                </>
                )}
                {page && (
                <button className='justify-self-end sm:hidden p-5 pt-7' onClick={goBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
                )}

            </div>

        </div>
        
  )
}

export default Header
