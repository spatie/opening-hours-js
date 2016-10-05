import { assert } from 'chai';
import OpeningHours from '../src/OpeningHours';

describe('OpeningHours', () => {

    it('can return the opening hours for a regular week', () => {
        const openingHours = OpeningHours.create({
            monday: ['09:00-18:00'],
        });

        const openingHoursForWeek = openingHours.forWeek();

        assert.strictEqual('09:00-18:00', openingHoursForWeek['monday'].openingHours[0].toString());
        assert.lengthOf(openingHoursForWeek['tuesday'].openingHours, 0);
        assert.lengthOf(openingHoursForWeek['wednesday'].openingHours, 0);
        assert.lengthOf(openingHoursForWeek['thursday'].openingHours, 0);
        assert.lengthOf(openingHoursForWeek['friday'].openingHours, 0);
        assert.lengthOf(openingHoursForWeek['saturday'].openingHours, 0);
        assert.lengthOf(openingHoursForWeek['sunday'].openingHours, 0);
    });

    it('can return the exceptions', () => {
        const openingHours = OpeningHours.create({
            monday: ['09:00-18:00'],
            exceptions: {
                '2016-09-26': [],
            },
        });

        const exceptions = openingHours.exceptions();

        assert.property(exceptions, '2016-09-26');
        assert.lengthOf(exceptions['2016-09-26'].openingHours, 0);
    });

    it('can return the opening hours for a regular week day', () => {
        const openingHours = OpeningHours.create({
            monday: ['09:00-18:00'],
        });

        const openingHoursForMonday = openingHours.forDay('monday');
        assert.lengthOf(openingHoursForMonday.openingHours, 1);
        assert.strictEqual('09:00-18:00', openingHoursForMonday.openingHours[0].toString());

        const openingHoursForTuesday = openingHours.forDay('tuesday');
        assert.lengthOf(openingHoursForTuesday.openingHours, 0);
    });

    it('can determine that its regularly open on a week day', () => {
        const openingHours = OpeningHours.create({
            monday: ['09:00-18:00'],
        });

        assert.isTrue(openingHours.isOpenOn('monday'));
        assert.isFalse(openingHours.isOpenOn('tuesday'));
    });
});
