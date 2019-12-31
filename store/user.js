// 这个文件用来存储关于的用户的仓库

// 定义数据内容
export const state = () => {
    return {
        nickname:'小糊涂'
    }
}

// 同步修改state数据
export const mutations = {
    changeName (state,data) {
        state.nickname = data
    }
}

// 异步修改state数据
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
    register (state ,data) {
        return this.$axios({
            url: '/accounts/register',
            methods: 'POST',
            data
        }).then((res)=>{
            console.log(res)
        })
    }
}