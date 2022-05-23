<template>
    <div :class="marginAuto === true? 'mb-24px' : ''">
        <div class="mb-8px">
            <ExtraSmallText
                v-if="label"
                display="inline-block"
                :weight="600"
            >
                {{ label }}
            </ExtraSmallText>

            <ExtraSmallText
                v-if="primaryLabel"
                display="inline-block"
                color="primary"
                dark-theme-color="primary"
                :margin-left="8"
            >
                {{ primaryLabel }}
            </ExtraSmallText>

            <ExtraSmallText
                v-if="additionalLabel"
                display="inline-block"
                color="dark-grey"
                dark-theme-color="dark-grey"
                :margin-left="8"
            >
                {{ additionalLabel }}
            </ExtraSmallText>
        </div>

        <div :class="fileAreaClass">
            
            <FileUpload
                id="drop-area"
                ref="upload"
                class="w-100"
                :accept="accept"
                @input="onChange"
            >
                
                    <div class="position-absolute w-100 h-100 d-flex align-items-center flex-column justify-content-center">                    
                        <template v-if="!fileName">
                            <div>
                                <Icon
                                    variant="fontawesome"
                                    src="file-upload"
                                    size="20"
                                    dark-theme-color="dark-grey"
                                />   
                            </div>
                            <ExtraSmallText
                                display="block"
                                dark-theme-color="dark-grey"
                                :weight="500"
                                :margin-top="18"
                            >
                                <div v-html="uploadDescription"></div>
                            </ExtraSmallText>
                        </template>

                        <template v-if="fileName">
                            <div v-if="isImage === false">
                                <Icon
                                    :key="fileName"
                                    variant="fontawesome"
                                    src="file-alt"
                                    size="30"
                                    color="dark-grey"
                                    dark-theme-color="dark-grey"
                                />   
                            </div>
                            <div v-if="isImage === true">
                                <ImageDisplay
                                    v-if="previewImageVariant === 'default'"
                                    :key="fileName"
                                    :src="imageName"
                                    type="url"
                                    width="auto"
                                    height="50"
                                />
                                <ImageDisplay
                                    v-if="previewImageVariant === 'full'"
                                    :key="fileName"
                                    :src="imageName"
                                    type="url"
                                    height="auto"
                                    class-name="w-100 top-0 left-0"
                                />
                            </div>
                            <ExtraSmallText
                                display="block"
                                color="dark-grey"
                                dark-theme-color="dark-grey"
                                :weight="500"
                                :margin-top="18"
                            >
                                {{ fileName }}
                            </ExtraSmallText>
                        </template>
                    </div>
            </FileUpload >

            <div
                v-if="fileName"
                class="position-absolute top-6 right-15 z-index-150"
            >
                <Button
                    left-icon="trash"
                    left-icon-variant="fontawesome"
                    variant="link-danger"
                    @click="deleteFile"
                />
            </div>
        </div>

        <div v-if="variant === 'tus' && percentage > 0">
            <div v-if="percentage < 100">
                <SquareFrame
                    :height="8"
                    background="dark-grey"
                    :radius="8"
                >
                    <div :class="'h-100 bg-primary ' + ('w-' + intPercentage)"></div>
                </SquareFrame>
                <ExtraSmallText
                    align="center"
                    :weight="500"
                    dark-theme-color="dark-grey"
                    display="block"
                    :margin-top="8"
                >
                    Mengupload {{ percentage }}%
                </ExtraSmallText>
            </div>
            <ExtraSmallText
                v-if="percentage == 100"
                :margin-top="16"
                align="center"
                :weight="500"
                display="block"
                color="primary"
                dark-theme-color="primary"
            >
                Terupload
            </ExtraSmallText>

        </div>
    </div>
</template>

