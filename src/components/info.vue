<template>
    
  <div class="connexion" v-if="AllUser">
    <div class="connexion-content">
      <div class="connexionForm">
        <div class="input-field">
          <h1>Personal Info</h1>
        </div>
        <form @submit="Info(), showToatSuccess()">
          <div class="input-field">
            <label for="">Localisation</label>
            <input style="color: white; font-weight: bold; font-size: 16px;"
              type="text"
              placeholder="Localisation"
              v-model="AllUser.localisation"
             disabled/>
          </div>
          <div class="input-field">
            <label for="">Profession</label>
            <input style="color: white; font-weight: bold; font-size: 16px;"
              type="text"
              placeholder="Profession"
              v-model="AllUser.profession"
           disabled />
          </div>
          <div class="input-field">

            <label for="">Phone Number</label>
            <input style="color: white; font-weight: bold; font-size: 16px;"
              type="number"
              placeholder="Phone Number"
              v-model="AllUser.tel"
            disabled/>
          </div>
          <div class="input-field">

            <label for="">Situation</label>
            <input style="color: white; font-weight: bold; font-size: 16px;"
              type="text"
              placeholder="Situation"
              v-model="AllUser.situation"
           disabled />
          </div>
          <div class="input-field">

            <label for="">Birthday</label>
            <input style="color: white; font-weight: bold; font-size: 16px;"
              type="text"
              placeholder="Birthday"
              v-model="AllUser.birthday"
            disabled/>
          </div>

          
        </form>
      </div>
    </div>
  </div>
  <div class="connexion" v-if="!AllUser">
    <div class="connexion-content">
      <div class="connexionForm">
        <div class="input-field">
          <h1>Personal Info</h1>
        </div>
        <form @submit="Info(), showToatSuccess()">
          <div class="input-field">
            <input
              type="text"
              placeholder="Localisation"
              v-model="userInfo.localisation"
            />
          </div>
          <div class="input-field">
            <input
              type="text"
              placeholder="Profession"
              v-model="userInfo.profession"
            />
          </div>
          <div class="input-field">
            <input
              type="number"
              placeholder="Phone Number"
              v-model="userInfo.tel"
            />
          </div>
          <div class="input-field">
            <input
              type="text"
              placeholder="Situation"
              v-model="userInfo.situation"
            />
          </div>
          <div class="input-field">
            <input
              type="date"
              placeholder="Birthday"
              v-model="userInfo.birthday"
            />
          </div>

          <div class="input-field">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterLink } from "vue-router";
import router from "@/router";
import { clientHttp } from "../libs/clientHttps";
import { onMounted, ref } from "vue";
import axios from "axios";
const error = ref(" ");

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
const userInfo = ref({
    utilisateur_id: "",
    localisation: "",
    birthday:"",
    profession:"",
    tel:"",
    situation:"",
});
const AllUser =ref([

])

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

userInfo.value.utilisateur_id = userData.value.id 
const Info = async function () {
  if (
    userInfo.value.localisation.trim() === "" ||
    userInfo.value.profession.trim() === "" ||
    userInfo.value.situation.trim() === "" ||
    userInfo.value.tel === "" ||
    userInfo.value.utilisateur_id.trim() === "" ||
    userInfo.value.birthday.trim() === ""
  ) {
    error.value = "Tous les champs sont requis";

    console.log("Tous les champs sont requis");
  } else {
  try {
    console.log("tati");
    


    const userExist = await clientHttp.post("/infoUser/send", userInfo.value);
    console.log("toto");
    

      error.value = 'Info are save'
    
  } catch (error) {
     console.log(error);
     
  }
}
}
const GetUser = async function () {
  if (
    userInfo.value.utilisateur_id.trim() === ""
  ) {
    error.value = "Tous les champs sont requis";

    console.log("Tous les champs sont requis");
  } else {
  try {
    console.log(userInfo.value.utilisateur_id );
    const userExist2 = await clientHttp.get(`/infoUser/get/${userInfo.value.utilisateur_id}`);
    AllUser.value =userExist2.data
    console.log(AllUser.value);
    
    console.log("toto");
    

      error.value = 'Info are save'
    
  } catch (error) {
     console.log(error);
     
  }
}
}
function showToatSuccess() {
  toast.success(error.value, {
    autoClose: 2000,
  })
  }
  onMounted(GetUser)
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
.connexion {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/image/Ab.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-opacity {
  background-color: rgba(77, 73, 73, 0.551);
  width: 100%;
  height: 100%;
}

.connexion-content {
  color: #fff;
  background-color: none;
  backdrop-filter: blur(10px);
  padding: 25px 15px;
  width: 400px;
  border-radius: 8px;
}

.input-field {
  padding: 10px;
}

.input-field input,
button {
  width: 100%;
  border-radius: 15px;
  padding: 12px 15px;
  outline: none;
  border: solid 2px #ccc;
}

.input-field .forgot {
  display: flex;
  justify-content: space-between;
}
</style>
