<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsHead />
        <!-- 航班信息 -->
        <FlightList v-for="(item,index) in flightList" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
// 引入航班头部组件
import FlightsHead from "@/components/air/flightsHead";
// 引入机票列表组件
import FlightList from "@/components/air/fligthtsList";

export default {
  data() {
    return {
      flightsData: {}, // 航班总数据
      flightList: [] //  航班列表数据,为之后的分页做准备
    };
  },
  // 注册组件
  components: { FlightsHead, FlightList },
  // 方法函数
  methods: {
    // 封装请求航班数据的方法
    async getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // 将返回的数据存起来,方便使用
        this.flightsData = res.data;
        this.flightList = res.data.flights;
      });
    }
  },
  // 钩子函数
  mounted() {
    // 在组件加载完毕后,向服务器请求航班数据
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>