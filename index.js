export const player = videojs(
    'my-video',
    {
        // controls: true,
        fluid: true,
        html5: {
            vhs: {
                overrideNative: true
            }
        }
    },
    function () {
        var player = this;
        player.eme();
        player.src({
            src: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
            type: 'application/dash+xml',
            keySystems: {
                'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
            }
        });


        player.ready(function () {

            player.tech(true).on('keystatuschange', function (event) {
                console.log("event: ", event);

            });

            player.textTrackSettings.setValues({
                backgroundColor: '#FFF',  
                //Other allowed values are same like for text color: "#FFF", "F00", "#0F0", "00F", "#FF0", "#F0F"

                color: '#000'           
                // Other allowed values: "#000" (black), "#F00" (red), "0F0" (green), "#00F" (blue), "#FF0" (yellow), "F0F" (magenta), "0FF" (cyan)
            });

            player.textTrackSettings.updateDisplay();

        });



    }

);



// https://www.nuevodevel.com/nuevo/showcase/captions-settings