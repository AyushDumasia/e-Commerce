import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Line, Bar, Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
function Dashboard() {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/dashboard/dailyUser',
            )
            console.log(response.data.data)
            setUserData(response.data.data) // Update the state with fetched data
        } catch (err) {
            console.log(err)
        }
    }

    // Prepare data for the line graph
    // const data = {
    //     labels: userData.map((entry) => entry.date), // Assuming each data entry has a 'date' field
    //     datasets: [
    //         {
    //             label: 'Daily Users',
    //             data: userData.map((entry) => entry.count), // Assuming each data entry has a 'count' field
    //             fill: false,
    //             borderColor: 'rgb(75, 192, 192)',
    //             tension: 0.1,
    //         },
    //     ],
    // }

    // const options = {
    //     scales: {
    //         x: {
    //             type: 'category',
    //             labels: data.labels,
    //         },
    //     },
    // }

    return (
        <div>
            <h2>Line Graph Example</h2>
            <Line
                data={{
                    labels: [
                        'sunday',
                        'monday',
                        'tuesday',
                        'wednesday',
                        'thursday',
                        'friday',
                        'saturday',
                    ],
                    datasets: [
                        {
                            label: 'Reference',
                            data: [200, 300, 10],
                        },
                    ],
                }}
            />
        </div>
    )
}

export default Dashboard
