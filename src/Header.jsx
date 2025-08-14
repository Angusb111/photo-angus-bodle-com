import InstaButton from "./InstaButton"
import ThemeButton from "./ThemeButton"
import myHeroW from '/logo_white.png'

function Header() {

    return (
        <div className="flex columns-2 items-center p-4">
            <div className="flex w-6/10">
                <img className="h-32" id="pageHeaderLogo" src={myHeroW} alt="Logo"></img>
            </div>
            <div className="w-4/10 flex justify-end gap-8 p-8">
                <InstaButton/>
                <ThemeButton/>
            </div>
        </div>
    )

}

export default Header

