// 这个文件用来存储关于的用户的vuex仓库

// 定义数据源   在页面中可以通过this.$store.state来获取数据
export const state = {
    token: '',
    userInfo: {}
}

// 同步修改state数据    在页面中可以通过this.$store.commit来调用函数
export const mutations = {
    // 修改用户信息
    setUserInfo (state , data) {
        // 在同一个文件中可以省略this.$store
        state.userInfo = data
    }
}

// 异步修改state数据    在页面中可以通过this.$store.dispatch来调用函数
export const actions = {
    // 发送验证码
    sendCaptcha (state ,data) {
        // 第一个参数代表的是state,第二个参数代表的是传过来的数据
        // 若返回this,则this代表的就是$store,因为在registerForm.vue中是通过this.$store来调用的该函数
        return this.$axios({
            url: '/captchas',
            method: 'POST',
            data
        })
    },
    // 注册用户
    register ({commit} ,data) {
        return this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data
        }).then((res)=>{
            console.log(res)
            // 注册成功后,自动登录
            // 将页面返回到上一页
            this.$router.back()
            // 将用户信息更新到页面
        })
    }
}