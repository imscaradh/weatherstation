import {autoinject, bindable} from 'aurelia-framework';

@autoinject()
export class Chart {

    @bindable chartData: any[] = []
}
