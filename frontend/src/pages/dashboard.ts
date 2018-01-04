import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Config} from "../environment";
import {Utils} from "../common/utils";
import {App} from "../app";

@autoinject()
export class Dashboard {
    private getCompassWinddir = Utils.getCompassWinddir;

    private currentData: any[] = [];
    private historyData: any[] = [];
    private fetcherInterval;

    constructor(private fetchClient: HttpClient,
                private app: App) {
        this.app.loadingActive();
    }

    attached() {
        this.fetchCurrent();
        this.fetchHistory();
    }

    detached() {
        window.clearInterval(this.fetcherInterval);
        this.fetcherInterval = null;
    }

    private fetchCurrent() {
        let fetcher = () => this.fetchClient.fetch(`${Config.restEndpoint}/weather/live`)
            .then(response => response.json())
            .then(data => {
                this.currentData = data;
                this.app.loadingInactive();
            });

        fetcher();
        this.fetcherInterval = window.setInterval(fetcher, 5000);
    }

    private fetchHistory() {
        this.fetchClient.fetch(`${Config.restEndpoint}/weather/history`)
            .then(response => response.json())
            .then(data => {
                this.historyData.push([
                    "Zeit",
                    "Luftdruck",
                    "Temp.",
                    "Windricht.",
                    "Windgesch.",
                    "Luftfeu.",
                    "Regen"
                ]);

                data.forEach(v => {
                    this.historyData.push([
                        Utils.dateFormatter(v["timestamp"], "DD.MM.YY HH:00"),
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
