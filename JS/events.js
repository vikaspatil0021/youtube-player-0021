import { player } from "../index.js";
import { captionClickHandler, fullScreenHandler, handleKeyEvents, manuallyUpdateTimeline, miniPlayerHandler, openSettings, playBackSpeedHandler, setDurationHandler, startTimeHandler, togglePlay, toggleVolumeBtn, updateTimeline, volumeIconToggle, volumeSliderHandler } from "./functions.js";
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


// timeline preview and progress
player.on('timeupdate',updateTimeline);

timelineContainer.addEventListener('click',manuallyUpdateTimeline);  // preview track update
timelineContainer.addEventListener('mousemove',manuallyUpdateTimeline);
timelineContainer.addEventListener('mouseout',updateTimeline);
