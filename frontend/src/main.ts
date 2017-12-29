import {Aurelia, PLATFORM} from 'aurelia-framework';


export function configure(aurelia: Aurelia) {
    const env = process.env.NODE_ENV !== 'production' ? 'development' : 'production';
    console.log(`Using ${env} configurations...`);

    // Configure Aurelia
    if (env === 'development') {
        aurelia.use.developmentLogging();
    }

    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-validation'));

    // Starting up the Aurelia application
    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
