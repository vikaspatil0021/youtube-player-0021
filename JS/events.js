import { player } from "../index.js";
import { fullScreenHandler, handleKeyEvents, miniPlayerHandler, playBackSpeedHandler, setDurationHandler, startTimeHandler, togglePlay, toggleVolumeBtn, volumeIconToggle, volumeSliderHandler } from "./functions.js";
import { fullScreenBtn, miniPlayerBtn, playBackSpeedBtn, playPauseBtn, volumeBtn, volumeSlider } from "./instance.js";

// play/pause toggle
player.on('click', togglePlay);
playPauseBtn.addEventListener('click',togglePlay);

// handling key events
document.addEventListener('keydown',handleKeyEvents);


// fullscreen btn toggle
fullScreenBtn.addEventListener('click',fullScreenHandler);


// miniPlayer toggle
miniPlayerBtn.addEventListener('click',miniPlayerHandler);


// duration start and end time
player.on('loadedmetadata',setDurationHandler);
player.on('timeupdate',startTimeHandler);


// playback speed control
playBackSpeedBtn.addEventListener('click',playBackSpeedHandler);


// volume btn toggle
volumeBtn.addEventListener('click',toggleVolumeBtn);
volumeSlider.addEventListener('input',volumeSliderHandler);
player.on('volumechange',volumeIconToggle);