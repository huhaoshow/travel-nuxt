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
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
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
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in flightsData.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
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
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
        //  获取过滤后的数组
        const arr = this.flightsData.flights.filter((item)=>{
            // 筛选出起飞机场与选择的机场相同的航班
            return value === item.org_airport_name
        })
        // 给父组件发射事件,让父组件修改
        this.$emit('filter',arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
        // 数组解构,取出触发时间和到达时间
        const [from,to] = value.split(',');
     //  获取过滤后的数组
        const arr = this.flightsData.flights.filter((item)=>{
            // 筛选出出发时间在选择时间段内的航班
            const start = item.dep_time.split(':')[0]   
            return start >= +from && start < +to 
        })
         // 给父组件发射事件,让父组件修改
        this.$emit('filter',arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
        //  获取过滤后的数组
        const arr = this.flightsData.flights.filter((item)=>{
            // filter   若直接return true则是返回所有   给出条件后,只有当结果是true的才会被返回
            // 筛选出航空公司与选择相同的航班
            return value === item.airline_name;
        })
        // 给父组件发射事件,让父组件修改
        this.$emit('filter',arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
        // 获取过滤后的数组
        const arr = this.flightsData.flights.filter((item)=>{
            // 筛选出机型与选择相同的航班
            return value === item.plane_size
        })
        // 给父组件发射事件,让父组件修改
        this.$emit('filter',arr)
    },

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