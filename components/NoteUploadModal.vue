<template>
    <div class="NoteUploadModal">
        <div class="modal-box">
            <div class="top">
                <div class="left">UPLOAD NOTE</div>
                <div class="right" @click="$emit('close')">
                    <img src="~assets/img/close-slim-black.svg" alt="">
                </div>
            </div>
            <div class="input-date">
                <input type="date" v-model="date" />
            </div>
            <div class="input-text">
                <input type="text" v-model="titleKR" placeholder="TITLE (KOREAN)">
            </div>
            <div class="input-text">
                <input type="text" v-model="titleJP" placeholder="TITLE (JAPANESE)">
            </div>
            <div class="input_editor">
                <ckeditor-nuxt v-model="contentKR" :config="editorConfig" />
            </div>
            <div class="input_editor">
                <ckeditor-nuxt v-model="contentJP" :config="editorConfig" />
            </div>
            <div class="button_box">
                <button @click="uploadNote">업로드</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
      'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },
    data() {
        return {
            date: this.$moment().format('YYYY-MM-DD'),
            titleKR: '',
            titleJP: '',
            contentKR: '',
            contentJP: '',

            editorConfig: {
                simpleUpload: {
                    uploadUrl: 'path_to_image_controller',
                    headers: {
                        'Authorization': 'optional_token'
                    },
                },
                removePlugins:['Title','Stylescombo','TableToolbar','RemoveFormat','Strikethrough','Highlight','Code','CodeBlock','Superscript','Subscript','BlockQuote', 'MathType','TodoList','Table','Heading','ImageInsert','PageBreak','List'],
            },
        }
    },
    created() {
    },
    methods: {
        async uploadNote() {
            if(!this.date) { this.common_modal('날짜를 입력해주세요.'); return }
            if(!this.titleKR) { this.common_modal('제목을 입력해주세요.'); return }
            if(!this.titleJP) { this.common_modal('제목을 입력해주세요.'); return }
            if(!this.contentKR) { this.common_modal('내용을 입력해주세요.'); return }
            if(!this.contentJP) { this.common_modal('내용을 입력해주세요.'); return }
            try {
                const url = '/note/create'
                const payload = {
                    date: this.date,
                    titleKR: this.titleKR,
                    titleJP: this.titleJP,
                    contentKR: this.contentKR,
                    contentJP: this.contentJP
                }
                const result = await this.$axios.post(url, payload)
                console.log(result)
                this.$emit('complete')
            } catch (err) {
                console.log(err)
            }
        },

        // module
		common_modal(title, type = 'alert', func = null){
            this.$nuxt.$emit('popup', { state: true, title, type, func })
		},
    }
}
</script>

<style lang="scss">
    .NoteUploadModal {
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000; // 모달

        .modal-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            border: 1px solid black;
            border-radius: 2px;
            background: #fff;
            width: 90vw;
            max-width: 860px;
            height: 90vh;
            padding: 10px;
            border-radius: 10px;

            .top {
                /* border: 1px solid black; */
                height: $header_height;
                line-height: $header_height;
                padding-left: 10px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                .left {
                    /* border: 1px solid red; */
                }
                .right {
                    /* border: 1px solid blue; */
                    height: $header_height;
                    cursor: pointer;
                    img {
                        height: 100%;
                    }
                }
            }

            .input_editor {
                border: 1px solid black;
                border-radius: 5px;
                height: calc(90vh - 500px);
                background-color: black;
                text-align: center;
                /* line-height: calc(90vh - 600); // 세로 중앙정렬 */

                .ck-editor__editable {
                    height: calc(90vh - 550px);
                }
            }

            .input-date {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .input-text {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .button_box {
                display: flex;
	            justify-content: space-between;
                button {
                    border: 1px solid $color_admin_background;
                    width: 100%;
                    height: 44px;
                    border-radius: 5px;
                    background: $color_green;
                    color: $color_white;
                }
            }
        }
    }
</style>
  