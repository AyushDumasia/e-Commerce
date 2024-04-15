import {Link} from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import List from './List'
import SignInButton from './SignInButton.jsx'

function Navbar() {
    return (
        <nav className="bg-[#fafafa] text-black p-2 fixed w-full top-0 z-50  border-b">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <Link to="/" className="text-2xl font-bold">
                        eCommerce
                    </Link>
                </div>

                <div className="flex items-center w-[400px] ml-3">
                    <SearchBar />
                </div>

                <div className="flex w-[250px] justify-between items-center font-bold">
                    <ul className="flex space-x-4 mr-3">
                        <List goto="/" content="Home" />
                    </ul>
                    <ul className="flex space-x-4 ">
                        <List goto="/explore" content="Explore" />
                    </ul>
                    <SignInButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
