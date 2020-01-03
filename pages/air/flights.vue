<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightFilter ref="filterChild" :flightsData="cacheFlightsData" @filter="handleFlightsData" />

        <!-- 航班头部布局 -->
        <FlightsHead />
        <!-- 航班信息 -->
        <FlightList v-for="(item,index) in flightsList" :key="index" :data="item" />
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
// 引入航班头部组件
import FlightsHead from "@/components/air/flightsHead";
// 引入航班列表组件
import FlightList from "@/components/air/fligthtsList";
// 引入过滤组件
import FlightFilter from "@/components/air/flightsFilter";
// 引入侧边栏组件
import FlightsAside from '@/components/air/flightsAside';
export default {
  data() {
    return {
      flightsData: {
        //   由于在渲染页面的时候,异步请求的数据还没有请求成功,则info等属性都是undefind,从而导致之后的点语法造成错误,所以可以在请求没有成功前将其定为一个空对象,空对象使用点语法只会返回undefind,而不会报错
        info: {},
        options: {},
        flights: []
      }, // 航班总数据
      //   flightsList: [], //  航班列表数据,存储切割后的航班数据
      // 定义flightsData的缓存变量,当该变量一旦被赋值之后不会被修改,不知道怎么形容必要性,但是挺重要的,本项目的用处是给过滤组件用于循环,防止每次过滤后的航班列表数据修改后造成影响
      cacheFlightsData: {
        info: {},
        options: {},
        flights: []
      },
      pageIndex: 1, //  当前页
      pageSize: 5, //  显示条数
      total: 0 // 总条数
    };
  },
  // 注册组件
  components: { FlightsHead, FlightList, FlightFilter, FlightsAside},
  // 方法函数
  methods: {
    // 封装请求航班信息的方法
    getFlightsList() {
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // 将返回的数据存起来,方便使用
      this.flightsData = res.data;
      //   赋值给缓存flightData变量,一旦赋值后不能被修改,需要拆解运算符将其内容提取出来,而不是内存地址
      this.cacheFlightsData = { ...res.data };
      // 更新航班总条数
      this.total = res.data.total;
      // 重置页码为1
      this.pageIndex = 1
      // 将所有筛选条件重置
      // this.$refs.filterChild可以找到子组件中绑定的成员
      this.$refs.filterChild.airport = "";
      this.$refs.filterChild.flightTimes = "";
      this.$refs.filterChild.company = "";
      this.$refs.filterChild.airSize = "";
    });
    },
    // 每页显示条数改变时触发的函数
    handleSizeChange(value) {
      // 改变每页显示条数时,让页面匹配,并将页码重置为1
      this.pageSize = value;
      this.pageIndex = 1;
    },
    // 当前页面改变时会触发
    handleCurrentChange(value) {
      // 改变页码时,让当前页面显示的页码与之匹配
      this.pageIndex = value;
    },
    // 给flightsFilter组件修改this.flightsData.flights
    handleFlightsData(filterFlights) {
      // 将循环的航班列表替换成筛选过后的航班列表
      this.flightsData.flights = filterFlights;
      // 修改总条数
      this.total = filterFlights.length;
    }
  },
  // 钩子函数
  mounted() {
    // 在组件加载完毕后,向服务器请求航班数据
    this.getFlightsList()
  },
   // 监听
  watch: {
    // 监听路由的变化,路由变化后页面重新获取数据
    '$route'() {
      // 重新加载航班列表
      this.getFlightsList();
    }
  },
  // 计算属性
  computed: {
    // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
    // 计算属性中可以同时监听多个变量,只要函数内部的变量改变后,就会重新计算,而watch监听只能监听一个变量
    // 由于数据的总数不多,每次请求将所有数据返回,在切换页码的时候不需要重新请求数据了,为了实现分页的功能,需要用到computed计算属性
    flightsList() {
      // 若请求还没完成,则返回一个空数组
      if (!this.flightsData.flights) {
        return [];
      }
      // 计算分页的数据
      // 将返回的所有的航班信息切割
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
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