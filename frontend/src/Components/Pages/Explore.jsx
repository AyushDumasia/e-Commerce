import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Skeleton.css'
import ExploreCard from './../Cards/ExploreCard'
import CustomToastContainer from './../Toast/CustomToastContainer'

function Explore() {
    return (
        <div className="flex p-7 pl-3">
            <CustomToastContainer />
            <ExploreCard />
        </div>
    )
}

export default Explore
