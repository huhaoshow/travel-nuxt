<template>
  <div class="container">
    <!-- 攻略推荐 -->
    <el-row type="flex" justify="space-between">
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
            <img src="/images/pic_sea.jpeg" alt="">
          </nuxt-link>
        </div>
      </div>
      <!-- 文章列 -->
      <div class="postWrapper">右边</div>
    </el-row>
    <!-- 攻略列表 -->
  </div>
</template>

<script>
export default {
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
  .menusWrapper {
    width: 260px;
    position: relative;
    .menus {
      .menuList {
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
    .recommendCitys{
      margin-top: 20px;
      h4{
        font-weight: 400;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
      }
      img{
        background-color: skyblue;
        width: 100%;
        display: block;
      }
    }
  }
  .postWrapper {
    width: 700px;
  }
}
.active {
  color: orange;
  border-right-color: #fff;
}
</style>