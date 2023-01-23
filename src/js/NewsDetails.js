import axios from "axios"
import { mapGetters } from "vuex";
export default {
    name: "NewsDetails",
    data() {
        return {
            PostId: 0,
            posts: {},
            loginCheck: false,
            views: "",
            preload: true,
        }
    },
    computed: {
        ...mapGetters(["getToken", "getUserData"])
    },
    methods: {

        detailPost(ids) {
            let id = {
                key: ids,
            }
            axios.post("http://127.0.0.1:8000/api/detailPost", id).then((response) => {
                if (response.data.data.image != null) {
                    response.data.data.image = "http://127.0.0.1:8000/storage/" + response.data.data.image;
                } else {
                    response.data.data.image = "http://127.0.0.1:8000/admin/defaultImage/defaultImage.png";
                }
                // console.log(response.data.data);
                this.posts = response.data.data;
                this.preload = false;
                // console.log(this.PostDetail);
            }).catch(e => {
                console.log(e);
            })
        },
        check() {
            if (this.getToken != "" && this.getToken != null && this.getToken != undefined) {
                this.loginCheck = true;
            } else {
                this.loginCheck = false;
            }
        },
        home() {
            this.$router.push({
                name: "home"
            })
        },
        logout() {
            this.$router.push({
                name: "home"
            });
            this.$store.state.token = "";
            this.$store.state.userData = {};
            this.loginCheck = false;
        },
        viewCount() {
            if (this.loginCheck) {
                let data = {
                    user_id: this.getUserData.id,
                    post_id: this.PostId
                }
                axios.post("http://127.0.0.1:8000/api/activityLog", data).then((response) => {
                        this.views = response.data.data.length;
                    }).catch(e => {
                        console.log(e);
                    })
                    // console.log(data);
            }
        }
    },
    mounted() {
        this.PostId = this.$route.params.id;
        this.detailPost(this.PostId);
        this.check();
        this.viewCount();
        this.preload = true;
    },
}