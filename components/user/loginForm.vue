<template>
  <el-form :model="formData" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="formData.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="formData.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
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
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
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
    return {
      // 表单数据
      formData: {
        username: "15270659539",
        password: "1596321"
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      console.log(this.formData);
      this.$refs.form.validate((valid, obj) => {
        // 如果验证通过则发起注册请求,否则给出提示并且终止
        if (valid) {
          // 发起登录请求
          this.$store.dispatch("user/login", this.formData).then((res)=>{
            // 如果登录成功则接收到返回的true
            if (res) {
                // 给用户提示,登录成功
                this.$message.success('登陆成功！')
            }
          });
        } else {
          this.$message.error("用户信息有误,请补全！");
        }
      });
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
