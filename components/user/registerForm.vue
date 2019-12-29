<template>
  <el-form :model="formData" ref="form" :rules="rules" class="form" status-icon>
    <el-form-item class="form-item" prop="username">
      <el-input v-model="formData.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="验证码" v-model="formData.captcha">
        <template slot="append">
          <el-button ref="captcha" @click="handleSendCaptcha">{{captchaMessage}}</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="formData.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="formData.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="确认密码" type="password" v-model="validatePwd"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      }
    };
    // 验证昵称
    let validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("昵称不能为空,要么叫你憨憨吧!"));
      } else if (value.length > 12) {
        callback(new Error("哇!这么长,限制在12个字以下吧!"));
      }
    };
    // 验证密码
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码都不要,你岂不是要上天?"));
      } else if (value.length > 16) {
        callback(new Error("密码在16位以内就可以保护你的账号了!"));
      }
    };
    return {
      // 表单数据
      formData: {
        username: 15270659539,
        captcha: "",
        nickname: "小海绵",
        password: 1596321
      },
      validatePwd: 1596321,
      captchaMessage: "发送验证码",
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  // 方法函数
  methods: {
    // 点击发送验证码
    handleSendCaptcha() {
      // 发请求前先判断用户是否输入了正确的手机号
      let tel = this.formData.username;
      const reg = /^1[3-9][0-9]{9}$/;
      //若手机号验证成功,则给出倒计时并且禁用按钮,并发请求,当倒计时结束后才能点击再次发送验证码
      if (reg.test(tel)) {
        // 向服务器发请求发送验证码
        
        // 给出倒计时并且禁用按钮
        this.captchaMessage = 60;
        let onceagain = setInterval(() => {
          this.captchaMessage--;
          // 当倒计时结束后,关闭计时器,并将发送按钮取消禁用
          if (this.captchaMessage === 0) {
            clearInterval(onceagain);
            this.captchaMessage = '重新发送'
            this.$refs.captcha.$el.removeAttribute("disabled");
          }
        }, 1000);
        this.$refs.captcha.$el.setAttribute("disabled", "disabled");
      } else {
      }
    },

    // 注册
    handleRegSubmit() {
      console.log(this.formData);
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>