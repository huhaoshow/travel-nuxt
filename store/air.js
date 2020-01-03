// 这个文件存储了关于机票的vuex库

// 定义数据库
export const state = () => ({
    history:[]
})

// 异步处理方法
export const mutations = {
    // 修改history的数据
    setHistory(state,data) {
        state.history.unshift(data)
    } 
}

// 同步处理方法
export const actions = {
}