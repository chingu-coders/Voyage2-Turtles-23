import ClockModel from './clockModel';
import ClockPresenter from './clockPresenter';
import ClockView from './clockView';

const defaultOptions = {
    show: false,
    timeFormat: '12',
    twoDigitHours: true,
    /* subscribeTo: ,*/
    templateFunc: (time) => `${time.hours}:${time.minutes} ${time.timeSuffix}`
}

const clockFactory = (container, options) => {
    options = Object.assign({}, defaultOptions, options);
    const view = new ClockView(container, options);
    const model = new ClockModel(options);
    const presenter = new ClockPresenter(model, view, options);
    
    return presenter;
}

export default clockFactory;
