import $ from 'jquery';
const jQuery = $;

import ClockPresenter from './clockPresenter';
import ClockView from './clockView';

const clock = (container, options) => {
    const view = new CloclView(container);
    const model = new ClockModel();
    const presenter = new ClockPresenter(model, view);
    presenter.init(options);
}

export default clock;

class Clock {
   static getHours(format)  {
       
       let currentHours =  new Date().getHours();
       if(format !== '12') return currentHours;

       if(currentHours > 12) {
           currentHours -= 12;
        }
       if(currentHours === 0) {
        currentHours = 12;
       }

       return currentHours;

    }

    static getMinutes() {
        return new Date().getMinutes();
    }

   static getDayTime() {
        let current = new Date().getHours();
        if (current > 4 && current < 11) {
            return 'morning';
        }

       if(current < 17 ) {
            return 'day';
       }

       if(current < 23) {
        return 'evening';
       }

       return 'night';
 
    }
}


export {Clock, ClockPresenter, ClockView};
