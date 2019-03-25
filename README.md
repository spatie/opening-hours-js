# opening-hours

[![Latest Version on NPM](https://img.shields.io/npm/v/opening-hours.svg?style=flat-square)](https://npmjs.com/package/opening-hours)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/opening-hours/master.svg?style=flat-square)](https://travis-ci.org/spatie/opening-hours)

Based on [spatie/opening-hours](https://github.com/spatie/opening-hours), you create an object that describes a business' opening hours, which you can query for open or closed on days or specific dates, or use to present the times per day.

## Install

You can install the package via npm:

```bash
$ npm install opening-hours
```

## Usage

A set of opening hours is created by passing in a regular schedule, and a list of exceptions.
```js
import OpeningHours from 'opening-hours';

const openingHours = OpeningHours.create({
    'monday': ['09:00-12:00', '13:00-18:00'],
    'tuesday': ['09:00-12:00', '13:00-18:00'],
    'wednesday': ['09:00-12:00'],
    'thursday': ['09:00-12:00', '13:00-18:00'],
    'friday': ['09:00-12:00', '13:00-20:00'],
    'saturday': ['09:00-12:00', '13:00-16:00'],
    'sunday': [],
    'exceptions': {
        '2016-11-11': ['09:00-12:00'],
        '2016-12-25': [],
        '01-01': [],                // Recurring on each 1st of January
        '12-25': ['09:00-12:00'],   // Recurring on each 25th of December
    },
});
```
The object can be queried for a day in the week, which will return a result based on the regular schedule:
```js
// Open on Mondays
openingHours.isOpenOn('monday'); // true

// Closed on Sundays
openingHours.isOpenOn('sunday'); // false
```
It can also return arrays of opening hours for a week or a day:
```js
// OpeningHoursForDay object for the regular schedule
openingHours.forDay('monday');

// OpeningHoursForDay[] for the regular schedule, keyed by day name
openingHours.forWeek();

// OpeningHoursForDay[] of all exceptions, keyed by date
openingHours.exceptions();
```
It can also be queried for a specific date and time:
```js
const openingHoursForDay = OpeningHoursForDay.fromStrings(['09:00-18:00']);
// Closed because it's before hours:
openingHoursForDay.isOpenAt(new Date('2016-09-26 08:00:00')); // false
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Sebastian De Deyne](https://github.com/sebastiandedeyne) instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
