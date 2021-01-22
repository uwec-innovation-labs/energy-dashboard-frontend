import React, { useEffect } from 'react'
import Chart from "chart.js";

function LineChart({building, energyType, x, y}) {
    //const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        var ctx = document.getElementById('linechart').getContext("2d");
         var gradientFill = ctx.createLinearGradient(0, 0, 0, 600);
         gradientFill.addColorStop(0, "rgba(120, 220, 180, 0.7)");
         gradientFill.addColorStop(1, "rgba(220, 240, 230, .1)");
 
         new Chart(document.getElementById("linechart"), {
             type: 'line',
             data: {
                 labels: x,
                 datasets: [{
                     data: y,
                     label: energyType,
                     borderColor: "rgb(0, 200, 120)",
                     fill: true,
                     backgroundColor: "rgba(0, 200, 120, .5)"
                 }
                 ]
             },
             options: {
                 scales: {
                     xAxes: [{
                         type: 'time',
                         time: {
                             unit: 'hour'
                         }
                     }],
                     yAxes: [{
                     }]
                 }
             }
         });
    })

    return (
        <>
            <canvas id="linechart"></canvas>
        </>
    )
}

export default LineChart