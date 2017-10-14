class ClockModel {
   static getHours(timeFormat)  {
       
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

    static getMinutes() {
        return new Date().getMinutes();
    }

    static getTimeSuffix(timeFormat) {

        let hour = ClockModel.getHours();
        if(timeFormat !== '12') return '';
        return hour < 12 ? 'am' : 'pm';
    }
    
    static getTimeObject(timeFormat) {
        return {
            hours: ClockModel.getHours(timeFormat),
            minutes: ClockModel.getMinutes(),
            timeSuffix: ClockModel.getTimeSuffix(timeFormat)
        };
    }

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
