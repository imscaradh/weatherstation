import {autoinject, PLATFORM} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {Alert} from './components/alert';
import * as $ from "jquery";

@autoinject()
export class App {
    public router: Router;
    public alerts: Alert;
    public globalVars: any = {};

    private navbarToggler: any;

    constructor() {
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Weatherstation';

        config.map([
            {
                name: 'dashboard',
                route: '',
                title: 'Dashboard',
                moduleId: PLATFORM.moduleName('pages/dashboard'),
                nav: true
            },
            {
                name: 'charts',
                route: 'charts',
                title: 'Charts',
                moduleId: PLATFORM.moduleName('pages/charts'),
                nav: true
            },
            {
                name: 'webcam',
                route: 'webcam',
                title: 'Webcam',
                moduleId: PLATFORM.moduleName('pages/webcam'),
                nav: true
            }
        ]);

        this.router = router;
    }

    navigationChanged(href: any) {
        if ($('.navbar-toggler').is(":visible"))
            $(this.navbarToggler).click();
        window.location.href = href;
    }
}
