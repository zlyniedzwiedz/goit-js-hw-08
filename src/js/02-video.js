import Vimeo from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

//saving current playtime
player.on('timeupdate', throttle(evt => {
   localStorage.setItem("videoplayer-current-time", evt.seconds)
}, 1000));

//loading current playtime after reload
player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));