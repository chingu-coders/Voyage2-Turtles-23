import sinon from 'sinon';
import {expect} from 'chai';
import {Clock} from '../../src/js/clock/';

describe('Clock Component', () => {
    describe('Clock return properly values', () => {
        let fakeClock;
        let currentTime = "1 Jan 2017 00:05:00";

        beforeEach(() => {
            let now = new Date(currentTime);
			fakeClock = sinon.useFakeTimers(now);
		});

		afterEach(() => {
			fakeClock.restore()
		});

        it('should return current minutes', () => {
            expect(Clock.getMinutes()).to.equal(5);
        });

        it('should return hours if format "12"', () => {
            expect(Clock.getHours('12')).to.equal(12);
        });

        it('should return hours if format "24"', () => {
            expect(Clock.getHours('24')).to.equal(0);
        });

        it('should return hours if empty options', () => {
            expect(Clock.getHours()).to.equal(0);
        });

    });

    describe('Returns right time of day', () => {
        // 4 - 11 = morning
        // 11 - 17 = day
        // 16 - 23 = evening
        // other = night

        let fakeClock;

        const getDate = (hours) => {
            let current = `1 Jan 2017 ${hours}:00:00`;
            return new Date(current);
        };

        afterEach(() => {
            fakeClock.restore();
        });

        it('Check morning', () => {
            fakeClock = sinon.useFakeTimers(getDate('07'));
            expect(Clock.getDayTime()).to.equal('morning');
        });

        it('Check Day', () => {
            fakeClock = sinon.useFakeTimers(getDate('13'));
            expect(Clock.getDayTime()).to.equal('day');
        });

        it('Check evening', () => {
            fakeClock = sinon.useFakeTimers(getDate('18'));
            expect(Clock.getDayTime()).to.equal('evening');
        });

        it('Check Night', () => {
            fakeClock = sinon.useFakeTimers(getDate('03'));
            expect(Clock.getDayTime()).to.equal('night');
        });
    
    });



});
