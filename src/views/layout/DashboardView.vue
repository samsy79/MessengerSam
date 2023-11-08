<template>
    <div>
        <MainDashbordVue />
    </div>
</template>

<script lang="ts" setup>
import MainDashbordVue from '../../components/Dashboard/MainDashbord.vue';
import router from "@/router";
import { ref } from "vue";
const userData = ref({
  email: "",
  name: "",
  username: "",
  surname: "",
});
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  userData.value.email = decodedToken.email;
  userData.value.name = decodedToken.name;
  userData.value.surname = decodedToken.surname;
  userData.value.username = decodedToken.username;
} else {
  console.log("Le token n'a pas été trouvé dans localStorage.");
  router.replace("/");
}
</script>