import {autoinject, bindable} from 'aurelia-framework';
import * as ChartJs from "chart.js";

@autoinject()
export class Chart {

    @bindable title: string = "";
    @bindable seriesData: any = [];
    @bindable col: string;
    @bindable lblX: string = "";
    @bindable lblY: string = "";

    private chartDom: any;
    private chart: any;

    attached() {
        const chartConfig = {
            type: 'line',
            data: {
                datasets: [{
                    borderWidth: 2,
                    backgroundColor: "rgba(173,255,47,0.2)",
                    borderColor: "rgba(173,255,47,1)",
                    // hoverBorderColor: "rgba(0,100,0,1)",
                    data: this.seriesData
                }]
            },
            options: {
                title: {display: false},
                legend: {display: false},
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        type: 'time'
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.lblY
                        }
                    }]
                }
            }
        };

        const ctx: any = $(this.chartDom);
        this.chart = new ChartJs(ctx, chartConfig);
    }

    seriesDataChanged(oldValue: any, newValue: any): void {
        if (this.chart) {
            this.chart.config.data.labels = this.seriesData["timestamp"];
            this.chart.config.data.datasets[0].data = this.seriesData[this.col];
            this.chart.update();
        }
    }
}
