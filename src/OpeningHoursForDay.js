import { createUniquePairs } from './util';
import TimeRange from './TimeRange';

class OpeningHoursForDay {
    constructor() {
        this._openingHours = [];
    }

    static fromStrings(strings) {
        const openingHoursForDay = new OpeningHoursForDay();

        const timeRanges = strings.map(string => TimeRange.fromString(string));

        openingHoursForDay._guardAgainstTimeRangeOverlaps(timeRanges);

        openingHoursForDay._openingHours = timeRanges;

        return openingHoursForDay;
    }

    get openingHours() {
        return this._openingHours;
    }

    isOpenAt(time) {
        for (let timeRange of this.openingHours) {
            if (timeRange.containsTime(time)) {
                return true;
            }
        }

        return false;
    }

    _guardAgainstTimeRangeOverlaps(openingHours) {
        createUniquePairs(openingHours).forEach(([rangeA, rangeB]) => {
            if (rangeA.overlaps(rangeB)) {
                throw new Error(`Time ranges ${rangeA} and ${rangeB} overlap.`);
            }
        });
    }
}

export default OpeningHoursForDay;
