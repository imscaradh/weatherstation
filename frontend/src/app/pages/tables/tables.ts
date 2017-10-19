import {Component} from '@angular/core';
import {RdWidget} from "../../components/rd-widget/rd-widget";
import {RdWidgetHeader} from "../../components/rd-widget-header/rd-widget-header";
import {RdWidgetBody} from "../../components/rd-widget-body/rd-widget-body";
import {RdWidgetFooter} from "../../components/rd-widget-footer/rd-widget-footer";
import {RdLoading} from "../../components/rd-loading/rd-loading";
import {WeatherHistoryList} from "../../components/weather-history-list/weather-history-list";


@Component({
    selector: 'tables',
    providers: [],
    templateUrl: './tables.html',
    viewProviders: [RdWidget, RdWidgetHeader, RdWidgetBody, RdWidgetFooter, RdLoading, WeatherHistoryList]
})
export class Tables {
    servers: any[];

    constructor() {
    }

    ngOnInit() {
    }
}
