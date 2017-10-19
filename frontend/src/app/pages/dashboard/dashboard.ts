import {AfterViewInit, Component} from '@angular/core';
import * as moment from 'moment';
import {RdWidget} from "../../components/rd-widget/rd-widget";
import {RdWidgetBody} from "../../components/rd-widget-body/rd-widget-body";
import {Alerts} from "../../components/alerts/alerts";
import {WeatherHistoryService} from "../../services/weatherHistoryService";
import {Chart} from "../../components/chart/chart";
import {WeatherLiveService} from "../../services/weatherLiveService";

moment.locale("de");


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    providers: [WeatherHistoryService, WeatherLiveService],
    viewProviders: [RdWidget, RdWidgetBody, Alerts, Chart]
})
export class Dashboard implements AfterViewInit {
    weatherLiveService: WeatherLiveService;
    weatherHistoryService: WeatherHistoryService;
    weatherHistory: any[];

    constructor(weatherHistoryService: WeatherHistoryService,
                weatherLiveService: WeatherLiveService) {
        this.weatherHistoryService = weatherHistoryService;
        this.weatherLiveService = weatherLiveService;

    }

    ngAfterViewInit() {

        this.weatherHistoryService.subscribe(60 * 1000, (data) => {
            let chart = window["temp-chart"];
            if (chart.series[0].data.length == 0) {
                console.log(data);
                for (let i of data) {
                    chart.series[0].addPoint([moment(i.timestamp).valueOf(), Number(i.outTemp)]);
                }
            } else {
                // chart.series[0].data.spline();
                chart.series[0].addPoint([moment(data[0].timestamp).valueOf(), Number(data[0].outTemp)]);
            }
        });

        this.weatherLiveService.subscribe(3 * 1000, (data) => {

        });
    }
}
