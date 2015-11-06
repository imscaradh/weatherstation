$(function () {

    $('.highcharts-legend-item').click(function() {
        series = $('#weatherchart-container').highcharts().series
        for (var i = 0; i < series.length; i++){
            var axis_visible = series[i].visible;
            if (series[i].yAxis.visible != axis_visible){
                series[i].yAxis.update({visible: axis_visible})
            }
        }
    });

    charts = $('#weatherchart-container').highcharts().yAxis;
    for (var i = charts.length - 1; i > 0; i--) {
        charts[i].update({visible: false});
    };
});