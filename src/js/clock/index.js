import $ from 'jquery';
const jQuery = $;

import ClockModel from './clockModel';
import ClockPresenter from './clockPresenter';
import ClockView from './clockView';

const clock = (container, options) => {
    const view = new CloclView(container);
    const model = new ClockModel();
    const presenter = new ClockPresenter(model, view);
    presenter.init(options);
    
    return presenter;
}

export default clock;
export {ClockModel, clock}
