// 这个文件用来存储关于的用户的vuex仓库

// 定义数据源(要求是一个函数,返回一个对象)   在页面中可以通过this.$store.state来获取数据
// 若箭头函数内部只返回一个对象,则可以用()=>({})简写,和()=>{return {}} 一样
export const state = () => ({
    userInfo: {}
})

// 同步修改state数据    在页面中可以通过this.$store.commit来调用函数
export const mutations = {
    // 修改用户信息
    setUserInfo(state, data) {
        // 在同一个文件中可以省略this.$store
        state.userInfo = data
    }
}

// 异步修改state数据    在页面中可以通过this.$store.dispatch来调用函数
export const actions = {
    // 用户登录
    login({ commit }, data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data
        }).then((res) => {
            // 验证成功,将页面跳回上一页,并且更新页面上的用户信息,并且返回true
            this.$router.back()
            // 调用mutation的方法,更新页面
            commit('setUserInfo', res.data)
            return true
        })
    },
    // 发送验证码
    sendCaptcha(state, data) {
        // 第一个参数代表的是state,第二个参数代表的是传过来的数据
        // 若返回this,则this代表的就是$store,因为在registerForm.vue中是通过this.$store来调用的该函数
        return this.$axios({
            url: '/captchas',
            method: 'POST',
            data
        })
    },
    // 注册用户
    register({ commit }, data) {
        return this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data
        }).then((res) => {
            // 注册成功后,自动登录
            this.$router.back()
            commit('setUserInfo', res.data)
            return true
        })
    }
}