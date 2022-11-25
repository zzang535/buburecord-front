<template>
    <div class="UploadModal">
        <div class="modal-box">
            <div class="title">
                <h4>UPLOAD MEMORY</h4>
            </div>
            <div class="image">
                <img :src="url" >
            </div>
            <div class="input">
                <input type="date" v-model="date">
            </div>
            <div class="input">
                <textarea v-model="comment" placeholder="type comment"></textarea>
            </div>
            <div>
                <button @click="$emit('close')">취소</button>
                <button @click="create">업로드</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        file: File,
        url: String,
    },
    data() {
        return {
            date: '',
            comment: '',
            image: ''
        }
    },
    created() {
        console.log(this.file)
    },
    methods: {
        async create() {
            if(!this.date) { this.common_modal('날짜를 입력해주세요.'); return }
            if(!this.comment) { this.common_modal('코멘트를 입력해주세요.'); return }
            try {
                const url = '/feed/create'
                const payload = new FormData()
                payload.append('comment', this.comment)
                payload.append('date', this.date)
                payload.append('image', this.file)
                const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                const result = await this.$axios.post(url, payload, config)
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
    .UploadModal {
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
            height: 90vh;
         

            .title {
                border: 1px solid black;
                height: $header_height;
                h4 {
                    margin-right: 3px;
                    margin-left: 3px;
                }
            }

            .image {
                img {
                    width: 200px;
                }
            }

            .input {
                textarea {
                    border: 1px solid black;
                }
            }
        }
    }
</style>
  