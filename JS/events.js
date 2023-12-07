import { player } from "../index.js";
import { captionClickHandler, fullScreenHandler, handleKeyEvents, miniPlayerHandler, openSettings, playBackSpeedHandler, setDurationHandler, startTimeHandler, togglePlay, toggleVolumeBtn, updateTimeline, volumeIconToggle, volumeSliderHandler } from "./functions.js";
import { captionBtn, fullScreenBtn, miniPlayerBtn, playBackSpeedBtn, playPauseBtn, settingsBtn, timelineContainer, volumeBtn, volumeSlider } from "./instance.js";

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


// subtitle 
captionBtn.addEventListener('click', captionClickHandler);
player.on('loadedmetadata',captionClickHandler);


// settings icon
settingsBtn.addEventListener('click',openSettings);


// timeline preview and progress and preview-label
player.on('timeupdate',updateTimeline);
timelineContainer.addEventListener('click',updateTimeline);
timelineContainer.addEventListener('mousemove',updateTimeline);
timelineContainer.addEventListener('mouseover',updateTimeline);
timelineContainer.addEventListener('mouseout',updateTimeline);
timelineContainer.addEventListener('mousedown',updateTimeline);
document.addEventListener('mouseup',updateTimeline);




