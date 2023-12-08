import { player } from "./../index.js";
import { captionBtn, endTime, fullScreenBtn, myVideo, playBackSpeedBtn, settingsContainer, skipBackBtn, skipNextBtn, startTime, timelineContainer, timelineLabel, video, videoContainer, volumeBtn, volumeSlider } from "./instance.js";

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
        case 's':
            openSettings();
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
    settingsContainer.classList.toggle('open-box')
}


// timeline
const segments = [
    { start: 0, end: 30 },
    { start: 30, end: 90 },
    { start: 90, end: 120 },
    { start: 120, end: 210 }
];
function previewViaBuffer() {
    const bufferedRanges = player.buffered();
    const percent = bufferedRanges.end(0) / player.duration();
    return percent.toFixed(2);
}
function progessTimeline() {
    const progressEles = document.querySelectorAll('.timeline-segments-progress');

    segments.forEach((each, index) => {
        if (each.end > player.currentTime()) {
            progressEles[index].style.right = ((each.end - player.currentTime()) / (each.end - each.start)) * 100 + '%';
        } else {
            progressEles[index].style.right = 0;
        }
    })
}
function previewViaMouseOverOrMove(e) {
    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    return percent;
}
function changeCurrentTimeOnClick(e) {
    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    console.log(e.target, percent)

    player.currentTime(percent * player.duration());
}

let isMouseOver = false;
let isMouseDown = false;


// function updateTimeline(e) {
//     return;
//     let preview_position = 0;
//     if (e.type === 'timeupdate') {
//         if (!isMouseDown) {
//             progessTimeline();
//         }
//         if (!isMouseOver) {
//             preview_position = previewViaBuffer();
//         }
//     }
//     if (e.type === 'click') {
//         isMouseDown = false;
//         changeCurrentTimeOnClick(e)
//     }
//     if (e.type === 'mousemove' || e.type === 'mouseover') {
//         isMouseOver = true;
//         preview_position = previewViaMouseOverOrMove(e);

//         timelineLabel.innerHTML = formatTime((preview_position).toFixed(2) * player.duration());
//         if (isMouseDown && e.type === 'mousemove') {
//             changeCurrentTimeOnClick(e);
//             timelineContainer.style.setProperty('--progess-position', preview_position);
//         }
//     }
//     if (e.type === 'mouseout') {
//         isMouseOver = false;
//         preview_position = previewViaBuffer();

//     }
//     if (e.type === 'mousedown') {
//         isMouseDown = true;
//     }
//     if (e.type === 'mouseup') {
//         isMouseDown = false;

//     }


//     if (preview_position != 0) {

//         timelineContainer.style.setProperty('--preview-position', preview_position);
//     }
// }
function updateTimeline(e) {
    let preview_position = 0;

    if (e.type === 'timeupdate') {
        (!isMouseDown) && progessTimeline();


        if (!isMouseOver) {
            preview_position = previewViaBuffer()
        };
    }
    if (e.type === 'click') {
        isMouseDown = false;

        changeCurrentTimeOnClick(e);
    }

    if (e.type === 'mouseover') {
        isMouseOver = true;

        preview_position = previewViaMouseOverOrMove(e);

        timelineLabel.innerHTML = formatTime((preview_position).toFixed(2) * player.duration());

    }
    if (e.type === 'mousemove') {
        isMouseOver = true;

        preview_position = previewViaMouseOverOrMove(e);
        console.log(preview_position)
        timelineLabel.innerHTML = formatTime((preview_position).toFixed(2) * player.duration());
        timelineLabel.style.left = preview_position *100 - 1 + "%";

        if (isMouseDown) {
            changeCurrentTimeOnClick(e);
            progessTimeline();
        }

    }
    if (e.type === 'mousedown') {
        isMouseDown = true;

    }
    if (e.type === 'mouseup') {
        isMouseDown = false;


    }

    if (e.type === 'mouseout') {
        isMouseOver = false;
        preview_position = previewViaBuffer()

    }
    const previewEles = document.querySelectorAll('.timeline-segments-preview');



    preview_position != 0 && segments.forEach((each, index) => {
        if (each.end > (preview_position * player.duration())) {
            previewEles[index].style.right = ((each.end - preview_position * player.duration()) / (each.end - each.start)) * 100 + '%';
        } else {
            previewEles[index].style.right = 0;
        }
    })

    if(preview_position !=0 ){
    }

}

function segmentsHandler() {

    segments.forEach(each => {

        const segmentDiv = document.createElement('div');
        const previewEle = document.createElement('div')
        const progressEle = document.createElement('div');
        segmentDiv.classList.add('timeline-segments');
        previewEle.classList.add('timeline-segments-preview');
        progressEle.classList.add('timeline-segments-progress');

        segmentDiv.style.width = (each.end - each.start) / player.duration() * 100 + "%";

        const s = document.querySelector('.timeline');

        segmentDiv.append(previewEle);
        segmentDiv.append(progressEle)
        s.append(segmentDiv);

    })
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
    segmentsHandler
}