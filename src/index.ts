import * as moment from "moment";

export type RoundDirection = "round" | "ceil" | "floor";
export type RoundKey = 'mm' | 'milliseconds'|
    'Milliseconds'|
    's'|
    'seconds'|
    'Seconds'|
    'm'|
    'minutes'|
    'Minutes'|
    'H'|
    'h'|
    'hours'|
    'Hours';
export type RoundKeyValue = {
    [key in RoundKey]: string;
};
export type Method = { name: string, maxValue: number };
export type Methods = { [key: string]: Method };

declare module "moment" {
    interface Moment {
        round(precision: number, key: RoundKey, direction?: RoundDirection): moment.Moment;
        ceil(precision: number, key: RoundKey): moment.Moment;
        floor(precision: number, key: RoundKey): moment.Moment;
    }
}

export const round = (m: moment.Moment, precision: number, key: RoundKey, direction: RoundDirection = "round") => {

    const methods: Methods = {
        hours: { name: 'Hours', maxValue: 24},
        minutes: { name: 'Minutes', maxValue: 60},
        seconds: { name: 'Seconds', maxValue: 60},
        milliseconds: { name: 'Milliseconds', maxValue: 1000}
    };

    const keys: RoundKeyValue = {
        'mm': methods.milliseconds.name,
        'milliseconds': methods.milliseconds.name,
        'Milliseconds': methods.milliseconds.name,
        's': methods.seconds.name,
        'seconds': methods.seconds.name,
        'Seconds': methods.seconds.name,
        'm': methods.minutes.name,
        'minutes': methods.minutes.name,
        'Minutes': methods.minutes.name,
        'H': methods.hours.name,
        'h': methods.hours.name,
        'hours': methods.hours.name,
        'Hours': methods.hours.name
    };

    let value = 0;
    let rounded = false;
    let subRatio = 1;
    let maxValue = Number.MAX_VALUE;

    // make sure key is plural
    if ( key.length > 1 && key !== 'mm' && key.slice( -1 ) !== 's' ) {
        key += 's';
    }

    key = keys[ key ].toLowerCase() as RoundKey;

    //control
    if( !methods[ key ] ){
        throw new Error( 'The value to round is not valid. Possibles ["hours", "minutes", "seconds", "milliseconds"]' );
    }

    const get = 'get' + methods[key].name;
    const set = 'set' + methods[key].name;

    Object.keys(methods).map((k) => {
        if ( k === key ) {
            // @ts-ignore
            value = m._d[ get ]();
            maxValue = methods[ k ].maxValue;
            rounded = true;
        } else if( rounded ) {
            subRatio *= methods[ k ].maxValue;
            // @ts-ignore
            value += m._d[ 'get' + methods[ k ].name ]() / subRatio;
            // @ts-ignore
            m._d[ 'set' + methods[ k ].name ](0);
        }
    });

    value = Math[ direction ]( value / precision ) * precision;
    value = Math.min( value, maxValue );
    // @ts-ignore
    m._d[ set ]( value );

    return m;
};

export const ceil = (m: moment.Moment, precision: number, key: RoundKey) => {
    return round(m, precision, key, 'ceil' );
}

export const floor = (m: moment.Moment, precision: number, key: RoundKey) => {
    return round(m, precision, key, 'floor');
}

(moment as any).fn.round = function(precision: number, key: RoundKey) {
    return round(this, precision, key);
};

(moment as any).fn.ceil = function(precision: number, key: RoundKey) {
    return ceil(this, precision, key);
};

(moment as any).fn.floor = function (precision: number, key: RoundKey) {
    return floor(this, precision, key);
};
