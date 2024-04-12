import React, {useEffect, useState} from 'react'
import Chart from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
import axios from 'axios'

const DailyOrderChart = () => {
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        fetchOrderData()
    }, [])

    const fetchOrderData = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/admin/countOrder',
            )
            const data = await response.json()

            const dates = data.map((item) => item._id)
            const counts = data.map((item) => item.count)

            setChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'Daily Order Count',
                        data: counts,
                        fill: false,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            })
        } catch (error) {
            console.error('Error fetching order data:', error)
        }
    }

    useEffect(() => {
        if (chartData.labels && chartData.labels.length > 0) {
            const ctx = document.getElementById('dailyOrderChart')
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: chartData,
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
    }, [chartData])

    return (
        <div className="container mx-auto max-w-screen-lg">
                    <h2 className="text-lg font-semibold mb-4">
                        Daily Order Count
                    </h2>
                    <DailyOrderChart />
                </div>
            </div>
        </div>
    )
}

export default DailyOrderChart
