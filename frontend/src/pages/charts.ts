import {autoinject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Config} from "../environment";
import {Utils} from "../common/utils";

@autoinject()
export class Charts {

    @bindable tempData: any = [];
    private fetcherInterval;

    constructor(private fetchClient: HttpClient) {
    }

    attached() {
        this.fetchHistory();
    }

    detached() {
        window.clearInterval(this.fetcherInterval);
        this.fetcherInterval = null;
    }

    private fetchHistory() {
        const fetcher = () => this.fetchClient.fetch(`${Config.restEndpoint}/weather/history`)
            .then(response => response.json())
            .then(data => {
                this.tempData = {
                    timestamp: data.map(v => Utils.dateFormatter(v["timestamp"], "YYYY-MM-DD HH:mm:ss")),
                    outTemp: data.map(v => Utils.floatFormatter(v["outTemp"], 3)),
                    windSpeed: data.map(v => Utils.floatFormatter(v["windSpeed"], 3)),
                    rain: data.map(v => Utils.floatFormatter(v["rain"], 3)),
                };
            });

        fetcher();
        this.fetcherInterval = window.setInterval(fetcher, 2000);
    }
}
