class ClockModel {
    constructor (options = {}) {
        this.timeFormat = options.timeFormat ? options.timeFormat : '24';
    }
    
   getHours(timeFormat)  {

       timeFormat = timeFormat || this.timeFormat;
     
       let currentHours =  new Date().getHours();

       if(timeFormat !== '12') return currentHours;

       if(currentHours > 12) {
           currentHours -= 12;
        }
       if(currentHours === 0) {
           currentHours = 12;
       }

       return currentHours;

    }

    getMinutes() {
        return new Date().getMinutes();
    }

    getTimeSuffix() {

        let hour = this.getHours('24');
        if(this.timeFormat !== '12') return '';
        return hour < 12 ? 'am' : 'pm';
    }
    
    getTimeObject() {
        return {
            hours: this.getHours(),
            minutes: this.getMinutes(),
            timeSuffix: this.getTimeSuffix()
        };
    }

    update(newOptions = {}) {
        if(newOptions.timeFormat) {
            this.timeFormat = newOptions.timeFormat;
        }
    }

    // Should move to greeting widget
   static getDayTime() {
       let current = new Date().getHours();
       if (current < 5) {
           return 'night'
       }
        if (current < 11) {
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

export default ClockModel;
