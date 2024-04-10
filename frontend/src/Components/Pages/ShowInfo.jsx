import CustomToastContainer from './../Toast/CustomToastContainer'
import ProductCard from './../Cards/ProductCard'
import FeedbackCard from './../Cards/FeedbackCard'
import FeedbackForm from './../Cards/Forms/FeedbackForm'
import SuggestionCard from './../Cards/SuggestionCard'

function ShowInfo() {
    return (
        <div className="container mx-auto px-4 py-8">
            <CustomToastContainer />
            <ProductCard />
            <FeedbackCard />
            <FeedbackForm />
            <SuggestionCard />
        </div>
    )
}

export default ShowInfo
