import {autoinject, bindable} from 'aurelia-framework';

@autoinject()
export class Card {

    @bindable value: string = "30°";
    @bindable caption: string = "Temperatur";
    @bindable iconName: string;
}
