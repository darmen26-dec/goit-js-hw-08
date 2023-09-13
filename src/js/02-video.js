import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
};

const throttledSaveTime = throttle(onPlay, 1000);

player.on('timeupdate', throttledSaveTime);

player.setCurrentTime(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || 0);
