<template>
    <div>
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
import videojs from 'video.js';
import "~/node_modules/video.js/dist/video-js.css";

export default {
    name: "VideoPlayer",
    props: {
        src: {
            type: String,
            required: true
        },
        extension: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        const videoOptions = {
            autoplay: false,
            fluid: true,
            controls: true,
            sources: [
                {
                    src:this.src,
                    type: "video/" + this.extension
                }
            ]
        };
        this.player = videojs(this.$refs.videoPlayer, videoOptions, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>