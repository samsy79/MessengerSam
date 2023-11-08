<template>
    <div class="chat-message clearfix">
        <form action="" @submit="send ">
        <div class="input-group mb-0">
            <div class="input-group-prepend">
               <button type="submit"> <span class="input-group-text" style="padding-bottom:15px;"><sendSvg/></span></button>
            </div>
            <input type="text"  v-model="userMessager.contenu" class="form-control" placeholder="Enter text here...">
        </div>
    </form>
    </div>
</template>
<script lang="ts" setup>
import sendSvg from '../icons /sendSvg.vue';
import NavBar from "../NavBar.vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { clientHttp } from "../../libs/clientHttps";
import { ref } from "vue";
import axios from "axios";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const conversation_id = localStorage.getItem("conversation_id")
const error = ref("")
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

const userMessager = ref({
  contenu: "",
  sender_id: "",
  receiver_id:"",
});

userMessager.value.sender_id = userData.value.id

 userMessager.value.receiver_id = conversation_id
 console.log(userMessager.value.sender_id);

const send = async function () {
  if (
    userMessager.value.contenu.trim() === "" ||
    userMessager.value.sender_id.trim() === ""||
    userMessager.value.receiver_id.trim() === ""
  ) {
    error.value = "Tous les champs sont requis";

    console.log("Tous les champs sont requis");
  } else {
    try {

const userMesSend = await clientHttp.post(`/message/send/${conversation_id}` ,userMessager.value);
    console.log('toto');
    
    } catch (e) {
      error.value = "oups something wrong";
      console.log(e);
    }
  }
};




</script>


<style  scoped> 

button{
    outline: none;
               border: 0px solid ;border-radius: 10%;

}
</style>