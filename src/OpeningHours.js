import { forEach, forIn, mapValues } from 'lodash';
import { isValidDateString, isValidDayName } from './lib/Validation';
import Day from './lib/Day';
import OpeningHoursForDay from './OpeningHoursForDay';

class OpeningHours {
    constructor() {
        this._openingHours = {};
        Day.days().forEach(day => this._openingHours[day] = new OpeningHoursForDay());
    }

    static create(data) {
        return (new OpeningHours()).fill(data);
    }

    fill(data) {
        const { openingHours, exceptions } = this._parseOpeningHoursAndExceptions(data);

        forEach(openingHours, (openingHours, day) => {
            this._setOpeningHoursFromStrings(day, openingHours);
        });

        this._setExceptionsFromStrings(exceptions);

        return this;
    }

    forWeek() {
        return this._openingHours;
    }

    forDay(day) {
        day = this._normalizeDayName(day);

        return this._openingHours[day];
    }

    exceptions() {
        return this._exceptions;
    }

    isOpenOn(day) {
        return this.forDay(day).openingHours.length > 0;
    }

    isClosedOn(day) {
        return this.isOpenOn(day);
    }

    _parseOpeningHoursAndExceptions(data) {
        const { exceptions = [], ...openingHours } = data;

        forEach(openingHours, (openingHoursData, day) => {
            openingHours[this._normalizeDayName(day)] = openingHoursData;
        });

        return { openingHours, exceptions };
    }

    _setOpeningHoursFromStrings(day, openingHours) {
        day = this._normalizeDayName(day);

        this._openingHours[day] = OpeningHoursForDay.fromStrings(openingHours);
    }

    _setExceptionsFromStrings(exceptions) {
        forIn(exceptions, (_, date) => {
            if (! isValidDateString(date)) {
                throw new Error(`Exception \`${date}\` isn't a valid date string. ` +
                    'Date strings must be formatted as `YYYY-MM-DD`, e.g. `2016-10-06`.');
            }
        });

        this._exceptions = mapValues(exceptions, (openingHours) => {
            return OpeningHoursForDay.fromStrings(openingHours);
        });
    }

    _normalizeDayName(day) {
        day = day.toLowerCase();

        if (! isValidDayName(day)) {
            throw new Error(`Day \`${day}\` isn't a valid day name. ` +
                'Valid day names are lowercase english words, e.g. `monday`, `thursday`.');
        }

        return day;
    }
}

export default OpeningHours;
