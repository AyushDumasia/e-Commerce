import {Link} from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import List from './List'
import SignInButton from './SignInButton.jsx'

function Navbar() {
    return (
        <nav className="bg-[#131921] text-white p-4 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <Link to="/" className="text-2xl font-bold">
                        Logo
                    </Link>
                </div>

                <div className="flex items-center w-[400px] ml-3">
                    <SearchBar />
                </div>

                <div className="flex justify-between items-center ">
                    <ul className="flex space-x-4 ">
                        <List goto="/" content="Home" className="text-[red]" />
                    </ul>
                    <SignInButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
