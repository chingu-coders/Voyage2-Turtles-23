let timer;
class ClockPresenter {
    constructor (model, view, options) {
        this.model = model;
        this.view = view;
        this.options = options;
    }

    showTime() {
        let time = this.model.getTimeObject();
        this.view.render(time)
    }

    run() {
        if(this.options.show) {
            timer = setInterval( () => {
               this.showTime(); 
            } , 1000);
            this.showTime();
        }
    }

    update(newOptions) {
        this.options = Object.assign({}, this.options, newOptions);
        if(!this.options.show) {
            timer.clearInterval();
        }
            
    }

    subscribeTo() {
    
    }
}

export default ClockPresenter;
