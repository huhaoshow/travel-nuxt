<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 单程 -->
    <el-form class="search-form-content" ref="form" label-width="80px" v-model="singleFrom">
      <el-form-item label="出发城市">
        <!-- autocomplete 是一个可带输入建议的输入框组件，fetch-suggestions 是一个返回输入建议的方法属性 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="singleFrom.departCity"
          @blur="handleDepartBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="singleFrom.destCity"
          @blur="handleDestBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- el-date-picker日期选择组件 -->
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate" v-model="singleFrom.departDate"></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
    <!-- 多程 -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      // 从接口文档中发现需要传五个参数
      singleFrom: {
        departCity: "广州", // 出发城市
        departCode: "CAN", // 出发城市代码
        destCity: "上海", // 到达城市
        destCode: "SHA", // 到达城市代码
        departDate: "" // 日期字符串
      }
    };
  },
  // 方法函数
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
    },
    // 当用户离开出发城市输入框时,默认选择下拉列表的第一个城市
    handleDepartBlur(){
        console.log('离开了')
    },
    handleDestBlur(){},
    // 当用户离开到达城市输入框时,默认选择下拉列表的第一个城市

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      cb([{ value: '广州' }, { value: 2 }, { value: 3 }]);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {},

    // 目标城市下拉选择时触发
    handleDestSelect(item) {},

    // 确认选择日期时触发
    handleDate(value) {
      this.singleFrom.departDate = moment(value).format("YYYY-MM-DD")
    },

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 点击搜索,进行机票搜索
    handleSubmit() {
      console.log(this.singleFrom);
      this.$router.push({
        path: '/air/flights',
        query: this.singleFrom
      })
    }
  },
  // 钩子函数
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>