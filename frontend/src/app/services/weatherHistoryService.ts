import {Injectable} from "@angular/core";
import $ from "jquery";

@Injectable()
export class WeatherHistoryService {
    weatherHistory: any[];

    subscribe(interval, onReceiveData = null) {
        let restCall = () =>
            $.get({url: 'http://localhost:5000/api/weather/history'},
                (data, status) => {
                    if (status == "success") {
                        this.weatherHistory = data;
                        if (typeof onReceiveData === "function") onReceiveData(data);
                    } else {
                        console.error("Cannot fetch weather history");
                    }
                }
            );

        restCall();
        window.setInterval(restCall, interval);
    }
}

