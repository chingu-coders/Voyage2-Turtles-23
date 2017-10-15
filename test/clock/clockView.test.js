import chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);
const expect = chai.expect;

import jsdom from 'jsdom';
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html>
<html>
<head>
<style>
    .hidden {display: none;}
</style>
</head>
<body>
    <div id="test"></div>
</body>
</html>`);

global.window = dom.window;
global.document = window.document;

import _$ from 'jquery';
global.jQuery = _$;
global.$ = _$(window);
import ClockView from '../../src/js/clock/clockView';


describe('Clock View', () => {

    describe('Show param', () => {
        afterEach(() => {
            $('#test').html('');
        });

        it('Is options has param show: true container should not be displayed', () => {
            let view = new ClockView($('#test'), {show: true});
            view.render({});
            expect(document.querySelector('#test')).to.be.displayed;
        })
        it('Is options has param show: false container should not be displayed', () => {
            let view = new ClockView($('#test'), {show: false});
            view.render({});
            expect(document.querySelector('#test')).not.to.be.displayed;
        })

        it('should change visible after update()', () => {
            let view = new ClockView($('#test'),{show: false});
            view.render({});

            expect(document.querySelector('#test')).not.to.be.displayed;
            view.update({show: true}).render({});

            expect(document.querySelector('#test')).to.be.displayed;
        });
    });

    describe('Test render function', () => {
        
        afterEach(() => {
            $('#test').html('');
        });

        it('render should fill container', () => {
            let view = new ClockView($('#test'),{show: true, templateFunc: () => 'test'});
            view.render({});
            expect(document.querySelector('#test')).to.have.text('test');
        });
        
        it('Render should add time string without 0 if param twoDigitHours is false', () => {
            const time = {
                hours: 1
            };

            let view = new ClockView($('#test'),{show: true, templateFunc: (time) => `${time.hours}`});
            view.render(time);
            expect(document.querySelector('#test')).to.have.text('1');
        });

        it('Render should add time string with 0 if param twoDigitHours is true', () => {
            const time = {
                hours: 1
            };

            const options = {
                show: true,
                twoDigitHours: true,
                templateFunc: (time) => `${time.hours}`
            };

            let view = new ClockView($('#test'), options);
            view.render(time);
            expect(document.querySelector('#test')).to.have.text('01');
        });

        it('Should always show two digit minites', () => {
        
            const time = {
                minutes: 5
            };

            const options = {
                show: true,
                twoDigitHours: true,
                templateFunc: (time) => `${time.minutes}`
            };

            let view = new ClockView($('#test'), options);
            view.render(time);
            expect(document.querySelector('#test')).to.have.text('05');

            options.twoDigitHour = false;
            view.update(options).render(time);

            expect(document.querySelector('#test')).to.have.text('05');

            time.minutes = 12
            view.render(time);

            expect(document.querySelector('#test')).to.have.text('12');
        });
    });

})
