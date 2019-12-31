<template>
  <div class="container">
    <el-carousel indicator-position="outside" trigger="click" :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
         background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // 变量
  data() {
    return {
      banners: []
    };
  },
  // 钩子函数
  mounted() {
    // 获取轮播图图片
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      if (res.status === 200) {
        // 将轮播图的路径存储在变量banners中,在赋值前需要先将res.data中的data解构
        let { data } = res.data;
        this.banners = data;
      } else {
        this.$message.error("请求失败");
      }
    });
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>