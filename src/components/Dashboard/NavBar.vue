<template>
    <div class="Total">
        <div class="row Totas ">
            <div class="Totas">
                <div class="cards chat-app">
                    <div class="chat">
                        <div style="height:100%;">
                            <div class="chat-header clearfix">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                        </a>
                                        <div class="chat-about" >
                                            <h6 class="m-b-0">{{users}}</h6>
                                            <small>Last seen: 2 hours ago</small>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 hidden-sm text-right d-flex justify-content-end">
                                        <a href="javascript:void(0);" class="btn btn-outline-secondary"><RouterLink to="/home"><homeSvg/></RouterLink></a>
                                        <a href="javascript:void(0);" class="btn btn-outline-primary"><RouterLink to=""><phoneSvg/></RouterLink></a>
                                        <a href="javascript:void(0);" class="btn btn-outline-info"><RouterLink to=""><microSvg/></RouterLink></a>
                                        <a href="javascript:void(0);" class="btn btn-outline-warning"><RouterLink to="/info"><userSvg /></RouterLink></a>
                                    </div>
                                </div>
                            </div>

                            <RouterView>

                            </RouterView>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import searchSvg from '../icons /searchSvg.vue';
import { ref, onMounted } from 'vue';
import { clientHttp } from "../../libs/clientHttps";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import homeSvg from '../icons /homeSvg.vue';
import phoneSvg from '../icons /phoneSvg.vue';
import microSvg from '../icons /videoSvg.vue';
import userSvg from '../icons /userSvg.vue';

  const users = ref("");
  const route: RouteLocationNormalizedLoaded = useRoute();

  const getUser = async () => {
  try {

const id = ref('') 
 const user_Id = id.value = route.params.id;
 console.log(user_Id);
 
    const userExist = await clientHttp.get(`/users/friend/${user_Id}` );
    users.value = userExist.data.name
    console.log(users.value);
    



  } catch (error) {
    console.error(error);
  }
};

onMounted(getUser);

</script>
<style scoped>
body {
    background-color: #f4f7f6;
    margin-top: 20px;
}

.Total {
    width: 100vw;
    height: 100vh;
}

.Totas {
    width: 100%;
    height: 100%;
}

.cards {
    background: #fff;
    transition: 0.5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: 0.55rem;
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}

.people-list {
    width: 280px;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    z-index: 7;
}

.chat-app {
    width: 100%;
    height: 100%;
}

.chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea;

    height: 100%;
}

.people-list {
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
}

.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px;
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer;
}

.people-list .chat-list li.active {
    background: #efefef;
}

.people-list .chat-list li .name {
    font-size: 15px;
}

.people-list .chat-list img {
    width: 45px;
    border-radius: 50%;
}

.people-list img {
    float: left;
    border-radius: 50%;
}

.people-list .about {
    float: left;
    padding-left: 8px;
}

.people-list .status {
    color: #999;
    font-size: 13px;
}

.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6;

}

.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px;
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px;
}

.chat .chat-history {
    padding: 20px;
    border-bottom: 2px solid #fff;
    height: 80%;
}

.chat .chat-history ul {
    padding: 0;
}

.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
    margin-bottom: 0px;
}

.chat .chat-history .message-data {
    margin-bottom: 15px;

}

.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px;
}

.chat .chat-history .message-data-time {
    color: #434651;
    padding-left: 6px;
}

.chat .chat-history .message {
    color: #444;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    display: inline-block;
    position: relative;
}

.chat .chat-history .message:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px;
}

.chat .chat-history .my-message {
    background: #efefef;

}

.chat .chat-history .my-message:after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #efefef;
    border-width: 10px;
    margin-left: -10px;
}

.chat .chat-history .other-message {
    background: #e8f1f3;
    text-align: right;
}

.chat .chat-history .other-message:after {
    border-bottom-color: #e8f1f3;
    left: 93%;
}

.chat .chat-message {
    padding: 20px;
}

.online,
.offline,
.me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle;
}

.online {
    color: #86c541;
}

.offline {
    color: #e47297;
}

.me {
    color: #1d8ecd;
}

.float-right {
    float: right;
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}

@media only screen and (max-width: 767px) {
    .chat-app .people-list {
        height: 100%;
        width: 100%;
        overflow-x: auto;
        background: #fff;
        left: -400px;
        display: none;
    }

    .chat-app .people-list.open {
        left: 0;
    }

    .chat-app .chat {
        margin: 0;
    }

    .chat-app .chat .chat-header {
        border-radius: 0.55rem 0.55rem 0 0;
    }

    .chat-app .chat-history {
        overflow-x: auto;
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .chat-app .chat-list {
        height: 650px;
        overflow-x: auto;
    }

    .chat-app .chat-history {
        height: 600px;
        overflow-x: auto;
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    .chat-app .chat-list {
        height: 480px;
        overflow-x: auto;
    }   

    .chat-app .chat-history {
        height: calc(100vh - 350px);
        overflow-x: auto;
    }
}
</style>
  