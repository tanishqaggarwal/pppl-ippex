$("#graphbutton").click(function() {
    //Generate graph from collected data
    console.log("graph is being generated");
    Highcharts.chart('coloumb-graph', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Distance from Central Electron'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Maximum Speed Attained'
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: [coloumb_data_series]
    });
});