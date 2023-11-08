<template>
    <NavBar class="navBar" >
    </NavBar>
  <div>
    <info />
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import info from "@/components/info.vue";
</script>

<style scoped>
.navBar{
  position: absolute !important;
}
</style>