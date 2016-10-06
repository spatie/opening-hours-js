import { isValidTimeString } from './lib/Validation';
import { padStart } from 'lodash';

class Time {
    constructor(hours, minutes) {
        this._hours = hours;
        this._minutes = minutes;
    }

    static fromString(string) {
        if (! isValidTimeString(string)) {
            throw new Error(`The string \`${string}\` isn't a valid time string. `
                + 'A time string must be a formatted as `H:i`, e.g. `06:00`, `18:00`.');
        }

        const [ hours, minutes ] = string.split(':');

        return new Time(parseInt(hours), parseInt(minutes));
    }

    get hours() {
        return this._hours;
    }

    get minutes() {
        return this._minutes;
    }

    isSame(time) {
        return this._hours === time.hours && this._minutes === time.minutes;
    }

    isAfter(time) {
        if (this.isSame(time)) {
            return false;
        }

        if (this._hours > time.hours) {
            return true;
        }

        return this._hours === time.hours && this._minutes >= time.minutes;
    }

    isBefore(time) {
        if (this.isSame(time)) {
            return false;
        }

        return ! this.isAfter(time);
    }

    isSameOrAfter(time) {
        return this.isSame(time) || this.isAfter(time);
    }

    toString() {
        return `${padStart(this._hours, 2, '0')}:${padStart(this._minutes, 2, '0')}`;
    }
}

export default Time;
