import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch, useSelector} from 'react-redux'
import {setExploreCard} from '../redux/explore/exploreSlice.jsx'
import './Skeleton.css'
import ExploreCard from './Cards/ExploreCard.jsx'
import PaginationFooter from './Footer/PaginationFooter.jsx'

function Explore() {
    return (
        <div className="flex p-7">
            <ToastContainer />
            <ExploreCard />
            <PaginationFooter />
        </div>
    )
}

export default Explore
