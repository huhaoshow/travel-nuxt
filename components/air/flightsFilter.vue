<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{flightsData.info.departCity}} - {{flightsData.info.destCity}}
        /
        {{flightsData.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <!-- label是页面显示的值
          value是change事件中返回的值-->
          <el-option
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in flightsData.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item, index) in flightSize"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <!-- 为了 -->
    <span>{{filterData}}</span>
  </div>
</template>

<script>
export default {
  // 父传子属性
  props: {
    // 传入的航班总数据
    flightsData: {
      type: Object,
      default: {}
    }
  },
  // 数据
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      //   用于循环的飞机尺寸
      flightSize: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  // 计算属性
  computed: {
    // 监听airport,flightTimes,company,airSize的变化,当其发生改变时,重新筛选符合条件的arr,并传递给父组件,让父组件将需要循环的航班列表更改
    filterData() {
      // 获取过滤后的数组
      const filterArr = this.flightsData.flights.filter(item => {
        // 默认所有的航班都是满足要求的
        let valid = true;
        // 过滤的规则是将有筛选条件且不符合要求的将其定为false
        // 过滤起飞机场
        if (this.airport && item.org_airport_name !== this.airport) {
          valid = false;
        }
        // 过滤起飞时间
        if (this.flightTimes) {
          // 获取到起飞时间的小时数
          const start = item.dep_time.split(":")[0];
          const [from, to] = this.flightTimes.split(",");
          // 若start不在from和to之间,则说明不在筛选条件之内
          if (start < from || start >= to) {
            valid = false;
          }
        }
        // 过滤航空公司
        if (this.company && this.company !== item.airline_name) {
          valid = false;
        }

        // 过滤机型
        if(this.airSize && this.airSize !== item.plane_size) {
          valid = false;
        }
        return valid;
      });
      // 给父组件发射事件,让父组件修改
      this.$emit('filter',filterArr)
      // 执行计算属性的函数必须要在页面上渲染,但又不想显示在页面上,则在页面上返回一个空字符串
      return '' 
    }
  },
  // 方法函数
  methods: {
    // 以下是单选条件的筛选,当使用多个条件筛选的话可以将其注释掉
    // 选择机场时候触发
    // handleAirport(value) {
    //     //  获取过滤后的数组
    //     const arr = this.flightsData.flights.filter((item)=>{
    //         // 筛选出起飞机场与选择的机场相同的航班
    //         return value === item.org_airport_name
    //     })
    //     // 给父组件发射事件,让父组件修改
    //     this.$emit('filter',arr)
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //     // 数组解构,取出触发时间和到达时间
    //     const [from,to] = value.split(',');
    //  //  获取过滤后的数组
    //     const arr = this.flightsData.flights.filter((item)=>{
    //         // 筛选出出发时间在选择时间段内的航班
    //         const start = item.dep_time.split(':')[0]
    //         return start >= +from && start < +to
    //     })
    //      // 给父组件发射事件,让父组件修改
    //     this.$emit('filter',arr)
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //     //  获取过滤后的数组
    //     const arr = this.flightsData.flights.filter((item)=>{
    //         // filter   若直接return true则是返回所有   给出条件后,只有return true的项才会被返回
    //         // 筛选出航空公司与选择相同的航班
    //         return value === item.airline_name;
    //     })
    //     // 给父组件发射事件,让父组件修改
    //     this.$emit('filter',arr)
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    //     // 获取过滤后的数组
    //     const arr = this.flightsData.flights.filter((item)=>{
    //         // 筛选出机型与选择相同的航班
    //         return value === item.plane_size
    //     })
    //     // 给父组件发射事件,让父组件修改
    //     this.$emit('filter',arr)
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {}
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>