<template>
  <div :id="'num'+id" class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" :value="newcount" @change="updateCar(id)" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../lib/mui/js/mui.min.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  data() {
    return {
      newcount: this.$props.count
    };
  },
  props: ["count", "id"],
  methods: {
    updateCar(id) {
      this.newcount = mui("#num" + id).numbox().getValue();
    //   console.log(id + "---" + this.newcount);
      this.$store.commit("updateCarNum", { id, count: this.newcount });
    }
  }
};
</script>

<style>
</style>