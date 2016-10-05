import { OpeningHoursForDay, Time } from '../src';
import { assert } from 'chai';

describe('OpeningHoursForDay', () => {

    it('can be created from an array of time range strings', () => {
        const openingHoursForDay = OpeningHoursForDay.fromStrings(['09:00-12:00', '13:00-18:00']);
        assert.lengthOf(openingHoursForDay.openingHours, 2);
        assert.strictEqual(openingHoursForDay.openingHours[0].toString(), '09:00-12:00');
        assert.strictEqual(openingHoursForDay.openingHours[1].toString(), '13:00-18:00');
    });

    it('cant be created when time ranges overlap', () => {
        assert.throws(() => {
            OpeningHoursForDay.fromStrings(['09:00-18:00', '14:00-20:00']);
        });
    });

    it('can determine whether its open at a time', () => {
        const openingHoursForDay = OpeningHoursForDay.fromStrings(['09:00-18:00']);
        assert.isTrue(openingHoursForDay.isOpenAt(Time.fromString('09:00')));
        assert.isFalse(openingHoursForDay.isOpenAt(Time.fromString('08:00')));
        assert.isFalse(openingHoursForDay.isOpenAt(Time.fromString('18:00')));
    });
});
