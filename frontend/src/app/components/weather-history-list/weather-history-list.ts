import {Component, Input} from '@angular/core';
import {WeatherHistoryService} from "../../services/weatherHistoryService";


@Component({
    selector: 'server-list-view',
    templateUrl: './weather-history-list.html'
})
export class WeatherHistoryList {
    @Input() model: any[];

    constructor(private weatherHistoryService: WeatherHistoryService) {
        this.weatherHistoryService = weatherHistoryService;
        this.weatherHistoryService.subscribe(60 * 1000);
    }
}
