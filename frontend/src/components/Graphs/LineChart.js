import React, { useEffect } from 'react'
import Chart from "chart.js";
import axios from 'axios'

function LineChart({building, energyType}) {
    //const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        let dnotsorted = data.data.energyDataPoints;
        const d = dnotsorted.sort((a, b) => a.dateTimeUnix - b.dateTimeUnix)

        let i;
        let x = [];
        let y = [];
        for (i = 0; i < d.length; i++) {
            x.push(new Date(d[i].dateTimeUnix * 1000));
            y.push(d[i].value)
        }

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

        axios({
            url: process.env.REACT_APP_IP,
            method: 'post',
            data: {
              query: `
              query {
                energyDataPoints(input:{building:"library",dateLow:0, dateHigh:1601739000, energyType:"solar", energyUnit:"kwh"}) {
                  value,
                  building,
                  dateTimeUnix,
                  unit,
                  type
                }
              }
                `
            }
          }).then((result) => {
            //console.log(result.data)
          });
    })

    return (
        <>
            <canvas id="linechart"></canvas>
        </>
    )
}

export default LineChart


const data = {
    "data": {
      "energyDataPoints": [
        {
            "value": 557983,
            "building": "library",
            "dateTimeUnix": 1601652603,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558025,
            "building": "library",
            "dateTimeUnix": 1601653500,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558068,
            "building": "library",
            "dateTimeUnix": 1601654415,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558113,
            "building": "library",
            "dateTimeUnix": 1601655303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558157,
            "building": "library",
            "dateTimeUnix": 1601656200,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558201,
            "building": "library",
            "dateTimeUnix": 1601657103,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558246,
            "building": "library",
            "dateTimeUnix": 1601658014,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558292,
            "building": "library",
            "dateTimeUnix": 1601658903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558335,
            "building": "library",
            "dateTimeUnix": 1601659800,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558381,
            "building": "library",
            "dateTimeUnix": 1601660703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558427,
            "building": "library",
            "dateTimeUnix": 1601661614,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558472,
            "building": "library",
            "dateTimeUnix": 1601662500,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558515,
            "building": "library",
            "dateTimeUnix": 1601663403,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558558,
            "building": "library",
            "dateTimeUnix": 1601664303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558600,
            "building": "library",
            "dateTimeUnix": 1601665214,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558644,
            "building": "library",
            "dateTimeUnix": 1601666100,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558688,
            "building": "library",
            "dateTimeUnix": 1601667003,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558733,
            "building": "library",
            "dateTimeUnix": 1601667903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558778,
            "building": "library",
            "dateTimeUnix": 1601668805,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558823,
            "building": "library",
            "dateTimeUnix": 1601669703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558867,
            "building": "library",
            "dateTimeUnix": 1601670603,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558910,
            "building": "library",
            "dateTimeUnix": 1601671503,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558953,
            "building": "library",
            "dateTimeUnix": 1601672406,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 558995,
            "building": "library",
            "dateTimeUnix": 1601673303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559037,
            "building": "library",
            "dateTimeUnix": 1601674203,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559076,
            "building": "library",
            "dateTimeUnix": 1601675100,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559114,
            "building": "library",
            "dateTimeUnix": 1601676014,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559150,
            "building": "library",
            "dateTimeUnix": 1601676903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559184,
            "building": "library",
            "dateTimeUnix": 1601677803,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559211,
            "building": "library",
            "dateTimeUnix": 1601678700,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559244,
            "building": "library",
            "dateTimeUnix": 1601679614,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559277,
            "building": "library",
            "dateTimeUnix": 1601680503,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559310,
            "building": "library",
            "dateTimeUnix": 1601681400,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559344,
            "building": "library",
            "dateTimeUnix": 1601682303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559380,
            "building": "library",
            "dateTimeUnix": 1601683214,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559416,
            "building": "library",
            "dateTimeUnix": 1601684103,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559451,
            "building": "library",
            "dateTimeUnix": 1601685000,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559487,
            "building": "library",
            "dateTimeUnix": 1601685903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559522,
            "building": "library",
            "dateTimeUnix": 1601686814,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559556,
            "building": "library",
            "dateTimeUnix": 1601687700,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559591,
            "building": "library",
            "dateTimeUnix": 1601688603,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559626,
            "building": "library",
            "dateTimeUnix": 1601689503,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559661,
            "building": "library",
            "dateTimeUnix": 1601690415,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559696,
            "building": "library",
            "dateTimeUnix": 1601691300,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559731,
            "building": "library",
            "dateTimeUnix": 1601692203,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559764,
            "building": "library",
            "dateTimeUnix": 1601693103,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559796,
            "building": "library",
            "dateTimeUnix": 1601694005,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559828,
            "building": "library",
            "dateTimeUnix": 1601694903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559861,
            "building": "library",
            "dateTimeUnix": 1601695803,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559892,
            "building": "library",
            "dateTimeUnix": 1601696703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559924,
            "building": "library",
            "dateTimeUnix": 1601697606,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559955,
            "building": "library",
            "dateTimeUnix": 1601698503,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 559986,
            "building": "library",
            "dateTimeUnix": 1601699403,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560017,
            "building": "library",
            "dateTimeUnix": 1601700300,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560048,
            "building": "library",
            "dateTimeUnix": 1601701214,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560079,
            "building": "library",
            "dateTimeUnix": 1601702103,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560110,
            "building": "library",
            "dateTimeUnix": 1601703003,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560137,
            "building": "library",
            "dateTimeUnix": 1601703900,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560167,
            "building": "library",
            "dateTimeUnix": 1601704814,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560199,
            "building": "library",
            "dateTimeUnix": 1601705703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560230,
            "building": "library",
            "dateTimeUnix": 1601706600,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560261,
            "building": "library",
            "dateTimeUnix": 1601707503,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560292,
            "building": "library",
            "dateTimeUnix": 1601708417,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560323,
            "building": "library",
            "dateTimeUnix": 1601709303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560355,
            "building": "library",
            "dateTimeUnix": 1601710200,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560386,
            "building": "library",
            "dateTimeUnix": 1601711103,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560417,
            "building": "library",
            "dateTimeUnix": 1601712015,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560449,
            "building": "library",
            "dateTimeUnix": 1601712900,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560479,
            "building": "library",
            "dateTimeUnix": 1601713803,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560511,
            "building": "library",
            "dateTimeUnix": 1601714703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560542,
            "building": "library",
            "dateTimeUnix": 1601715616,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560573,
            "building": "library",
            "dateTimeUnix": 1601716500,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560605,
            "building": "library",
            "dateTimeUnix": 1601717403,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560637,
            "building": "library",
            "dateTimeUnix": 1601718303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560668,
            "building": "library",
            "dateTimeUnix": 1601719205,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560701,
            "building": "library",
            "dateTimeUnix": 1601720103,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560735,
            "building": "library",
            "dateTimeUnix": 1601721003,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560769,
            "building": "library",
            "dateTimeUnix": 1601721903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560804,
            "building": "library",
            "dateTimeUnix": 1601722805,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560839,
            "building": "library",
            "dateTimeUnix": 1601723703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560875,
            "building": "library",
            "dateTimeUnix": 1601724603,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560912,
            "building": "library",
            "dateTimeUnix": 1601725500,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560949,
            "building": "library",
            "dateTimeUnix": 1601726444,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 560982,
            "building": "library",
            "dateTimeUnix": 1601727303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561015,
            "building": "library",
            "dateTimeUnix": 1601728203,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561049,
            "building": "library",
            "dateTimeUnix": 1601729100,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561082,
            "building": "library",
            "dateTimeUnix": 1601730015,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561114,
            "building": "library",
            "dateTimeUnix": 1601730903,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561141,
            "building": "library",
            "dateTimeUnix": 1601731803,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561173,
            "building": "library",
            "dateTimeUnix": 1601732703,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561205,
            "building": "library",
            "dateTimeUnix": 1601733614,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561237,
            "building": "library",
            "dateTimeUnix": 1601734503,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561268,
            "building": "library",
            "dateTimeUnix": 1601735400,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561300,
            "building": "library",
            "dateTimeUnix": 1601736303,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561330,
            "building": "library",
            "dateTimeUnix": 1601737214,
            "unit": "kwh",
            "type": "electric"
          },
          {
            "value": 561361,
            "building": "library",
            "dateTimeUnix": 1601738103,
            "unit": "kwh",
            "type": "electric"
          }
      ]
    }
}