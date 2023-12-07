const videoContainer = document.querySelector('.video-container');
const myVideo = document.querySelector('#my-video');
const video = document.querySelector('video');
const fullScreenBtn = document.querySelector('.full-screen-btn');
const playPauseBtn = document.querySelector('.play-pause-btn');
const miniPlayerBtn = document.querySelector('.mini-player-btn');
const skipNextBtn = document.querySelector('.skip-duration-next');
const skipBackBtn = document.querySelector('.skip-duration-back');
const startTime = document.querySelector('.duration-start-time');
const endTime = document.querySelector('.duration-end-time');
const playBackSpeedBtn = document.querySelector('.speed-btn');
const volumeBtn = document.querySelector('.mute-btn');
const volumeSlider = document.querySelector('.mute-btn-range');
const captionBtn = document.querySelector('.captions-btn');
const settingsBtn = document.querySelector('.settings-btn');
const settingsContainer = document.querySelector('.settings-container');
const timelineContainer = document.querySelector('.timeline-container');
const timelineLabel = document.querySelector('.timeline-label');






export{
    videoContainer,
    myVideo,
    video,
    fullScreenBtn,
    playPauseBtn,
    miniPlayerBtn,
    skipBackBtn,
    skipNextBtn,
    startTime,
    endTime,
    playBackSpeedBtn,
    volumeBtn,
    volumeSlider,
    captionBtn,
    settingsBtn,
    settingsContainer,
    timelineContainer,
    timelineLabel
}