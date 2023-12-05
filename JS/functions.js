import { player } from "./../index.js";
import { captionBtn, endTime, fullScreenBtn, myVideo, playBackSpeedBtn, skipBackBtn, skipNextBtn, startTime, videoContainer, volumeBtn, volumeSlider } from "./instance.js";

// play / pause btn toggle
function togglePlay() {
    if (player.paused()) {
        videoContainer.classList.remove('paused')
        player.play()
    } else {
        videoContainer.classList.add('paused')
        player.pause();
    }
}


// handle key events 
function handleKeyEvents(e) {
    switch (e.key.toLowerCase()) {
        case " ":
            e.preventDefault();
            togglePlay();
            break;
        case 'f':
            fullScreenHandler();
            break;
        case 'i':
            miniPlayerHandler();
            break;
        case 'arrowright':
            skip(10);
            break;
        case 'arrowleft':
            skip(-10);
            break;
        case 'p':
            playBackSpeedHandler();
            break;
        case 'm':
            toggleVolumeBtn();
            break;
        case 'c':
            captionClickHandler()
            break;
        default:
            break;
    }
}

// full screen handler
function fullScreenHandler() {
    if (document.fullscreenElement === null) {
        videoContainer.requestFullscreen();
        fullScreenBtn.classList.add('closed');
    } else {
        document.exitFullscreen();
        fullScreenBtn.classList.remove('closed');
    }
}


// miniPlayer Handler
function miniPlayerHandler() {
    if (videoContainer.classList.contains("mini-player")) {
        videoContainer.classList.remove("mini-player")
        document.exitPictureInPicture()
    } else {
        player.requestPictureInPicture();
        videoContainer.classList.add("mini-player")
    }
}


// skip 5 sec 
function skip(skipTime) {
    if (skipTime > 0) {
        skipNextBtn.style.display = 'inline-flex';
        setTimeout(() => {
            skipNextBtn.style.display = 'none';
        }, 500);
    } else {
        skipBackBtn.style.display = 'inline-flex';
        setTimeout(() => {
            skipBackBtn.style.display = 'none';
        }, 500);
    }
    player.currentTime(player.currentTime() + skipTime);
}

// setduration after metadata is loaded
function setDurationHandler() {
    const duration = formatTime(player.duration());
    endTime.innerHTML = duration;
}

// start and end duration handler
function startTimeHandler() {
    const currentTime = formatTime(player.currentTime());
    startTime.innerHTML = currentTime;
}

// formatting of time
function formatTime(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const sec = Math.floor(seconds % 60);

    var formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
    var formattedSeconds = sec < 10 ? '0' + sec : '' + sec;

    if (hour) {
        return `${hour}:${formattedMinutes}:${formattedSeconds}`;
    }
    return `${minutes}:${formattedSeconds}`;

}


// playback speed control
function playBackSpeedHandler() {
    const speedArr = [0.5, 1, 1.5, 2];
    let currentSpeed = player.playbackRate();
    if (currentSpeed === speedArr[speedArr.length - 1]) {
        currentSpeed = speedArr[0];
    } else {
        currentSpeed += 0.5;
    }
    player.playbackRate(currentSpeed);
    playBackSpeedBtn.innerHTML = currentSpeed + 'x';
}

// toggle voulme button
function toggleVolumeBtn() {
    player.muted(!player.muted());
    volumeBtn.dataset.volumeLevel = !player.muted() ? "high" : "muted";
}

function volumeSliderHandler(e) {
    player.volume(e.target.value);
    player.muted(e.target.value === 0);
}

function volumeIconToggle(e) {
    let volState;
    volumeSlider.value = player.volume();

    if (player.muted() || player.volume() === 0) {
        volumeSlider.value = 0;
        volState = 'muted'
    } else if (player.volume() < 0.5) {
        volState = 'low'
    } else {
        volState = 'high'

    }
    volumeBtn.dataset.volumeLevel = volState;

}

// caption on/off handler
function captionClickHandler() {
    if(captionBtn.classList.contains('show-caption')){
        player.textTracks()[myVideo.dataset.currentSub].mode = 'disabled';
        captionBtn.classList.remove('show-caption');
    }else{
        player.textTracks()[myVideo.dataset.currentSub].mode = 'showing';
        captionBtn.classList.add('show-caption');
    }
}


export {
    togglePlay,
    handleKeyEvents,
    fullScreenHandler,
    miniPlayerHandler,
    startTimeHandler,
    setDurationHandler,
    playBackSpeedHandler,
    toggleVolumeBtn,
    volumeSliderHandler,
    volumeIconToggle,
    captionClickHandler
}