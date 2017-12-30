import * as numeral from 'numeral';
import * as moment from "moment";

export class Utils {

    public static floatFormatter(val: any, precision: number = 1) {
        return val ? numeral(val).format(`0.${Array(precision + 1).join('0')}`) : '-';
    }

    public static dateFormatter(val: any, format) {
        return moment(val).format(format);
    }

    public static getCompassWinddir(degree: number) {
        const bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];

        let index = degree - 22.5;
        if (index < 0)
            index += 360;
        index = Math.floor(index / 45);

        return (bearings[index]);
    }
}
