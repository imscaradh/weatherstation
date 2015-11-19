$(function () {
    $('.highcharts-legend-item').click(function () {
        $('div[id^="weatherchart"]').each(function () {
            series = $(this).highcharts().series
            for (var i = 0; i < series.length; i++) {
                var axis_visible = series[i].visible;
                if (series[i].yAxis.visible != axis_visible) {
                    series[i].yAxis.update({visible: axis_visible})
                }
            }
        })
    });

    $('div[id^="weatherchart"]').each(function () {
        charts = $(this).highcharts().yAxis;
        for (var i = charts.length - 1; i > 0; i--) {
            charts[i].update({visible: false});
        }
    })
});