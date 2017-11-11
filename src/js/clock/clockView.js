import $ from 'jquery';

const makeTwoDigit = (value) => ('0' + value).slice(-2);

const defaultOptions = {
    show: false,
    twoDigitHours: false,
    templateFunc: (time) => `${time.hour}:${time.mitutes} ${time.timeSuffix}`
}

class ClockView {
    constructor(container, options={}) {
        this.container = container;
        
        this.options = Object.assign({}, defaultOptions, options);
        this.template = this.options.templateFunc;
    }
    render(data) {
        if(this.options.show) {
            let renderData = Object.assign({}, data);
            if(this.options.twoDigitHours) {
                renderData.hours = makeTwoDigit(data.hours);
            }
            renderData.minutes = makeTwoDigit(data.minutes);
           this.container.html(this.template(renderData));
            this.container.removeClass('hidden');
        } else {
            this.container.addClass('hidden');
        }
        return this;
    }
    update(newOptions) {
        if(newOptions) {
            this.options = newOptions;
        }
        return this;
    }
}

export default ClockView;
