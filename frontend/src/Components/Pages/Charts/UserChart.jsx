import React, {useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2'

function UserChart() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        fetchDailyUserData()
    }, [])

    const fetchDailyUserData = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/admin/dailyUser',
            )
            const data = await response.json()
            setUserData(data)
        } catch (error) {
            console.error('Error fetching daily user data:', error)
        }
    }

    if (!userData) return null

    const dates = userData.map((entry) => entry.date)
    const userCounts = userData.map((entry) => entry.count)

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Daily User Count',
                data: userCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <div>
            <h2>Daily User Chart</h2>
            <Bar data={data} options={options} />
        </div>
    )
}

export default UserChart
