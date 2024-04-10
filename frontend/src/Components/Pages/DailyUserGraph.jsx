import React, {useEffect, useState} from 'react'
import Chart from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
import axios from 'axios'

const DailyUserGraph = () => {
    const [categoryCounts, setCategoryCounts] = useState([])
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        fetchCategoryCounts()
        fetchDailyUserData()
    }, [])

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

    const renderCategoryChart = () => {
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

        return <Doughnut data={data} className="chart" />
    }

    const renderUserChart = () => {
        if (!userData || !userData.countVal || !userData.label) {
            return null
        }

        const data = {
            labels: userData.label,
            datasets: [
                {
                    label: 'Active Daily Users',
                    data: userData.countVal,
                    fill: true,
                    borderColor: 'rgb(13, 13, 29)',
                    tension: 0.5,
                },
            ],
        }

        return <canvas id="dailyUserChart" width="400" height="200"></canvas>
    }

    useEffect(() => {
        if (userData && userData.countVal && userData.label) {
            const ctx = document.getElementById('dailyUserChart')
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: userData.label,
                        datasets: [
                            {
                                label: 'Active Daily Users',
                                data: userData.countVal,
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
            }
        }
    }, [userData])

    return (
        <div className="container mx-auto max-w-screen-lg px-4 py-8">
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
