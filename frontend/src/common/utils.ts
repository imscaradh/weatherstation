import * as numeral from 'numeral';

export class Utils {

    public static floatFormatter(val: any, precision: number = 1) {
        return val ? numeral(val).format(`0.${Array(precision + 1).join('0')}`) : '-';
    }
}
