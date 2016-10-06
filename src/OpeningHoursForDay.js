import { hasTimeRangeOverlap } from './lib/Validation';
import TimeRange from './TimeRange';

class OpeningHoursForDay {
    constructor() {
        this._openingHours = [];
    }

    static fromStrings(strings) {
        const openingHoursForDay = new OpeningHoursForDay();

        openingHoursForDay._guardAgainstTimeRangeOverlaps(strings);

        openingHoursForDay._openingHours = strings.map(string => TimeRange.fromString(string));

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
        if (hasTimeRangeOverlap(openingHours)) {
            throw new Error('Time ranges aren\'t allowed to overlap.');
        }
    }
}

export default OpeningHoursForDay;
