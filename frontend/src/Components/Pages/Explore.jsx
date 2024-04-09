import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Skeleton.css'
import ExploreCard from './../Cards/ExploreCard'

function Explore() {
    return (
        <div className="flex p-7 pl-3">
            <ToastContainer />
            <ExploreCard />
        </div>
    )
}

export default Explore
