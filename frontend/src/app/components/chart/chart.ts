import {AfterViewInit, Component, Input} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'chart',
    templateUrl: './chart.html',
    styleUrls: ['./chart.css']
})
export class Chart implements AfterViewInit {
    @Input() chartName: string;

    chartOpts = {
        chart: {
            type: 'line'
        },
        tooltip: {enabled: false},
        credits: {enabled: false},
        title: {text: false},
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                // day: '%d %b %Y'
            }
        },
        yAxis: {title: {text: 'TODO'}},
        plotOptions: {
            line: {
                dataLabels: {enabled: true},
                enableMouseTracking: false
            }
        },
        series: [{data: []}]
    };

    ngAfterViewInit() {
        Highcharts.setOptions({
            global: {
                useUTC: false,
                timezoneOffset: -5
            }
        });

        window[this.chartName] = new Highcharts.Chart(this.chartName, this.chartOpts);
    }
}
