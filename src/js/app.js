import options from './options';
//import clock from './clock/';
import weather from './weather';
import openclose from './openclose';

options.load();
openclose();

// setBackground(options.get('background'));

weather(options.get(weather));

//clock($('#clock'), options);
