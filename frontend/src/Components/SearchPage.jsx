import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Rating from 'react-rating-stars-component'

import {useParams} from 'react-router-dom'
import axios from 'axios'
import SearchCard from './Cards/SearchCard'
import VerticalBar from './Cards/VerticalBar'
import FilterCard from './Cards/FilterCard'

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
