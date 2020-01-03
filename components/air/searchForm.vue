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
        <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate" v-model="singleFrom.departDate" :picker-options="pickerOptions"></el-date-picker>
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
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
       departCity: [], // 出发城市的下拉列表
       destCity: [], // 到达城市的下拉列表
      // 禁用今天以前的日期 
      pickerOptions:{
        disabledDate(today) {
          // 当返回true则则禁用
          return today.getTime() + 3600 * 1000 * 24 < Date.now()
        }
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
    // 目的是防止用户不用输入建议从而导致code无法被赋值
    handleDepartBlur(){
      // 如果departCity数组的长度大于0,则说明请求过数据
      if(this.departCity.length > 0) {
        this.singleFrom.departCity = this.departCity[0].value
        this.singleFrom.departCode = this.departCity[0].sort
      }
    },
    handleDestBlur(){
      // 如果destCity数组的长度大于0,则说明请求过数据
      if(this.destCity.length > 0) {
        this.singleFrom.destCity = this.destCity[0].value
        this.singleFrom.destCode = this.destCity[0].sort
      }
    },
    // 当用户离开到达城市输入框时,默认选择下拉列表的第一个城市

    // 出发城市输入框获得焦点时触发,且每次更改内容也会触发
    // value 输入框绑定的值，cb是回调函数, 调用时候展示下拉列表，注意参数必须是数组，数组中元素必须是对象，对象中必须包含value属性,对象代表的是输入建议的所有内容,对象中的value属性会显示在下拉框中
    queryDepartSearch(value, cb) {
       // 若用户没有输入内容,可以添加其他的提示框供用户选择,本项目资源有限,不给出提示,只有当用户输入内容后给予相应的提示
      if (value.trim() === ''){
        cb([]);
        return;
      }
      // 获取到用户输入的内容,调取接口请求获取与之相关的可选城市
      this.$axios({
        url: '/airs/city',
        params: {name:value}
      }).then((res)=>{
        // 取出返回的与关键字有关的信息,并渲染到用户提示中
        const {data} = res.data
        this.departCity = data.map((item)=>{
          // 给每一项添加一个value属性,并且将市字去除
          item.value = item.name.replace('市','')
          return item
        })
        cb(this.departCity)
      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // 若用户没有输入关键字,则不发请求,直接返回空提示
     if(value.trim() === '') {
       cb([]);
       return;
     }
    //  根据关键字发请求获取与之关联的可选城市
    this.$axios({
      url: '/airs/city',
      params: {name: value}
    }).then((res)=>{
      const {data} = res.data
      this.destCity = data.map((item)=>{
        item.value = item.name.replace('市','')
        return item
      }) 
      cb(this.destCity)
    })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // item是每一项用户提示中的所有内容,本项目中的item === cb(this.destCity)中的this.destCity
      this.singleFrom.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.singleFrom.departCode = item.sort
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.singleFrom.departDate = moment(value).format("YYYY-MM-DD")
    },

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 点击搜索,进行机票搜索
    handleSubmit() {
      // 在提交搜索前,对表单内容进行验证
      // 自定义验证规则 (通过状态来判断)
      const rules = {
        departCity: {
          value: this.singleFrom.departCity,
          errorMessage: '出发城市不能为空'
        },
        destCity: {
          value: this.singleFrom.departCity,
          errorMessage: "到达城市不能为空"
        },
        departDate: {
          value: this.singleFrom.departDate,
          errorMessage: "出发日期不能为空"
        }
      }
      // 定义一个验证变量,初始默认为true,只要不符合验证规则将其定位false且终止操作
      let valid = true;
      // 循环判断rules的值,当为空的时候则说明有输入框没有填写内容
      // Object.keys()是js原生的方法,可以取出对象的键
      Object.keys(rules).forEach((item)=>{
        // 如果有一项为空，把valid设置为false
        if (rules[item].value === '') {
          this.$message.error(rules[item].errorMessage);
          valid = false;
          return;
        }
        // 若判断到valid为false则中止循环
        if (valid === false) return;
      })
      if (valid === false) return;

      // 将页面跳转到搜索结果页面
      this.$router.push({
        path: '/air/flights',
        query: this.singleFrom
      })
      // 将本次搜索结果存入到vuex
      this.$store.commit('air/setHistory',this.singleFrom)
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