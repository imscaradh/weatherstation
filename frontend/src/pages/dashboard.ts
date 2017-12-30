import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Config} from "../environment";
import {Utils} from "../common/utils";

@autoinject()
export class Dashboard {

    private currentData: any[] = [];
    private historyData: any[] = [];

    constructor(private fetchClient: HttpClient) {
    }

    attached() {
        this.fetchCurrent();
        this.fetchHistory();
    }

    private fetchCurrent() {
        let fetcher = () => this.fetchClient.fetch(`${Config.restEndpoint}/weather/live`)
            .then(response => response.json())
            .then(data => this.currentData = data);

        fetcher();
        window.setInterval(fetcher, 5000);
    }

    private fetchHistory() {
        this.fetchClient.fetch(`${Config.restEndpoint}/weather/history`)
            .then(response => response.json())
            .then(data => {
                this.historyData.push([
                    "Zeit",
                    "Luftdruck",
                    "Aussentemp.",
                    "Windrichtung",
                    "Windgeschwindigkeit",
                    "Luftfeuchtigkeit",
                    "Regenmenge"
                ]);

                data.forEach(v => {
                    this.historyData.push([
                        v["timestamp"],
                        Utils.floatFormatter(v["pressure"], 2),
                        Utils.floatFormatter(v["outTemp"]),
                        this.getCompassWinddir(v["windDir"]),
                        Utils.floatFormatter(v["windSpeed"]),
                        Utils.floatFormatter(v["outHumidity"]),
                        Utils.floatFormatter(v["rain"], 2)
                    ]);
                });
            });
    }

    private getCompassWinddir(degree: number) {
        const bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];

        let index = degree - 22.5;
        if (index < 0)
            index += 360;
        index = Math.floor(index / 45);

        return (bearings[index]);
    }
}
