import options from './options';
import clock from './clock/';
import weather from './weather';

options.load();

// setBackground(options.get('background'));

weather(options.get(weather));

//clock($('#clock'), options);
