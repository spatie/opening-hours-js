import { assert } from 'chai';
import { Time } from '../src';

describe('Time', () => {

    it('can be created from a string', () => {
        const time = Time.fromString('16:00');
        assert.strictEqual(time.hours, 16);
        assert.strictEqual(time.minutes, 0);
    });

    it('can\'t be created from an invalid string', () => {
        assert.throws(() => {
            Time.fromString('aa:bb');
        });
    });

    it('can determine that its the same as another time', () => {
        assert.isTrue(Time.fromString('09:00').isSame(Time.fromString('09:00')));
        assert.isFalse(Time.fromString('09:00').isSame(Time.fromString('10:00')));
        assert.isFalse(Time.fromString('09:00').isSame(Time.fromString('09:30')));
    });

    it('it can determine that its before another time', () => {
        assert.isTrue(Time.fromString('09:00').isBefore(Time.fromString('10:00')));
        assert.isTrue(Time.fromString('09:00').isBefore(Time.fromString('09:30')));
        assert.isFalse(Time.fromString('09:00').isBefore(Time.fromString('09:00')));
        assert.isFalse(Time.fromString('09:00').isBefore(Time.fromString('08:00')));
        assert.isFalse(Time.fromString('09:00').isBefore(Time.fromString('08:30')));
        assert.isFalse(Time.fromString('08:30').isBefore(Time.fromString('08:00')));
    });

    it('it can determine that its after another time', () => {
        assert.isTrue(Time.fromString('09:00').isAfter(Time.fromString('08:00')));
        assert.isTrue(Time.fromString('09:30').isAfter(Time.fromString('09:00')));
        assert.isTrue(Time.fromString('09:00').isAfter(Time.fromString('08:30')));
        assert.isFalse(Time.fromString('09:00').isAfter(Time.fromString('09:00')));
        assert.isFalse(Time.fromString('09:00').isAfter(Time.fromString('09:30')));
        assert.isFalse(Time.fromString('09:00').isAfter(Time.fromString('10:00')));
    });

    it('it can determine that its the same or after another time', () => {
        assert.isTrue(Time.fromString('09:00').isSameOrAfter(Time.fromString('08:00')));
        assert.isTrue(Time.fromString('09:00').isSameOrAfter(Time.fromString('09:00')));
        assert.isTrue(Time.fromString('09:30').isSameOrAfter(Time.fromString('09:30')));
        assert.isTrue(Time.fromString('09:30').isSameOrAfter(Time.fromString('09:00')));
        assert.isFalse(Time.fromString('09:00').isSameOrAfter(Time.fromString('10:00')));
    });
});
