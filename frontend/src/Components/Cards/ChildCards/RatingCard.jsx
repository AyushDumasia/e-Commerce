import Rating from 'react-rating-stars-component'
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

function RatingCard({value, size}) {
    const starStyle = {
        marginRight: '3px',
        border: '1px solid transparent',
    }
    return (
        <div>
            <Rating
                value={value.rating}
                count={5}
                size={size}
                activeColor="#FFD700"
                edit={false}
                isHalf={true}
                emptyIcon={<FaRegStar size={size} style={starStyle} />}
                halfIcon={<FaStarHalfAlt size={size} style={starStyle} />}
                filledIcon={<FaStar size={size} style={starStyle} />}
            />
        </div>
    )
}

export default RatingCard
