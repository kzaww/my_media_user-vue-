<template>
    <div id="preloader-active" v-if="this.preLoad">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="">
                </div>
            </div>
        </div>
    </div> 
    
    <div>
          <ul class=" d-flex justify-content-center border-bottom pb-4" style="padding-right:90px;transform:translateY(20px);text-decoration:underline;">
              <li class="mx-2" style="font-size:1.2rem:font-weight:900;cursor:pointer;" v-if="this.loginCheck" @click="logout()"><b class="text-danger">Logout</b></li>
              <li class="mx-2" style="font-size:1.2rem:font-weight:900;cursor:pointer;" v-if="!this.loginCheck" data-toggle="modal" data-target="#exampleModal"><b class="text-primary">Login</b></li>
          </ul>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Login</h3>
            <button type="button" class="btn-close bg-danger px-3 p-2 rounded " data-dismiss="modal" aria-label="Close" >x</button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger text-center" v-if="this.loginfail">
              <small>user does not exist</small>
            </div>
            <div class="alert alert-success text-center" v-if="this.loginsuccess">
              <small>login success</small>
            </div>
            <div class="form-group">
              <label for="ema">Email :</label>
              <input type="email" class="form-control" id="ema" placeholder="example@gmail.com" v-model="this.userData.email">
            </div>
            <div class="form-group">
              <label for="pass">Password :</label>
              <input type="password" class="form-control" id="pass" placeholder="" v-model="this.userData.password">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-danger p-2 px-4 rounded" data-dismiss="modal" style="">Close</button>
            <button type="button" class="btn-primary p-2 px-4 rounded" @click="userLogin()">Login</button>
          </div>
        </div>
      </div>
    </div>
    <div>



      <!-- Whats New Start -->
      <section class="whats-news-area pt-50 pb-20">
          <div class="container">
              <div class="row">
                  <div class="col-lg-12">
                      <div class="row d-flex justify-content-between">
                          <div class="col-lg-3 col-md-3">
                              <div class="section-tittle mb-30">
                                  <h3>Whats New</h3>
                              </div>
                          </div>
                          <div class="col-lg-9 col-md-9">
                              <div class="properties__button">
                                  <!--Nav Button  -->
                                  <nav>
                                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" 
                                          href="details.htmlnav-home" role="tab" aria-controls="nav-home" aria-selected="true"
                                          @click="searchCategory('')"
                                          >All</a
                      >
                      <a
                        class="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="details.htmlnav-profile"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                        v-for="(category,index) in categoryLists"
                        :key="index"
                        @click="searchCategory(category.category_title)"
                        >{{ category.category_title }}</a
                      >
                    </div>
                  </nav>
                  <!--End Nav Button  -->
                </div>
              </div>
            </div>

            <div class="col-6 offset-6">
              <div class="row">
                <div class="input-group col-6 offset-6 mb-2">
                  <input type="text" class="form-control" v-model="searchkey" v-on:keyup.enter="search()">
                  <span class="input-group-text" style="cursor:pointer;" @click="search()">search</span>
                </div>

              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <!-- Nav Card -->
                <div class="tab-content" id="nav-tabContent">
                  <!-- <div class="col offset-5 mb-3" v-if="record !=''">
                    <span class="col-12 bg-secondary text-white px-1 py-2 rounded"><b>search result for: </b>{{ searchkey }}</span>
                  </div> -->
                  <div v-if="postLists.length == 0">
                    <h1 class="text-danger d-flex justify-content-center align-items-center alert alert-warning" style="height:70vh;">There is no data!!</h1>
                  </div>
                  <!-- card one -->
                  <div
                    class="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div class="whats-news-caption">

                      <div class="row">

                        <div class="col-lg-6 col-md-6" v-for="(post,index) in postLists" :key="index" >
                          <div class="single-what-news mb-100" @click="newsDetails(post.post_id)">
                            <div class="what-img">
                              <img
                                :src="post.image" 
                                alt="" style="width:500px;height:350px"
                              />
                            </div>
                            <div class="what-cap">
                              <span class="color1">News</span>
                              <h4>
                                <a href="details.html"
                                  >{{ post.post_title }}</a
                                >
                              </h4>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Nav Card -->
              </div>
            </div>
          </div>
              </div>
          </div>
      </section>
      <!-- Whats New End -->

      <!--Start pagination -->
      <!-- <div class="pagination-area pb-45 text-center">
          <div class="container">
              <div class="row">
                  <div class="col-xl-12">
                      <div class="single-wrap d-flex justify-content-center">
                          <nav aria-label="Page navigation example">
                              <ul class="pagination justify-content-start">
                                  <li class="page-item">
                                      <a class="page-link" href="details.html"><span class="flaticon-arrow roted"></span
                    ></a>
                                          </li>
                                          <li class="page-item active">
                                              <a class="page-link" href="details.html">01</a>
                                          </li>
                                          <li class="page-item">
                                              <a class="page-link" href="details.html">02</a>
                                          </li>
                                          <li class="page-item">
                                              <a class="page-link" href="details.html">03</a>
                                          </li>
                                          <li class="page-item">
                                              <a class="page-link" href="details.html"><span class="flaticon-arrow right-arrow"></span
                    ></a>
                                          </li>
                                          </ul>
                                  </nav>
                                  </div>
                              </div>
                          </div>
                      </div>
      </div> -->
      <!-- End pagination  -->
    </div>
</template>

<script src="../js/HomePage.js">
</script>
