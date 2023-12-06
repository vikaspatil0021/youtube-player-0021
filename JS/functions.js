import { player } from "./../index.js";
import { captionBtn, endTime, fullScreenBtn, myVideo, playBackSpeedBtn, settingsBtn, skipBackBtn, skipNextBtn, startTime, timelineContainer, video, videoContainer, volumeBtn, volumeSlider } from "./instance.js";

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
        video.style.borderRadius = "0px";
        fullScreenBtn.classList.add('closed');
    } else {
        document.exitFullscreen();
        video.style.borderRadius = "15px";
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
    const speedArr = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    let currentSpeed = player.playbackRate();
    if (currentSpeed === speedArr[speedArr.length - 1]) {
        currentSpeed = speedArr[0];
    } else {
        currentSpeed += 0.25;
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
    const length = player.textTracks().length;
    if (length == 0) {
        captionBtn.disabled = true;
        return;
    }
    if (captionBtn.classList.contains('show-caption')) {
        player.textTracks()[myVideo.dataset.currentSub].mode = 'disabled';
        captionBtn.classList.remove('show-caption');
    } else {
        player.textTracks()[myVideo.dataset.currentSub].mode = 'showing';
        captionBtn.classList.add('show-caption');
    }
}

function openSettings() {
    settingsBtn.classList.toggle('open-box')
}


// timeline
function previewViaBuffer() {
    const bufferedRanges = player.buffered();
    const percent = bufferedRanges.end(0) / player.duration();
    return percent;
}
function progessTimeline() {
    const progress = player.currentTime() / player.duration();
    timelineContainer.style.setProperty('--progess-position', progress);
}
function previewViaMouseOverOrMove(e) {
    const rect = timelineContainer.getBoundingClientRect()
    const percent = (e.offsetX / rect.width);
    return percent;
}
function changeCurrentTimeOnClick(e) {
    const rect = timelineContainer.getBoundingClientRect()
    const percent = (e.offsetX / rect.width).toFixed(2);

    player.currentTime(percent * player.duration());
}

let isMouseOver = false;
let isMouseDown = false;


function updateTimeline(e) {
    let preview_position = 0;
    if (e.type === 'timeupdate') {
        progessTimeline();
        if (!isMouseOver) {
            preview_position = previewViaBuffer();
        }
    } else if (e.type === 'click') {
        isMouseDown = false;
        changeCurrentTimeOnClick(e)
    } else if (e.type === 'mousemove' || e.type === 'mouseover') {
        isMouseOver = true;
        preview_position = previewViaMouseOverOrMove(e);
        if (e.type === 'mousemove' && isMouseDown) {
            changeCurrentTimeOnClick(e);
        }
    } else if (e.type === 'mouseout') {
        isMouseOver = false;
        isMouseDown = false;

        preview_position = previewViaBuffer();
    } else if (e.type === 'mousedown') {
        isMouseDown = true;
    } else if (e.type === 'mouseup') {
        isMouseDown = false;

    }

    if (preview_position != 0) {
        timelineContainer.style.setProperty('--preview-position', preview_position);
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
    captionClickHandler,
    openSettings,
    updateTimeline,
}