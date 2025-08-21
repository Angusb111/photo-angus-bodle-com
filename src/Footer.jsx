import InstaButton from "./components/InstaButton"
import myLogoW from './assets/logow.png'

function Footer() {
  return (
    <div className="w-vw bg-black bg-center bg-cover justify-self-end">
        <div className="w-full sm:w-1/3">
            <div className="p-12">
                <img className="h-32" id="pageHeaderLogo" src={myLogoW} alt="Logo" />
                <p>&copy; 2025. Copyright Angus Bodle Media</p>
            </div>
        </div>
        <div className="w-1/3 ">

        </div>
        <div className="w-1/3 ">

        </div>
    </div>
  )
}

export default Footer
