import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// вынос локального хранилища в переменную
const CURRENT_TIME_KEY = "videoplayer-current-time"

const iframePlayer = document.querySelector('#vimeo-player');

const player = new Player(iframePlayer);

player.on('play', function () {
    console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
    console.log('title:', title);
});

const onPlay = data => {
    localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
    console.log(data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));//Слушатель раз в 1сек

const getCurrentTime = Number(localStorage.getItem(CURRENT_TIME_KEY));

player.setCurrentTime(getCurrentTime).then(function (seconds) {
    console.log(seconds)
});






