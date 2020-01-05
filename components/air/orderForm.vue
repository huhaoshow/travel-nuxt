<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input v-model="item.id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}:￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurances(item.id)
          "
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button :disabled="isDisabled" @click="handleSendCaptcha">{{prompt}}</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      users: [
        {
          username: "小海绵", //  乘车人姓名
          id: 360730199507190333 // 乘车人身份证
        }
      ],
      insurances: [], // 保险id
      contactName: "小糊涂", // 联系人姓名
      contactPhone: "15270659539", // 联系人电话
      captcha: "000000", // 手机验证码
      invoice: false, // 是否需要发票
      seat_xid: "", // 座位id
      air: "", // 航班id
      prompt: "发送验证码", // 验证码提示
      isDisabled: false //  是否禁用按钮
    };
  },
  // 父传子数据
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // 方法函数
  methods: {
    // 添加乘机人
    handleAddUsers() {
      console.log(this.data);
      // 乘机人的信息通过循环user来渲染,当点击乘车人后,在user数组中添加一个对象,从而达到添加的效果
      this.users.push({
        username: "",
        id: "发送验证码"
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      // 在users数组中删除需要移除的乘车人信息
      this.users.splice(index, 1);
    },
    // 处理保险项目
    handleInsurances(insurancesId) {
      // 若没有传参,传递过来的参数是改变后的绑定值,若传递,则是传递过来的参数
      // 由于选中或者取消都会触发这个函数,则需要根据this.insurances中是否包含该id来判断出此次点击是添加还是取消,若包含则是取消该项保险,若不包含则是添加该项保险
      // 判断this.insurances中是否包含该id,有则是索引值,否则是-1
      const index = this.insurances.indexOf(insurancesId);
      // 如果有,删除this.insurances中的该项id,如果没有则添加
      if (index === -1) {
        this.insurances.push(insurancesId);
      } else {
        this.insurances.splice(index, 1);
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      // 发请求前先判断用户是否输入了正确的手机号
      const reg = /^1[3-9][0-9]{9}$/;
      //若手机号验证成功,给出倒计时并禁用按钮,然后则发请求,当倒计时结束后才能点击再次发送验证码
      if (reg.test(this.contactPhone)) {
        // 给出倒计时并且禁用按钮
        this.prompt = 60;
        let onceagain = setInterval(() => {
          this.prompt--;
          // 当倒计时结束后,关闭计时器,并将发送按钮取消禁用
          if (this.prompt === 0) {
            clearInterval(onceagain);
            this.prompt = "重新发送";
            this.isDisabled = false;
          }
        }, 1000);
        // 禁用按钮
        this.isDisabled = true;
        // 向服务器发请求发送验证码
        // nuxt默认将store挂载在vue中,所以只需要this.$store就可以访问到vuex
        // dispatch方法可以调用actions内的函数,规则和commit一致
        this.$store
          .dispatch("user/sendCaptcha", { tel: this.contactPhone })
          .then(res => {
            // 给用户提示发送成功
            // this.$message.success("验证码发送成功,请注意查收！");
            const { code } = res.data;
            // 模拟手机验证码
            this.$confirm(`模拟手机验证码为：${code}`, "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning"
            });
          });
      } else {
        this.$message.error("你的手机号有问题啊！");
      }
    },

    // 提交订单
    handleSubmit() {
      // 提交订单前验证必选项不能为空
      if (this.users && this.contactName && this.contactPhone && this.captcha) {
        // 将请求所需的参数补充完整
        const { id, seat_xid } = this.$route.query;
        const data = {
          users: this.users,
          insurances: this.insurances,
          contactName: this.contactName,
          contactPhone: this.contactPhone,
          captcha: this.captcha,
          invoice: false,
          seat_xid,
          air: id
        };
        // 向服务器发起提交请求
        this.$axios({
          url: "/airorders",
          method: "POST",
          headers: {
            // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          },
          data
        }).then(res=>{
          // 将页面跳转到订单支付页面
          console.log(res)
        });
      } else {
        this.$message.error("请填写完整信息");
      }
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>