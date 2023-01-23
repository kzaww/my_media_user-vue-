import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: 'HomePage',
    data() {
        return {
            postLists: {},
            categoryLists: {},
            searchkey: '',
            userData: {
                email: "",
                password: "",
            },
            loginCheck: false,
            loginsuccess: false,
            loginfail: false,
            preLoad: true,
        }
    },
    computed: {
        ...mapGetters(["getToken", "getUserData"]),
    },
    methods: {
        postData() {
            axios.get("http://127.0.0.1:8000/api/allPost").then((response) => {


                for (let i = 0; i < response.data.data.length; i++) {
                    let image = response.data.data[i].image;
                    if (image != null) {
                        response.data.data[i].image = "http://127.0.0.1:8000/storage/" + image;
                    } else {
                        response.data.data[i].image = "http://127.0.0.1:8000/admin/defaultImage/defaultImage.png";
                    }
                    this.preLoad = false;
                }

                this.postLists = response.data.data;
                // console.log(this.postLists);
            });
        },

        categoryData() {
            axios.get("http://127.0.0.1:8000/api/allCategory").then((response) => {
                this.categoryLists = response.data.data;
                // console.log(this.categoryLists);
            }).catch(e => {
                console.log(e);
            });
        },
        search() {
            let search = {
                key: this.searchkey
            }
            axios.post("http://127.0.0.1:8000/api/searchPost", search).then((response) => {
                for (let i = 0; i < response.data.data.length; i++) {
                    let image = response.data.data[i].image;
                    if (image != null) {
                        response.data.data[i].image = "http://127.0.0.1:8000/storage/" + image;
                    } else {
                        response.data.data[i].image = "http://127.0.0.1:8000/admin/defaultImage/defaultImage.png";
                    }
                }

                this.postLists = response.data.data;
            }).catch(e => {
                console.log(e);
            });
            // this.searchkey = "";

        },

        newsDetails(id) {
            // console.log(id);
            this.$router.push({
                path: "/newsDetails/" + id
            });
        },
        searchCategory(searchKey) {
            let search = {
                key: searchKey
            }
            axios.post("http://127.0.0.1:8000/api/searchCategory", search).then((response) => {
                for (let i = 0; i < response.data.data.length; i++) {
                    let image = response.data.data[i].image;
                    if (image != null) {
                        response.data.data[i].image = "http://127.0.0.1:8000/storage/" + image;
                    } else {
                        response.data.data[i].image = "http://127.0.0.1:8000/defaultImage/defaultImage.png";
                    }
                }

                this.postLists = response.data.data;
                // console.log(response.data.data);
            }).catch(e => {
                console.log(e);
            });
        },
        userLogin() {
            axios.post("http://127.0.0.1:8000/api/user/login", this.userData).then((response) => {
                if (response.data.token != null) {
                    // console.log("login success")
                    this.$store.dispatch("setToken", response.data.token);
                    this.$store.dispatch("setUserData", response.data.user);
                    this.loginCheck = true;
                    this.loginsuccess = true;
                } else {
                    // console.log("there is no such user");
                    this.loginfail = true;
                }
                this.userData.email = "";
                this.userData.password = "";
            }).catch(e => {
                console.log(e);
            });
        },
        check() {
            if (this.getToken != "" && this.getToken != null && this.getToken != undefined) {
                this.loginCheck = true;
            } else {
                this.loginCheck = false;
            }
        },
        logout() {
            this.$router.push({
                name: "home"
            });
            this.$store.state.token = "";
            this.$store.state.userData = {};
            this.loginCheck = false;
            this.loginsuccess = false;
            this.loginfail = false;
        },
        // something() {
        //     console.log(this.getToken);
        //     console.log(this.loginCheck);
        // }
    },
    mounted() {
        this.loginfail = false;
        this.loginsuccess = false;
        this.preLoad = true;
        this.userData.email = "";
        this.userData.password = "";
        this.postData();
        this.categoryData();
        this.check();
    }
}