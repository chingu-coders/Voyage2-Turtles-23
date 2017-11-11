import sinon from 'sinon';
import {expect} from 'chai';
import ClockModel from '../../src/js/clock/clockModel'

describe('ClockModel', () => {
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
            let clock = new ClockModel({timeFormat: '12'})

            expect(clock.getMinutes()).to.equal(5);
        });

        it('should return hours if format "12"', () => {
            let clock = new ClockModel({timeFormat: '12'})

            expect(clock.getHours()).to.equal(12);
        });

        it('should return hours if format "24"', () => {
            let clock = new ClockModel({timeFormat: '24'})
            expect(clock.getHours()).to.equal(0);
        });

        it('should return hours if empty options', () => {
            let clock = new ClockModel()
            expect(clock.getHours()).to.equal(0);
        });

    });

    describe.skip('Returns right time of day', () => {
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
            expect(ClockModel.getDayTime()).to.equal('morning');
        });

        it('Check Day', () => {
            fakeClock = sinon.useFakeTimers(getDate('13'));
            expect(ClockModel.getDayTime()).to.equal('day');
        });

        it('Check evening', () => {
            fakeClock = sinon.useFakeTimers(getDate('18'));
            expect(ClockModel.getDayTime()).to.equal('evening');
        });

        it('Check Night', () => {
            fakeClock = sinon.useFakeTimers(getDate('03'));
            expect(ClockModel.getDayTime()).to.equal('night');
        });
    
    });

    describe('Time object', () => {

        let fakeClock;

        beforeEach(() => {
           fakeClock = sinon.useFakeTimers(new Date('1 Jan 2017 13:00:00'));
        });

        afterEach(() => {
           fakeClock.restore(); 
        });
        
        it('getTimeObject() should return object', () => {
            let clock = new ClockModel({timeFormat: '12'})
            expect(clock.getTimeObject()).to.be.an('object');
        });

        it('getTimeObject() should have time properties', () => {
            let clock = new ClockModel({timeFormat: '12'})
            expect(clock.getTimeObject()).to.have.all.keys('hours', 'minutes', 'timeSuffix');
        });

        it('getTimeObject() should return right properties if timeFormat = \'12\'', () => {
            let clock = new ClockModel({timeFormat: '12'})
            const suspect = clock.getTimeObject();
            expect(suspect).to.have.property('hours', 1)
            expect(suspect).to.have.own.property('timeSuffix', 'pm');
        });

        it('getTimeObject() should return right properties if timeFormat = \'24\'', () => {
            let clock = new ClockModel({timeFormat: '24'})

            const suspect = clock.getTimeObject();

            expect(suspect).to.have.property('hours', 13)
            expect(suspect.timeSuffix).to.be.empty;
        });
    
    });

    describe('Update options', () => {
    
        let fakeClock;

        beforeEach(() => {
           fakeClock = sinon.useFakeTimers(new Date('1 Jan 2017 13:00:00'));
        });

        afterEach(() => {
           fakeClock.restore(); 
        });

        it('should change hours format after update', () => {
            let clock = new ClockModel({timeFormat: '24'});

            expect(clock.getHours()).to.equal(13);

            clock.update({timeFormat: '12'});

            expect(clock.getHours()).to.equal(1);
        });
        
    });

});
