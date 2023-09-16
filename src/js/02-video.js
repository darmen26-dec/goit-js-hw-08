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

player.on('loaded', () => {
  const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedTime) {
    player
      .setCurrentTime(Number.parseFloat(savedTime)) //pamiętać, że parseFloat jest potrzebne w przypadku gdy wartość jest pobrana typu string
      .catch(function (error) {
        // zmodyfikowane z dokumentacji
        switch (error.name) {
          case 'RangeError':
            break;
          default:
            break;
        }
      });
  }
});

// DRUGIE ROZWIĄZANIE:

// import Player from '@vimeo/player';
// import throttle from 'lodash.throttle';

// const iframe = document.querySelector('#vimeo-player');
// const player = new Player(iframe);

// const LOCALSTORAGE_KEY = 'videoplayer-current-time';

// const onPlay = function (data) {
//   localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
// };

// const throttledSaveTime = throttle(onPlay, 1000);

// player.on('timeupdate', throttledSaveTime);

// player.on('loaded', () => {
//   player.setCurrentTime(
//     JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || 0
//   );
// });
