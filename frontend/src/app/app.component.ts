import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    mobileView: number = 992;
    toggle: boolean = false;

    constructor() {
        this.attachEvents();
    }

    attachEvents() {
        window.onresize = () => {
            if (this.getWidth() >= this.mobileView) {
                if (localStorage.getItem('toggle')) {
                    this.toggle = !!localStorage.getItem('toggle');
                } else {
                    this.toggle = true;
                }
            } else {
                this.toggle = false;
            }
        }
    }

    getWidth() {
        return window.innerWidth;
    }

    toggleSidebar() {
        this.toggle = !this.toggle;
        localStorage.setItem('toggle', this.toggle.toString());
    }
}
