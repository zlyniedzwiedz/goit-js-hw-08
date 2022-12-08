import Vimeo from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const savedTime = () => {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
};

window.addEventListener('load', savedTime);
//saving current playtime
player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem('videoplayer-current-time', evt.seconds);
  }, 1000)
);



player.on('ended', evt => {
   const timeToFixed = Number(localStorage.getItem('videoplayer-current-time')) + 1
  console.log(evt.duration.toFixed(0));
  console.log(timeToFixed.toFixed(0));
  if (timeToFixed.toFixed(0) === evt.duration.toFixed(0)) {
    localStorage.removeItem('videoplayer-current-time');
  }
});
