<template>
    <form v-if="!realBlock.user" action="" @submit="blocage ()">
        <button style="outline: none; padding: 10px 20px; border: 1px #fff solid;border-radius: 20%; background-color: #fff;" type="submit">Lock User<lockSvg style="margin-left: 10px ;"/></button>
    </form>
    <form v-if="realBlock.user" action="" @submit="unLock()">
        <button style="outline: none; padding: 10px 20px; border: 1px #fff solid;border-radius: 20%; background-color: #fff;" type="submit">UnLock User<unlockSvg style="margin-left: 10px ;"/></button>
    </form>
    <div style="height:100%;">
        <div class="chat-history">
            <ul class="m-b-0" >
                <li class="clearfix" v-for=" Message in UserMessages">
                    <div class="message-data text-right" style="display: flex;justify-content: end;">
                        <span class="message-data-time">10:10 AM, Today </span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                    </div>
                    <div class="message other-message float-right" >
                     {{Message.contenu}}
                    </div>
                </li>
                <li class="clearfix" v-for=" Message2 in UserMessage2">
                    <div class="message-data">
                        <span class="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div class="message my-message"> {{Message2.contenu}}</div>
                </li>
            </ul>
        </div>
        <sendMessageInput v-if="!realBlock.user" style="position: relative; "/>
    </div>
</template>
<script lang="ts" setup>

import sendMessageInput from '@/components/Dashboard/sendMessageInput.vue'

import sendSvg from '../icons /sendSvg.vue';
import unlockSvg from '../icons /unlockSvg.vue';
import NavBar from "../NavBar.vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { clientHttp } from "../../libs/clientHttps";
import { onMounted, ref } from "vue";
import lockSvg from '../icons /lockSvg.vue';
import axios from "axios";
import { loadEnv } from 'vite';
const error = ref("")

const UserMessages = ref([]);
const UserMessage2 = ref([]);
            const userData = ref({
            email: "",
            name: "",
            username: "",
            surname: "",
            id:""
            });

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  userData.value.email = decodedToken.email;
  userData.value.name = decodedToken.name;
  userData.value.surname = decodedToken.surname;
  userData.value.username = decodedToken.username;
  userData.value.id =decodedToken.id
} else {
  console.log("Le token n'a pas été trouvé dans localStorage.");
  router.replace("/");
}  

 const userMessage =ref({
    sender_id:"",
    receiver_id:""
 })
 const userMessage2 =ref({
    sender_id:"",
    receiver_id:""
 })

 async function getMessage() {
    try {
    
    const conversation_id = localStorage.getItem("conversation_id")
    userMessage.value.sender_id = userData.value.id
    userMessage.value.receiver_id = conversation_id

    
    if (
        userMessage.value.sender_id.trim() === ""||
        userMessage.value.receiver_id.trim() === ""
      ) {
        error.value = "Tous les champs sont requis";
    
        console.log("Tous les champs sont requis");
      } else {
    
    const userExist = await clientHttp.post(`/message/OneMessage/${conversation_id}` , userMessage.value);
    UserMessages.value = userExist.data.slice(0, 1000);

    console.log(UserMessages.value);
    
      }
    
     } catch (error) {
         
        console.log(error);
        
     }
 }

 async function getMessage2() {
    const conversation_id = userData.value.id
    userMessage2.value.sender_id = localStorage.getItem('conversation_id')
    userMessage2.value.receiver_id = userData.value.id

 const userExist2 = await clientHttp.post(`/message/OneMessage/${conversation_id}` , userMessage2.value);
    UserMessage2.value = userExist2.data.slice(0,1000)
 } 
 const realBlock = ref({
user :""
 })
 const bloque = ref({
    utilisateur_id:"",
    utilisateur_bloque_id :""
 })
 async function blocage (){
  bloque.value.utilisateur_id = userData.value.id 
  bloque.value.utilisateur_bloque_id = localStorage.getItem('conversation_id')

    const bloqueExist =  await clientHttp.post("/blocage/sendBlock" , bloque.value);
      console.log(bloqueExist);
      

 }
 async function getBlock(){
  bloque.value.utilisateur_id = userData.value.id 
  bloque.value.utilisateur_bloque_id = localStorage.getItem('conversation_id')
    const bloqueExist2 =  await clientHttp.post("/blocage/getBlock", bloque.value);
    console.log('toto');
    realBlock.value.user =  bloqueExist2.data.utilisateur_id
    console.log(realBlock.value.user);
 }
 async function unLock(){
    
    const bloqueExist3 =  await clientHttp.get(`/blocage/unlock/${ bloque.value.utilisateur_id}/${  bloque.value.utilisateur_bloque_id}`);
   
    console.log(bloqueExist3);
    
    
      

 }
 onMounted(getMessage)
 onMounted(getMessage2)
 onMounted(getBlock)


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
    overflow-y: auto;
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
  