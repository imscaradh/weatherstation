$(function () {
    $('.highcharts-legend-item').click(function () {
        $('div[id^="weatherchart"]').each(function () {
            series = $(this).highcharts().series;
            for (var i = 0; i < series.length; i++) {
                var axis_visible = series[i].visible;
                if (series[i].yAxis.visible != axis_visible) {
                    series[i].yAxis.update({visible: axis_visible})
                }
            }
        })
    });

    $('div[id^="weatherchart"]').each(function () {
        var chart = $(this).highcharts();
        yaxis = chart.yAxis;
        for (var i = 0; i < yaxis.length; i++) {
            if (yaxis[i].series.length == 0) {
                yaxis[i].update({visible: false});
            }
            else {
                var axis_visible = yaxis[i].series[0].visible;
                yaxis[i].update({visible: axis_visible});
            }
        }

        chart.tooltip.options.formatter = function () {
            return this.x + ': <br><b>' + Highcharts.numberFormat(this.y, 2) + '</b>';
        }
    });
});