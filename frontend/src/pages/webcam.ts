import {autoinject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Config} from "../environment";

@autoinject()
export class Webcam {

    @bindable imageData: any;
    private fetcherInterval: any;

    constructor(private fetchClient: HttpClient) {
    }

    attached() {
        let fetcher = () => this.fetchClient.fetch(`${Config.restEndpoint}/webcam`)
            .then(response => response.json())
            .then(data => this.imageData = data["img"]);

        fetcher();
        this.fetcherInterval = window.setInterval(fetcher, 5000);
    }

    detached() {
        window.clearInterval(this.fetcherInterval);
        this.fetcherInterval = null;
    }

}
