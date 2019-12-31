<template>
  <el-form :model="formData" ref="form" :rules="rules" class="form" status-icon>
    <el-form-item class="form-item" prop="username">
      <el-input v-model="formData.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="formData.captcha">
        <template slot="append">
          <el-button :disabled="isDisabled" @click="handleSendCaptcha">{{captchaMessage}}</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="formData.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="formData.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="confirmPwd">
      <el-input placeholder="确认密码" type="password" v-model="formData.confirmPwd"></el-input>
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
      if (!value.trim()) {
        callback(new Error("用户名不能为空"));
      }else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    // 验证昵称
    let validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("昵称不能为空,要么叫你憨憨吧!"));
      } else if (value.length > 12) {
        callback(new Error("哇!这么长,限制在12个字以下吧!"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码都不要,你岂不是要上天?"));
      } else if (value.length > 16) {
        callback(new Error("密码在16位以内就可以保护你的账号了!"));
      } else {
        callback();
      }
    };
    // 确认密码验证
    let validateConfirmPwd = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("把你的密码再来一次！"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次密码输入不一致,憨憨吗？"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      formData: {
        username: "15270659539",
        captcha: "000000",
        nickname: "小海绵",
        password: '1596321',
        confirmPwd: '1596321'
      },
      isDisabled: false,
      captchaMessage: "发送验证码",
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        captcha: [
          { required: "true", message: "憨憨,没有验证码", trigger: "blur" }
        ],
        nickname: [
          { required: "true", message: "憨憨,没输入手机号", trigger: "blur" }
        ],
        password: [
          { required: "true", message: "憨憨,没输入手机号", trigger: "blur" }
        ],
        confirmPwd: [{ validator: validateConfirmPwd, trigger: "blur" }]
      }
    };
  },
  // 方法函数
  methods: {
    // 点击发送验证码
    handleSendCaptcha() {
      // 发请求前先判断用户是否输入了正确的手机号
      const reg = /^1[3-9][0-9]{9}$/;
      //若手机号验证成功,给出倒计时并禁用按钮,然后则发请求,当倒计时结束后才能点击再次发送验证码
      if (reg.test(this.formData.username)) {
        // 给出倒计时并且禁用按钮
        this.captchaMessage = 60;
        let onceagain = setInterval(() => {
          this.captchaMessage--;
          // 当倒计时结束后,关闭计时器,并将发送按钮取消禁用
          if (this.captchaMessage === 0) {
            clearInterval(onceagain);
            this.captchaMessage = "重新发送";
            this.isDisabled = false;
          }
        }, 1000);
        // 禁用按钮
        this.isDisabled = true;
        // 向服务器发请求发送验证码
        // nuxt默认将store挂载在vue中,所以只需要this.$store就可以访问到vuex
        // dispatch方法可以调用actions内的函数,规则和commit一致
        this.$store
          .dispatch("user/sendCaptcha", { tel: this.formData.username })
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

    // 注册
    handleRegSubmit() {
      console.log(this.formData);
      // el-form有validate,可以对整个表单进行验证,其中传入一个回调函数,该回调函数会在验证接收后调用,其中该回调函数有两个参数,第一个是验证结果,第二个是验证失败的表单元素集合
      this.$refs.form.validate((valid,obj) => {
        // 如果验证通过则发起注册请求,否则给出提示并且终止
        if (valid) {
          // 将formData中的confirmPwd删除
          // delete?怎么用?
          // 解构赋值和重构运算符的混用
          const { confirmPwd , ...registerData} = this.formData
          console.log(registerData)
          // 发起注册请求
          this.$store.dispatch('user/register',registerData)
        } else {
          this.$message.error('注册信息有误,请补全！')
        }
      })

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