import {autoinject, PLATFORM} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {Alert} from './components/alert';

@autoinject()
export class App {
    public router: Router;
    public alerts: Alert;
    public globalVars: any = {};

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
            }
        ]);

        this.router = router;
    }
}
