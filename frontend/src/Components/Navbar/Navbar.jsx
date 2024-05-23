import {Link} from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import List from './List'
import SignInButton from './SignInButton.jsx'

function Navbar() {
    return (
        <nav className="bg-[#fafafa] text-black p-2 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <Link to="/" className="text-2xl ml-[40px] font-semibold">
                        eCommerce
                    </Link>
                </div>

                <div className="flex items-center w-[400px] ml-3 sm:hidden">
                    <SearchBar />
                </div>

                <div className="flex w-[250px] justify-between items-center font-bold">
                    <ul className="flex font-semibold space-x-4 mr-3">
                        <List goto="/" content="Home" />
                    </ul>
                    <ul className="flex font-semibold space-x-4 ">
                        <List goto="/explore/1" content="Explore" />
                    </ul>
                    <SignInButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
