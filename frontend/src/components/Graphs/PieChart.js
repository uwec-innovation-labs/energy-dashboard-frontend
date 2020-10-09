import React, { useEffect } from 'react'
import Chart from "chart.js";

function LineChart() {
    useEffect(() => {
        new Chart(document.getElementById("piechart"), {
            type: 'doughnut',
            data: {
                labels: ["Library"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["rgb(0, 200, 120)"],
                        data: [2478]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Relative Electricty Usage (All Buildings)'
                }
            }
        });
    }, [])

    return (
        <>
            <canvas id="piechart" height="200"></canvas>
        </>
    )
}

export default LineChart
