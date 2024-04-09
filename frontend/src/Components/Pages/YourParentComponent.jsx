import React from 'react'
import DailyUserGraph from './DailyUserGraph'

const YourParentComponent = () => {
    const countArr = {
        countVal: [
            /* array of counts */
        ],
        label: [
            /* array of labels */
        ],
    }

    return (
        <div>
            <h2>Active Daily Users</h2>
            <DailyUserGraph data={countArr} />
        </div>
    )
}

export default YourParentComponent
