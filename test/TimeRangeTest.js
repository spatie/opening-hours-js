import { Time, TimeRange } from '../src';
import { assert } from 'chai';

describe('TimeRange', () => {

    it('can be created from a string', () => {
        const timeRange = TimeRange.fromString('16:00-18:00');

        assert.strictEqual(timeRange.start.hours, 16);
        assert.strictEqual(timeRange.start.minutes, 0);
        assert.strictEqual(timeRange.end.hours, 18);
        assert.strictEqual(timeRange.end.minutes, 0);
    });

    it('can\'t be created from an invalid range', () => {
        assert.throws(() => {
            TimeRange.fromString('16:00/18:00');
        });
    });

    it('can determine that it spills over to the next day', () => {
        assert.isTrue(TimeRange.fromString('18:00-01:00').spillsOverToNextDay());
        assert.isFalse(TimeRange.fromString('18:00-23:00').spillsOverToNextDay());
    });

    it('can determine that it contains a time', () => {
        assert.isTrue(TimeRange.fromString('16:00-18:00').containsTime(Time.fromString('16:00')));
        assert.isTrue(TimeRange.fromString('16:00-18:00').containsTime(Time.fromString('17:00')));
        assert.isFalse(TimeRange.fromString('16:00-18:00').containsTime(Time.fromString('18:00')));

        assert.isTrue(TimeRange.fromString('18:00-01:00').containsTime(Time.fromString('00:30')));
        assert.isTrue(TimeRange.fromString('18:00-01:00').containsTime(Time.fromString('22:00')));
        assert.isFalse(TimeRange.fromString('18:00-01:00').containsTime(Time.fromString('17:00')));
        assert.isFalse(TimeRange.fromString('18:00-01:00').containsTime(Time.fromString('02:00')));
    });

    it('can determine that it overlaps another time range', () => {
        assert.isTrue(TimeRange.fromString('16:00-18:00').overlaps(TimeRange.fromString('15:00-17:00')));
        assert.isTrue(TimeRange.fromString('16:00-18:00').overlaps(TimeRange.fromString('17:00-19:00')));
        assert.isTrue(TimeRange.fromString('16:00-18:00').overlaps(TimeRange.fromString('17:00-17:30')));

        assert.isTrue(TimeRange.fromString('22:00-02:00').overlaps(TimeRange.fromString('21:00-23:00')));
        assert.isTrue(TimeRange.fromString('22:00-02:00').overlaps(TimeRange.fromString('01:00-02:00')));
        assert.isTrue(TimeRange.fromString('22:00-02:00').overlaps(TimeRange.fromString('23:00-23:30')));

        assert.isFalse(TimeRange.fromString('16:00-18:00').overlaps(TimeRange.fromString('14:00-15:00')));
        assert.isFalse(TimeRange.fromString('16:00-18:00').overlaps(TimeRange.fromString('19:00-20:00')));
    });
});
