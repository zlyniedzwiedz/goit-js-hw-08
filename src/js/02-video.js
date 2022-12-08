import Vimeo from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
let movieEnded = false;

const localStorageClear = () => {
  localStorage.removeItem('videoplayer-current-time');
  movieEnded = false;
};

const localStorageSave = time => {
  localStorage.setItem('videoplayer-current-time', time);
};
// checking state of localStorage
if (localStorage.getItem('videoplayer-current-time') !== null) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
//behavior on play
player.on(
  'timeupdate',
  throttle(evt => {
    if (movieEnded === false) {
      localStorageSave(evt.seconds);
    } else {
      localStorageClear();
      return;
    }
  }, 1000)
);
//behavior on ended
player.on('ended', () => {
  movieEnded = true;
});



