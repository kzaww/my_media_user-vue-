<template>
    <!-- <div id="preloader-active" v-if="this.preLoad">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="">
                </div>
            </div>
        </div>
    </div>  -->
    <div>
          <ul class=" d-flex justify-content-center border-bottom pb-4" style="padding-right:90px;transform:translateY(20px);text-decoration:underline;">
              <li class="mx-2" style="font-size:1.2rem:font-weight:900;cursor:pointer;" @click="home()"><b class="text-primary">Home</b></li>
              <li class="mx-2" style="font-size:1.2rem:font-weight:900;cursor:pointer;" @click="logout()" v-if="this.loginCheck"><b class="text-danger">Logout</b></li>
          </ul>
    </div>
    <div style="">
        <div class="m-5 bg-danger text-white text-center" style="height:70vh;line-height:70vh;" v-if="!this.loginCheck">
            <span>To see this page U need to Login first</span>
        </div>

        <div class="col offset-2 mt-5" v-if="this.loginCheck">
            <button class="button button-contactForm boxed-btn" @click="$router.go(-1)">Back</button>
        </div>

        <div class="col-5 offset-4 mt-4" v-if="this.loginCheck">
            <div class="image" >
                <img :src="posts.image" alt="" style="width:500px;">
            </div>
            <div class="title mt-3">
                <h3 class="text-center">
                    {{ posts.post_title }}
                </h3>
            </div>
            <div class="paragraph mb-3" >
                <p style="line-break: normal">
                    {{ posts.post_description }}
                </p>
            </div>
            <div class="d-flex justify-content-end my-3" style="pointer-events:none;">
                <i class="fas fa-eye"></i>
                <span class="ml-1 text-info" style="transform:translateY(-4px)">{{ this.views }}</span>
            </div>
        </div>
    </div>

</template>

<script src="../js/NewsDetails.js">

</script>