import { isValidTimeRangeString } from './lib/Validation';
import Time from './Time';

class TimeRange {
    constructor(start, end) {
        this._start = start;
        this._end = end;
    }

    static fromString(string) {
        if (! isValidTimeRangeString(string)) {
            throw new Error(`The string \`${string}\` isn't a valid time range string. `
                + 'A time string must be a formatted as `H:i-H:i`, e.g. `09:00-18:00`.');
        }

        const times = string.split('-');

        return new TimeRange(Time.fromString(times[0]), Time.fromString(times[1]));
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    spillsOverToNextDay() {
        return this._end.isBefore(this._start);
    }

    containsTime(time) {
        if (this.spillsOverToNextDay()) {
            if (time.isAfter(this._start)) {
                return time.isAfter(this._end);
            }

            return time.isBefore(this._end);
        }

        return time.isSameOrAfter(this._start) && time.isBefore(this._end);
    }

    overlaps(timeRange) {
        return this.containsTime(timeRange.start) || this.containsTime(timeRange.end);
    }

    toString() {
        return `${this._start.toString()}-${this._end.toString()}`;
    }
}

export default TimeRange;
