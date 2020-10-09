import React, { useEffect } from 'react'
import Chart from "chart.js";

function LineChart() {
    useEffect(() => {
        var ctx = document.getElementById('linechart').getContext("2d");
        var gradientFill = ctx.createLinearGradient(0, 0, 0, 600);
        gradientFill.addColorStop(0, "rgba(120, 220, 180, 0.7)");
        gradientFill.addColorStop(1, "rgba(220, 240, 230, .1)");

        new Chart(document.getElementById("linechart"), {
            type: 'line',
            data: {
                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                datasets: [{
                    data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                    label: "Electricity",
                    borderColor: "rgb(0, 200, 120)",
                    fill: true,
                    backgroundColor: "rgba(0, 200, 120, .5)"
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Electricity Usage (Library)'
                }
            }
        });
    }, [])

    return (
        <>
            <canvas id="linechart"></canvas>
        </>
    )
}

export default LineChart
