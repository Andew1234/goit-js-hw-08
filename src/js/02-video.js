import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';
const updateCurrentTime = ({ seconds }) => {
  localStorage.setItem(CURRENT_TIME, seconds);
};

player.on('timeupdate', throttle(updateCurrentTime, 1000));
player.setCurrentTime(localStorage.getItem(CURRENT_TIME) || 0);
