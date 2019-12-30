<template>
  <div>
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img" :class="full? 'full' : ''"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ['list','full']
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>