import {autoinject} from 'aurelia-framework';
import {bindable} from 'aurelia-templating';
import * as $ from 'jquery';

@autoinject()
export class Modal {

    @bindable public ref: any;
    @bindable public title: string;
    @bindable public saveAction: any;

    public show() {
        $(this.ref).modal('show');
    }

    public hide() {
        $(this.ref).modal('hide');
    }
}
