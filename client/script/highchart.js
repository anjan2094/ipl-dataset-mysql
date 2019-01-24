
function matchPlayed() {
    var processed_json = new Array();
    fetch('/matchPlayed')
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            drawchart1(data);

        })
}
function winTeam() {
    fetch('/winTeam')
        .then((res) => res.json())
        .then(data => {
            let years = data.reduce(function (acc, cur) {
                if (acc.includes(cur[0])) {
                } else {
                    acc.push(cur[0]);
                }
                return acc;
            }, [])

            let teamList = data.reduce(function (acc, cur) {
                if (acc.includes(cur[1][0])) {
                } else {
                    acc.push(cur[1][0]);
                }
                return acc;
            }, [])

            let plotData = teamList.reduce(function (acc, cur) {
                acc[cur] = []
                return acc;
            }, {})

            let j = 0
            let flag = 0
            let kkkk = data.reduce(function (acc, cur) {

                if (cur[0] === years[j]) {
                    if (flag === 0) {
                        for (let i in plotData) {
                            plotData[i].push(0)
                        }//for
                        flag = 1
                    }//if
                } else {
                    for (let i in plotData) {
                        plotData[i].push(0)
                    }//for
                    j++
                }

                if (teamList.includes(cur[1][0])) {
                    plotData[cur[1][0]].pop()
                    plotData[cur[1][0]].push(cur[1][1])
                }
                return acc;
            }, {})

            let result = []
            for (let i in plotData) {
                result.push({ name: i, data: plotData[i] })
            }
            console.log(years)
            drawchart2(years, result);

        })
}
function extraRuns() {
    fetch('/extraRuns')
        .then((res) => res.json())
        .then(data => {
            let team = data.map(function (name) {
                return name.team;
            })
            let runs = data.map(function (run) {
                return run.total;
            })
            drawchart3(team, runs);
        })
}
function economicalBowler() {
    fetch('/economicalBowler')
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            drawchart4(data);
        })
}
function drawchart1(match) {
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Match played by each year'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Match',
            colorByPoint: true,
            data: match
        }]
    });
}
function drawchart2(year, data) {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'No of winner by each team by each year'
        },
        xAxis: {
            categories: year
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total matches'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: data
    });
}
function drawchart3(team, runs) {
    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Extra Runs conceded by each team in 2016'
        },
        xAxis: {
            categories: team,

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Extra Runs',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: 'runs'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 2016,
            data: runs
        }]
    });
}

function drawchart4(value) {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Bowler economy in 2015'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Economy'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Economy',
            data: value,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}
window.onload = function () {
    document.getElementById('match-played').addEventListener('click', matchPlayed);
    document.getElementById('win-team').addEventListener('click', winTeam);
    document.getElementById('extra-runs').addEventListener('click', extraRuns);
    document.getElementById('economical-bowler').addEventListener('click', economicalBowler);


    $('button').on('click', function () {
        $('button').removeClass('selected')
        $(this).addClass('selected')
    })
}