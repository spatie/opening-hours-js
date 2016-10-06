import { createUniquePairs } from './Arr';
import { days } from './Day';
import TimeRange from '../TimeRange';

export const hasTimeRangeOverlap = (timeRanges) => {
    for (const [rangeA, rangeB] of createUniquePairs(timeRanges)) {
        if (TimeRange.fromString(rangeA).overlaps(TimeRange.fromString(rangeB))) {
            return true;
        }
    }
    return false;
};

export const isValidDateString = (string) => {
    const parts = string.split('-');

    if (parts.length !== 3) {
        return false;
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    // http://stackoverflow.com/a/8390325/999733

    if((month < 1) || (month > 12)) {
        return false;
    }

    if((day < 1) || (day > 31)) {
        return false;
    }

    if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) {
        return false;
    }

    if((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) {
        return false;
    }

    if((month == 2) && ((year % 100) == 0) && (day > 29)) {
        return false;
    }

    if((month == 2) && (day > 28)) {
        return false;
    }

    return true;
};

export const isValidDayName = (name) => {
    return days().filter(day => day === name).length > 0;
};

export const isValidTimeString = (string) => {
    return string.match('^(([0-1][0-9])|(2[0-4])):[0-5][0-9]$');
};

export const isValidTimeRangeString = (string) => {
    const times = string.split('-');

    if (times.length !== 2) {
        return false;
    }

    return isValidTimeString(times[0]) && isValidTimeString(times[1]);
};

export default {
    hasTimeRangeOverlap,
    isValidDateString,
    isValidDayName,
    isValidTimeString,
    isValidTimeRangeString,
};
