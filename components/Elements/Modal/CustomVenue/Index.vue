<template>
    <Modal
        @confirm="onConfirm"
        @open="onOpen"
        title="Custom Venue"
        :width="70"
        :height="588"
        button-variant="secondary"
        confirm-button-label="Simpan"
        confirm-button-variant="primary"
        cancel-button-variant="dark-grey"
        :use-confirm-button="false"
        :use-portal="false"
    >
        <template #trigger>
            <div ref="eventForm">
                <slot></slot>
            </div>
        </template>
        <template #main>
            <div>
                <ExtraSmallText
                    :weight="600"
                >
                    Drag & Drop untuk menambahkan elemen ke halaman resepsionis
                </ExtraSmallText>
                <div class="row mt-15px">
                    <div
                        v-for="value in components"
                        :key="value.key"
                        class="col-md-4 col-xs-12"
                        @click="onMenuClicked(value.key)"
                    >
                        <Menu
                            :title="value.title"
                            :description="value.description"
                            :icon="value.icon"
                        />
                    </div>
                </div>
                <div ref="background">
                    <UploadVenueBackgroundModal @confirm="onBackgroundChange" />
                </div>
                <div ref="video">
                    <UploadVenueVideoModal
                        :key="counter"
                        :file-value="activedVideo"
                        @confirm="onVideoChange"
                        @close="onVideoModalClose"
                    />
                </div>
                <div ref="link">
                    <CreateVenueLinkModal @confirm="onLinkChange" />
                </div>
                <SquareFrame
                    :height="300"
                    :radius="24"
                    background="dark-grey"
                    class-name="mt-15px d-flex align-items-center justify-content-center"
                >
                    <Link
                        v-for="value in links"
                        :key="value.id + value.url"
                        :url="value.url"
                        @delete="deleteLink(value.id)"
                    />
                    <Video
                        v-for="value in videos"
                        :key="value.id + value.name"
                        :name="value.name"
                        @drag="dragElement"
                        @edit="editVideo(value.id)"
                        @delete="deleteVideo(value.id)"
                    />
                    <ImageDisplay
                        v-if="backgroundSource"
                        type="url"
                        :src="backgroundSource"
                        height="auto"
                        class-name="w-100"
                    />

                </SquareFrame>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import SquareFrame from "@elements/SquareFrame/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import UploadVenueBackgroundModal from "@elements/Modal/UploadVenueBackground/Index";
    import UploadVenueVideoModal from "@elements/Modal/UploadVenueVideo/Index";
    import CreateVenueLinkModal from "@elements/Modal/CreateVenueLink/Index";
    import Organization from "@endpoints/Organization";
    import Menu from "./Menu/Index";
    import Video from "./Video/Index";
    import Link from "./Link/Index";

    export default {
        name: 'IndexPage',
        components: {
            Video,
            Link,
            SquareFrame,
            ImageDisplay,
            CreateVenueLinkModal,
            UploadVenueBackgroundModal,
            UploadVenueVideoModal,
            Menu,
            ExtraSmallText,
            Modal
        },
        props: {
            isShowCancelButton: {
                type: Boolean,
                default: true
            },
            isShowTimesIcon: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                counter: 0,
                background: null,
                videos: [],
                links: [],
                backgroundSource: null,
                activedVideo: null,
                components: [
                    {
                        title: "Background",
                        key: "background",
                        description: "Tambahkan background foto untuk halaman resepsionis kamu",
                        icon: "file-image"
                    },
                    {
                        title: "Video",
                        key: "video",
                        description: "Tambahkan video untuk memeriahkan eventmu atau promosikan produk",
                        icon: "video"
                    },
                    {
                        title: "Link",
                        key: "link",
                        description: "Tambahkan area klik yang bisa menghubungkan eventmu",
                        icon: "link"
                    }
                ],
                isConfirmButtonLoading: false,
                classState: "",
                closeModal: () => {},
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            onVideoModalClose() {
                setTimeout(() => {
                    this.activedVideo = null;
                    ++this.counter;
                }, 800);
            },
            onVideoChange({ name, size }) {
                let id = "vid" + Math.round(Math.random() * 999999999999);
                let videoIndex = null;
                const activedVideo = this.activedVideo;
                if(activedVideo) {
                   id = activedVideo.id; 
                   if(id) {
                        videoIndex = this.videos.findIndex(value => value.id === id);
                        this.videos[videoIndex] = { id, name, size }
                   }
                } else {
                    this.videos.push({id, name, size});
                }
            },
            onBackgroundChange(image) {
                let imageSource = null
                if(image) {
                    imageSource = window.URL.createObjectURL(image);
                }
                this.backgroundSource = imageSource;
                this.background = image;
            },
            onLinkChange(url) {
                const id = "url" + Math.round(Math.random() * 999999999999);
                this.links.push({ id, url});
            },
            onMenuClicked(key) {
                let container = null;
                let trigger = null;
                container = this.$refs[key];
                if(container) {
                    trigger = container.querySelector('.modal-trigger');
                    if(trigger) {
                        trigger.click();
                    }
                }
            },
            onModalLoad(close) {
                this.closeModal = close;
            },
            openPanel(key) {
            },
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
                this.name = "";
            },
            editVideo(id) {
                const container = this.$refs.video;
                let trigger = null;
                const selected = this.videos.find(value => value.id === id)
                if(selected) {
                    this.activedVideo = selected;
                    if(container) {
                        trigger = container.querySelector('.modal-trigger');
                        if(trigger) {
                            trigger.click();
                        }
                    }
                }
            },
            deleteVideo(id) {
                this.videos = this.videos.filter(value => value.id !== id);
            },
            deleteLink(id) {
                this.links = this.links.filter(value => value.id !== id);
            },
            onClose() {
                this.$emit("close");
            },
            onOpen() {
                this.name = "";
            },
            dragElement() {
            },
            async onConfirm(closeModal) {
                this.isConfirmButtonLoading = true;
                await Organization.store(this.name)
                this.isConfirmButtonLoading = false;
                closeModal();
                this.$emit("confirm")
            }
        }
    }
</script>