import {Component, Input} from '@angular/core';

@Component({
    selector: 'rd-widget-header',
    templateUrl: './rd-widget-header.html'
})
export class RdWidgetHeader {
    @Input()
    title: string;

    @Input()
    icon: string;

    constructor() {
        this.title = '';
        this.icon = '';
    }
}
