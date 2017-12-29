import {autoinject, bindable} from 'aurelia-framework';


@autoinject()
export class Grid {

    @bindable gridData: any[] = [];
    private tableComponent: any;

    getHeader() {
        return this.gridData[0];
    }

    getData() {
        return this.gridData.slice(1, this.gridData.length);
    }
}
