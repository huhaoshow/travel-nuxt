<template>
  <div class="container">
    <div class="row">
      <!-- 攻略推荐 -->
      <!-- 菜单列 -->
      <div class="menusWrapper">
        <div class="menus">
          <!-- 目录列表 -->
          <div class="menuList">
            <div class="menusItem">
              <span>热门城市</span>
            </div>
            <div class="menusItem">
              <span>热门城市</span>
            </div>
            <div class="menusItem">
              <span>热门城市</span>
            </div>
            <div class="menusItem">
              <span>热门城市</span>
            </div>
          </div>
          <!-- 隐藏的目录 -->
          <div class="hiddenMenus">
            <ul>
              <li>
                <nuxt-link to="/">
                  <i>1</i>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <i>1</i>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <i>1</i>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <i>1</i>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <i>1</i>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- 推荐城市 -->
        <div class="recommendCitys">
          <h4>推荐城市</h4>
          <nuxt-link to="/">
            <img src="/images/pic_sea.jpeg" alt />
          </nuxt-link>
        </div>
      </div>
      <!-- 文章列 -->
      <div class="postWrapper">
        <!-- 搜索栏 -->
        <div class="searchWrapper">
          <!-- 搜索框 -->
          <div class="searchBar">
            <input type="text" placeholder="请输入想去的地方，比如：'广州'" />
            <i class="el-icon-search"></i>
          </div>
          <!-- 推荐城市关键字 -->
          <div class="recommendKeywords">
            推荐：
            <span>广州</span>
            <span>上海</span>
            <span>北京</span>
          </div>
        </div>
        <!-- 攻略标题栏 -->
        <div class="postTitle">
          <!-- tab栏 -->
          <div class="tabMenus">
            <div class="tabItem">推荐攻略</div>
          </div>
          <!-- 写游记 -->
          <div class="editPost">
            <el-button type="primary" icon="el-icon-edit">&nbsp;写游记</el-button>
          </div>
        </div>
        <!-- 攻略文章 -->
        <div class="postList">
          <IndexArticle />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入攻略文章组件
import IndexArticle from '@/components/post/indexArticle.vue'
export default {
  // 注册组件
  components:{ IndexArticle },
  // 数据
  data() {
    return {};
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
          display: none;
          z-index: 99999;
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
          background-color: skyblue;
          width: 100%;
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
            box-sizing: border-box;
            padding-top: 8px;
            height: 50px;
            font-weight: 400;
            font-size: 18px;
          }
        }
      }
    }
  }
}
.active {
  color: orange;
  border-right-color: #fff;
}
.tab-active {
  color: orange;
  border-bottom: 2px solid orange;
}
</style>