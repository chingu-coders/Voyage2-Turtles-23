import $ from 'jquery';
const jQuery = $;
window.jQuery = $;
require('simpleweather');

export default () => {
$(document).ready(function() {
  $.simpleWeather({
    location: 'Austin, TX',
    woeid: '',
    unit: 'f',
    success: function(weather) {
     let html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';
  
      $('#weather').html(html);
    },
    error: function(error) {
      $('#weather').html('<p>'+error+'</p>');
    }
  });
});
}
