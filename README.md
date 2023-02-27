# moment-round-es

This is a plugin for [moment.js][moment] and will round date/time to a given interval.

This is a fork of https://github.com/harmvandeven/moment-round. Thus, credits to Thomas Vanderhaeghen.
This fork targets to be used in EcmaScript 6 Syntax and TypeScript. In opposite to the origin project, this repository 
is not supporting gulp or bower. If you need support for gulp or bower, please visit the origin project.


## Examples

``` typescript
import moment from "moment";
import "moment-round-es";

const m = moment(); 
m.format( 'YYYY-MM-DD HH:mm:ss.SSS' ); 								// 2015-06-18 15:30:19.123
m.round( 100, 'milliseconds' ).format( 'YYYY-MM-DD HH:mm:ss.SSS' ); // 2015-06-18 15:30:20.100
m.round(5, 'seconds').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); 			// 2015-06-18 15:30:20.000
m.ceil(3, 'minutes').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); 			// 2015-06-18 15:33:00.000
m.floor(16, 'hours').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); 			// 2015-06-18 00:00:00.000
m.ceil(21, 'hours').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); 			// 2015-06-18 21:00:00.000
m.ceil(20, 'hours').format( 'YYYY-MM-DD HH:mm:ss.SSS' ); 			// 2015-06-19 00:00:00.000
```

Possible values to round to are `hours`, `minutes`, `seconds`, `milliseconds`

###Alias values
As it makes unnecessary redundancy this package is only supporting plural namings.

``` javascript
mm --> milliseconds
Milliseconds --> milliseconds
s --> seconds
Seconds --> seconds
m --> minutes
Minutes --> minutes
h --> hours
H --> hours
Hours --> hours
```

## Installation


### Node /NPM


``` sh
npm install moment-round-es
```

And then `import` it:

``` typescript
import moment from 'moment';
// or (depends on)
import * as moment from "moment";
import "moment-round-es";
```

## Running tests
```
npm test
```

## License

moment-round-es is [LICENSED][license].

[license]: https://creativecommons.org/licenses/by-sa/3.0/us/
[moment]: http://momentjs.com/
