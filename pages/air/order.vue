<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="AirTicketsData" />
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="AirTicketsData" />
      </div>
    </el-row>
  </div>
</template>

<script>
// 引入订单表单组件
import OrderForm from "@/components/air/orderForm";
// 引入订单侧边栏组件
import OrderAside from "@/components/air/orderAside";
export default {
  // 注册组件
  components: { OrderForm, OrderAside },
  // 数据
  data() {
    return {
      AirTicketsData: {
        seat_infos: {}
      }
    };
  },
  // 钩子函数
  mounted() {
    // 组件加载完成后,向服务器请求机票信息
    this.$axios({
      url: "/airs/" + this.$route.query.id,
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then(res => {
      this.AirTicketsData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>