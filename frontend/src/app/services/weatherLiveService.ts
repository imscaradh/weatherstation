import {Injectable} from "@angular/core";
import $ from "jquery";

@Injectable()
export class WeatherLiveService {
    live: any = [];

    subscribe(interval, onReceiveData = null) {
        let restCall = () =>
            $.get({url: 'http://localhost:5000/api/weather/live'},
                (data, status) => {
                    if (status == "success") {
                        this.live = data;
                        if (typeof onReceiveData === "function") onReceiveData(data);
                    } else {
                        console.error("Cannot fetch live weather");
                    }
                }
            );

        restCall();
        window.setInterval(restCall, interval);
    }
}

