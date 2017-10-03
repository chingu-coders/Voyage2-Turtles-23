import $ from 'jquery';

class ClockView {
    construct(container, templateFunc) {
        this.container = container;
        this.template = template;
    }
    render(data) {
       this.container.append(this.template(data)); 
    }
}
