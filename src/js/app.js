import $ from 'jquery';

import options from './options';
import clockFactory from './clock/';
import weather from './weather';
import openclose from './openclose';

options.load();
openclose();

// setBackground(options.get('background'));

weather(options.get(weather));

let clockOptions = {
    show: true,
    timeFormat: '12',
};
const clock = clockFactory($('.clock'), clockOptions);
clock.run();