<script>
    import * as tus from "tus-js-client";
    import ExtraSmallText from '@elements/Text/ExtraSmall/Index';
    import Icon from '@elements/Icon/Index';
    import Button from '@elements/Button/Index';
    import ImageDisplay from '@elements/ImageDisplay/Index';
    import SquareFrame from '@elements/SquareFrame/Index';
    import User from "@models/User";

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            Button,
            ImageDisplay,
            SquareFrame,
            ExtraSmallText
        },
        props: {
            previewImageVariant: {
                type: String,
                default: "default"
            },
            className: {
                type: String,
                default: ""
            },
            height: {
                type: Number,
                default: 150
            },
            extension: {
                type: String,
                default: "*"
            },
            variant: {
                type: String,
                default: "default"
            },
            uploadDescription: {
                type: String,
                default: "Jatuhkan file foto di sini atau klik untuk mengunggah (Maks. 2 MB)"
            },
            accept: {
                type: String,
                default: "*"
            },
            marginAuto: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ""
            },
            maxSize: {
                type: Number,
                default: 0
            },
            primaryLabel: {
                type: String,
                default: ""
            },
            additionalLabel: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                intPercentage: 0,
                percentage: 0,
                classState: "",
                isImage: false,
                imageName: "",
                fileAreaClass: "",
                fileName: ""
            }
        },
        mounted() {
            this.setClassState();
            this.setFileAreaClass();
        },
        methods: {
            setClassState() {
                let classState = "";
                classState += "";
                this.classState = classState;
            },
            setFileAreaClass() {
                let fileAreaClass = 'position-relative rounded-24px b-1 overflow-hidden border-dashed ';
                fileAreaClass += "h-" + this.height + "px ";
                fileAreaClass += this.$store.state.Base.isUseDarkTheme ? 'bg-light-dark border-white ' : 'bg-light-grey border-black ';

                this.fileAreaClass = fileAreaClass;
            },
            uploadByTus(file) {
                this.fileName = file.name;
                this.fileSize = file.size;
                this.onChange();
                const self = this;
                const upload = new tus.Upload(file, {
                    endpoint: this.$config.baseUrl + "/tus",
                    chunkSize: 1000000,
                    retryDelays: [0, 3000, 5000],
                    headers: {
                        "Authorization" : "Bearer " + User.getToken()
                    },
                    metadata: {
                        filename: file.name,
                        filetype: file.type,
                        organizationId: self.$store.state.Organization.default.id
                    },
                    onError(error) {
                        console.log("Failed because: " + error)
                    },
                    onProgress(bytesUploaded, bytesTotal) {
                        const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                        const intPercentage = parseInt(Math.round(percentage));
                        self.percentage = percentage;
                        self.intPercentage = intPercentage;
                        self.$emit("progress", percentage);
                    },
                    onSuccess(res) {
                        self.fileName = file.name;
                        self.$emit("input", file);
                        self.$emit("change", file);
                    }
                })

                upload.findPreviousUploads().then(function (previousUploads) {
                    // Found previous uploads so we select the first one. 
                    if (previousUploads.length) {
                        upload.resumeFromPreviousUpload(previousUploads[0])
                    }

                    // Start the upload
                    upload.start()
                })
            },            
            validateExtension(fileType) {
                const ext = this.extension;
                let result = false;
                if(ext !== "*") {
                    if(fileType.search(ext) > -1) {
                        result = true;
                    }
                } else{
                    result = true;
                }

                if(result === false) {
                    this.$toast.error("Hanya file yang berformat ." + ext + " yang boleh diupload");
                }

                return result;
            },
            deleteFile() {
                this.imageName = "";
                this.fileName = "";
                this.intPercentage =  0;
                this.percentage =  0;
                this.$emit("input", null);
                this.$emit("change", null);
            },
            onChange(e) {
                if(e) {
                    if(e.length > 0) {
                        const target = e[0].file
                        let isProcess = true
                        let maxSize = 0
                        let errorMessage = "";
                        if(this.validateExtension(target.type)) {
                            if(this.maxSize > 0 && target.size > this.maxSize) {
                                isProcess = false;
                                maxSize = this.maxSize / 1000000;
                                maxSize = maxSize.toFixed(1);
                                errorMessage = "File harus berukuran kurang dari " + maxSize + "MB";
                            }
                            if(this.variant === "tus") {
                                this.uploadByTus(target)
                            } else if(this.variant !== "tus") {
                                if(isProcess === true) {
                                    const type = target.type;
                                    if(type.search("image") > -1) {
                                        this.isImage = true;
                                        this.imageName = window.URL.createObjectURL(target);
                                    } else {
                                        this.isImage = false;
                                    }
                                    this.fileName = target.name;
                                    this.$emit("input", target);
                                    this.$emit("change", target);
                                } else {
                                    this.$toast.error(errorMessage);
                                }
                            }
                        }
                    } 
                }
            } 
        }
    }
</script>