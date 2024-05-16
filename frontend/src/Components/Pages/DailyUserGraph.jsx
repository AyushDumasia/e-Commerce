import React, {useEffect, useState} from 'react'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory'
import axios from 'axios'
import {Doughnut} from 'react-chartjs-2'

const DailyUserGraph = () => {
    const [categoryCounts, setCategoryCounts] = useState([])
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        fetchCategoryCounts()
        fetchDailyUserData()
    }, [])

    const fetchCategoryCounts = async () => {
        try {
            const response = await axios.get('/api/admin/countCategory')
            setCategoryCounts(response.data)
        } catch (error) {
            console.error('Error fetching category product counts:', error)
        }
    }

    const fetchDailyUserData = async () => {
        try {
            const response = await fetch('/api/admin/dailyUser')
            const data = await response.json()
            setUserData(data)
        } catch (error) {
            console.error('Error fetching daily user data:', error)
        }
    }

    const renderCategoryChart = () => {
        if (!categoryCounts || categoryCounts.length === 0) {
            return null
        }

        const data = categoryCounts.map((categoryCount) => ({
            x: categoryCount._id,
            y: categoryCount.count,
        }))

        return (
            <VictoryChart domainPadding={20}>
                <VictoryBar
                    data={data}
                    style={{data: {fill: 'rgba(54, 162, 235)'}}}
                />
                <VictoryAxis tickFormat={(x) => x} />
                <VictoryAxis dependentAxis />
            </VictoryChart>
        )
    }

    const renderUserChart = () => {
        if (!userData || !userData.countVal || !userData.label) {
            return null
        }

        const data = userData.label.map((label, index) => ({
            x: label,
            y: userData.countVal[index],
        }))

        return (
            <VictoryChart domainPadding={20}>
                <VictoryBar
                    data={data}
                    style={{data: {fill: 'rgb(13, 13, 29)'}}}
                />
                <VictoryAxis tickFormat={(x) => x} />
                <VictoryAxis dependentAxis />
            </VictoryChart>
        )
    }

    return (
        <div className="container mx-auto max-w-screen-lg ">
            <div className="grid grid-cols-2 gap-8">
                <div className="chart-container bg-white shadow-md rounded-md p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Product Categories
                    </h2>
                    {renderCategoryChart()}
                </div>
                <div className="chart-container bg-white shadow-md rounded-md p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Active Daily Users
                    </h2>
                    {renderUserChart()}
                </div>
            </div>
        </div>
    )
}

export default DailyUserGraph
