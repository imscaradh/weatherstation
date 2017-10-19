import {Component} from '@angular/core';


@Component({
    selector: 'alerts',
    templateUrl: './alerts.html'
})
export class Alerts {
    // alerts: any[] = [{
    //   type: 'success',
    //   msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    // }, {
    //   type: 'danger',
    //   msg: 'Found a bug? Create an issue with as many details as you can.'
    // }];
    alerts: any[];


    addCriticalAlert(value: String) {
        this.alerts.push({
            type: 'danger',
            msg: value
        });
    }

    addSuccessAlert(value: String) {
        this.alerts.push({
            type: 'success',
            msg: value
        });
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }
}
