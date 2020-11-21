<template>
  <div class="home">
    <left-menu :key="key"/>
    <div class="main-app" :class="{ 'menu-unfold': $store.state.collapsed }">
      <slider-nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNavs.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();// key值变化，子组件就会重新渲染;
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
