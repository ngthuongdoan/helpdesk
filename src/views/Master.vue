<template>
  <div>
    <Header></Header>
    <div class="container">
      <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style>
</style>