import React, {useEffect, useState} from 'react'
import Chart from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
import axios from 'axios'

const DailyUserGraph = () => {
    const [categoryCounts, setCategoryCounts] = useState([])
    const [data, setData] = useState(null)
    const [chart, setChart] = useState(null)

    useEffect(() => {
        fetchDailyUserData()
        fetchCategoryCounts()
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

    const fetchCategoryCounts = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/admin/countCategory',
            )
            setCategoryCounts(response.data)
        } catch (error) {
            console.error('Error fetching category product counts:', error)
        }
    }

    const renderPieChart = () => {
        if (!categoryCounts || categoryCounts.length === 0) {
            return null
        }
        const labels = categoryCounts.map((categoryCount) => categoryCount._id)
        const counts = categoryCounts.map(
            (categoryCount) => categoryCount.count,
        )

        const data = {
            labels: labels,
            datasets: [
                {
                    data: counts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                    ],
                    hoverOffset: 40,
                },
            ],
        }
        return <Doughnut data={data} className="pie-chart" />
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
                                fill: true,
                                borderColor: 'rgb(13, 13, 29)',
                                tension: 0.5,
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
        <div className="container">
            {renderPieChart()}
            <h2 className="title">Active Daily Users</h2>
            <canvas id="dailyUserChart" width="400" height="200"></canvas>
        </div>
    )
}

export default DailyUserGraph
