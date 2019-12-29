// 这个文件用来存储关于的用户的仓库

// 定义数据内容
export const state = {
    nickname:'小糊涂'
}

// 同步修改state数据
export const mutations = {
    changeName (state,data) {
        state.nickname = data
    }
}

// 异步修改state数据
export const actions = {
    
}