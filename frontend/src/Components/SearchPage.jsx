import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Rating from 'react-rating-stars-component'

import {useParams} from 'react-router-dom'
import axios from 'axios'
import SearchCard from './Cards/SearchCard'

function SearchPage() {
    return (
        <div>
            <SearchCard />
        </div>
    )
}

export default SearchPage
