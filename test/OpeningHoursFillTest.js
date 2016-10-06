import OpeningHours, { Day } from '../src';
import { assert } from 'chai';

describe('OpeningHours::fill', () => {

    it('fills_opening_hours', () => {
        const openingHours = OpeningHours.create({
            monday: ['09:00-18:00'],
            tuesday: ['09:00-18:00'],
            wednesday: ['09:00-12:00', '14:00-18:00'],
            thursday: [],
            friday: ['09:00-20:00'],
            exceptions: {
                '2016-09-26': [],
            },
        });

        assert.strictEqual(openingHours.forDay('monday').openingHours[0].toString(), '09:00-18:00');
        assert.strictEqual(openingHours.forDay('tuesday').openingHours[0].toString(), '09:00-18:00');
        assert.strictEqual(openingHours.forDay('wednesday').openingHours[0].toString(), '09:00-12:00');
        assert.strictEqual(openingHours.forDay('wednesday').openingHours[1].toString(), '14:00-18:00');
        assert.lengthOf(openingHours.forDay('thursday').openingHours, 0);
        assert.strictEqual(openingHours.forDay('friday').openingHours[0].toString(), '09:00-20:00');
    });

    it('can_handle_empty_input', () => {
        const openingHours = OpeningHours.create({});

        Day.days().forEach(day => {
            assert.lengthOf(openingHours.forDay(day).openingHours, 0);
        });
    });

    it('handles_day_names_in_a_case_insensitive_manner', () => {
        const openingHours = OpeningHours.create({
            Monday: ['09:00-18:00'],
        });

        assert.strictEqual(openingHours.forDay('monday').openingHours[0].toString(), '09:00-18:00');
        assert.strictEqual(openingHours.forDay('Monday').openingHours[0].toString(), '09:00-18:00');
    });

    it('will_throw_an_exception_when_using_an_invalid_day_name', () => {
        assert.throws(() => {
            OpeningHours.create({
                mmmmonday: ['09:00-18:00'],
            });
        });
    });

    it('will_throw_an_exception_when_using_an_invalid_exception_date', () => {
        assert.throws(() => {
            OpeningHours.create({
                exceptions: {
                    '2016-01-32': [],
                },
            });
        });
    });
});
