import VerticalBar from './../Cards/VerticalBar'
import SearchCard from './../Cards/SearchCard'
import FilterCard from './../Cards/FilterCard'

function SearchPage() {
    return (
        <div className="overflow-hidden p-7 pl-3 flex">
            <VerticalBar />
            <SearchCard />
            <FilterCard />
        </div>
    )
}

export default SearchPage
