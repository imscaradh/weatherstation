import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Config} from "../environment";
import {Utils} from "../common/utils";

@autoinject()
export class Dashboard {
    private getCompassWinddir = Utils.getCompassWinddir;


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
                        Utils.dateFormatter(v["timestamp"], "DD.MM.YY HH:mm:ss"),
                        Utils.floatFormatter(v["pressure"], 2),
                        Utils.floatFormatter(v["outTemp"]),
                        Utils.getCompassWinddir(v["windDir"]),
                        Utils.floatFormatter(v["windSpeed"]),
                        Utils.floatFormatter(v["outHumidity"]),
                        Utils.floatFormatter(v["rain"], 2)
                    ]);
                });
            });
    }


}
