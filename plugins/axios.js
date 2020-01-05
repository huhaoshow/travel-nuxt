// 这个文件用于添加axios的错误拦截器的插件

// 插件使用步骤
// 1.写插件 
// 2.调用插件

import {Message} from "element-ui";
// 只要是在插件中调用了的插件,都可以打印出nuxt,所以只需要解构出需要的成员即可
export default ({$axios,redirect}) => {
    // axios有onError方法可以将错误拦截,拦截axios的错误
    $axios.onError(err => {
        // err可以接受到js原生的错误对象ERROR
        // response是js原生Error对象的属性,可以看到返回的错误信息
        const {statusCode, message} = err.response.data;
        if(statusCode === 401 || statusCode === 403){
            Message.warning({message: "请先登录"});
            redirect("/user/login");
        }
        // 当服务器报400错的时候,提示用户密码错误
        if(statusCode === 400){
            Message.warning({message});
        }
    })
}