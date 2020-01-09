<template>
  <div class="container">
    <div class="row">
      <!-- 攻略推荐 -->
      <!-- 菜单列 -->
      <div class="menusWrapper">
        <div class="menus" @mouseleave="handleTabHidden">
          <!-- 目录列表 -->
          <div class="menuList">
            <div
              @mouseenter="handleMenusTab(item,index)"
              class="menusItem"
              v-for="(item,index) in menusList"
              :key="index"
              :class="{active:index === currentTab}"
            >
              <span>{{item.type}}</span>
            </div>
          </div>
          <!-- 隐藏的目录 -->
          <div class="hiddenMenus" v-show="isShow">
            <ul>
              <li @click="handleSearchPost(item.city)" v-for="(item,index) in showList" :key="index">
                  <i>{{index+1}}</i>
                  <strong>{{item.city}}</strong>
                  <span>{{item.desc}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 推荐城市 -->
        <div class="recommendCitys">
          <h4>推荐城市</h4>
          <nuxt-link to="/">
            <img src="../../assets/recommendCitys.jpeg" alt />
          </nuxt-link>
        </div>
      </div>
      <!-- 文章列 -->
      <div class="postWrapper">
        <!-- 搜索栏 -->
        <div class="searchWrapper">
          <!-- 搜索框 -->
          <div class="searchBar">
            <input
              @keyup.enter="handleSearchPost()"
              v-model="city"
              type="text"
              placeholder="请输入想去的地方，比如：'广州'"
            />
            <i class="el-icon-search" @click="handleSearchPost()"></i>
          </div>
          <!-- 推荐城市关键字 -->
          <div class="recommendKeywords">
            推荐：
            <span @click="handleSearchPost('广州')">广州</span>
            <span @click="handleSearchPost('上海')">上海</span>
            <span @click="handleSearchPost('北京')">北京</span>
          </div>
        </div>
        <!-- 攻略标题栏 -->
        <div class="postTitle">
          <!-- tab栏 -->
          <div class="tabMenus">
            <div class="tabItem theme-active">推荐攻略</div>
          </div>
          <!-- 写游记 -->
          <div class="editPost">
            <el-button type="primary" icon="el-icon-edit">&nbsp;写游记</el-button>
          </div>
        </div>
        <!-- 攻略文章 -->
        <div class="postList">
          <IndexArticle v-for="(item,index) in showPost" :key="index" :postInfo="item" />
        </div>
        <!-- 分页栏 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[3, 5, 7]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入攻略文章组件
import IndexArticle from "@/components/post/indexArticle.vue";
export default {
  // 注册组件
  components: { IndexArticle },
  // 数据
  data() {
    return {
      currentTab: "", // 当前tab栏选项卡的索引值
      isShow: false, // 是否显示tab栏内容
      menusList: [], // 目录循环列表
      showList: [], // tab栏展示循环列表
      allPost: [], // 所有文章
      city: "", // 搜索城市
      // showPost: [],   // 在页面上渲染的文章数组
      total: 0, // 文章总条数
      pageIndex: 1, // 当前显示的页码
      pageSize: 3 //每页显示的文章数
    };
  },
  // 方法函数
  methods: {
    // 鼠标移入时,给对应选项卡添加active,并展示出对应的内容
    handleMenusTab(item, index) {
      // 将当前tab的index赋值给currentTab,使得在tab栏中的index === currentTab成立,从而加上active类名
      this.currentTab = index;
      // 将对应的展示栏目显示出来,将item中的children赋值给showList,让其在展示区域渲染
      this.isShow = true;
      this.showList = item.children;
    },
    // 鼠标移出tab栏时将内容展示框隐藏,并取消所有的active
    handleTabHidden() {
      this.isShow = false;
      this.currentTab = "";
    },
    // 点击时触发,发请求获取与输入内容相关的攻略文章并渲染到页面
    handleSearchPost(city) {
      // 如果有传递城市,则将传过来的城市绑定给this.city
      if(city) {
        this.city = city;
      }
      // 如果没有输入关键字,则搜索所有文章
      if (!this.city) {
        this.$axios({
          url: "/posts"
        }).then(res => {
          // 将文章列表存储到this.allPost,并更新文章总数
          const data = res.data.data;
          this.allPost = data;
          this.total = this.allPost.length;
        });
      } else {
        this.$axios({
          url: "/posts",
          params: {
            city: this.city
          }
        }).then(res => {
          const data = res.data.data;
          this.allPost = data;
          this.total = this.allPost.length;
        });
      }
    },
    // 当每页显示数量改变时触发,将页面上的展示条数更新,并且将页码重置为1
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
    },
    // 当前页改变时触发,将页面上展示的文章更新
    handleCurrentChange(value) {
      this.pageIndex = value;
    }
  },
  // 钩子函数
  created() {
    // 在组件被创建后,向服务器请求数据渲染页面
    // 请求目录
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      const { data } = res.data;
      this.menusList = data;
    });
    // 请求文章
    this.$axios({
      url: "/posts"
    }).then(res => {
      // 将文章列表存储到this.allPost,并更新文章总数
      const data = res.data.data;
      this.allPost = data;
      this.total = this.allPost.length;
    });
  },
  // 计算属性
  computed: {
    // 监听showPost内的所有变量,当数据变化时,重新计算新的showPost
    showPost() {
      // 将请求回来的所有文章数组进行切割
      return this.allPost.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .row {
    display: flex;
    justify-content: space-between;
    .menusWrapper {
      width: 260px;
      position: relative;
      .menus {
        .menuList {
          width: 260px;
          border: 1px solid #ddd;
          border-right: none;
          border-bottom: none;
          box-shadow: 0 0 1px #f5f5f5;
          .menusItem {
            z-index: 3;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            font-size: 14px;
            padding: 0 20px;
            position: relative;
            cursor: pointer;
            // after伪元素添加箭头
            &::after {
              content: "";
              display: block;
              width: 10px;
              height: 10px;
              border-right: 1px solid #999;
              border-top: 1px solid #999;
              transform: rotate(45deg);
              position: absolute;
              right: 20px;
              top: 15px;
            }
          }
        }
        .hiddenMenus {
          z-index: 2;
          position: absolute;
          width: 350px;
          top: 0;
          left: 260px;
          padding: 10px 20px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          background-color: #fff;
          ul {
            li {
              cursor: pointer;
              font-size: 14px;
              line-height: 1.5;
              i {
                color: orange;
                font-size: 24px;
                font-style: italic;
              }
              strong:hover {
                text-decoration: underline;
              }
              strong {
                margin: 0 10px;
                color: orange;
                font-weight: 400;
              }
              span:hover {
                text-decoration: underline;
              }
              span {
                color: #999;
              }
            }
          }
        }
      }
      .recommendCitys {
        margin-top: 20px;
        h4 {
          font-weight: 400;
          padding-bottom: 10px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 10px;
        }
        img {
          width: 100%;
          height: 173.2px;
          display: block;
        }
      }
    }
    .postWrapper {
      width: 700px;
      .searchWrapper {
        .searchBar {
          width: 100%;
          position: relative;
          input {
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            line-height: 40px;
            outline: none;
            border: 3px solid orange;
            text-indent: 20px;
          }
          i {
            font-size: 24px;
            color: orange;
            font-weight: 700;
            position: absolute;
            top: 8px;
            right: 10px;
          }
        }
        .recommendKeywords {
          font-size: 12px;
          padding: 10px 0;
          color: #666;
          span {
            margin-right: 5px;
            &:hover {
              color: orange;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
      .postTitle {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
        border-bottom: 1px solid #eee;
        .tabMenus {
          flex: 1;
          display: flex;
          .tabItem {
            z-index: 1;
            box-sizing: border-box;
            padding-top: 8px;
            height: 50px;
            font-weight: 400;
            font-size: 18px;
          }
        }
      }
    }
    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
.active {
  color: orange;
  border-right-color: #fff !important;
}
.theme-active {
  z-index: 99999;
  color: orange;
  border-bottom: 2px solid orange;
}
</style>