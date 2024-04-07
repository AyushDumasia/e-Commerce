import React, {useEffect, useState} from 'react'
import Chart from 'chart.js/auto'

const DailyUserGraph = () => {
    const [data, setData] = useState(null)
    const [chart, setChart] = useState(null)

    useEffect(() => {
        fetchDailyUserData()
    }, [])

    const fetchDailyUserData = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/admin/dailyUser',
            )
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        if (data && data.countVal && data.label) {
            const ctx = document.getElementById('dailyUserChart')
            if (ctx) {
                const newChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.label,
                        datasets: [
                            {
                                label: 'Active Daily Users',
                                data: data.countVal,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                })
                setChart(newChart)
            }
        }
    }, [data])

    return (
        <div>
            <h2>Active Daily Users</h2>
            <canvas id="dailyUserChart" width="400" height="200"></canvas>
        </div>
    )
}

export default DailyUserGraph
