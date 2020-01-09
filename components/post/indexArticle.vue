<template>
  <!-- 单图文章 -->
  <div
    class="article"
    v-if="postInfo.images.length === 1"
    style="display:flex;justify-content:space-between;"
  >
    <div class="img">
      <!-- 文章图片 -->
      <div class="articleImg">
        <img v-for="(item,index) in postInfo.images" :key="index" :src="item" />
      </div>
    </div>
    <div class="content">
      <!-- 文章标题 -->
      <div class="articleTitle">
        <nuxt-link to="/">
          <h4 :title="postInfo.title">{{postInfo.title}}</h4>
        </nuxt-link>
      </div>
      <!-- 文章内容 -->
      <div class="articleContent">
        <p>{{postInfo.summary}}</p>
      </div>
      <!-- 文章信息 -->
      <div class="articleInfo">
        <!-- 作者信息 -->
        <div class="authorInfo">
          <span>
            <i class="el-icon-location-outline"></i>
            {{postInfo.cityName}}
          </span>
          <span>
            by
            <a href="/">
              <img :src="'http://localhost:1337' + postInfo.account.defaultAvatar" />
            </a>
            <a href="/">{{postInfo.account.nickname}}</a>
          </span>
          <span>
            <i class="el-icon-view"></i>
            &nbsp;{{postInfo.watch}}
          </span>
        </div>
        <!-- 文章点赞数 -->
        <div class="articleIdentify">74&nbsp;赞</div>
      </div>
    </div>
  </div>
  <!-- 多图文章 -->
  <div v-else class="article">
    <!-- 文章标题 -->
    <div class="articleTitle">
      <nuxt-link to="/">
        <h4 :title="postInfo.title">{{postInfo.title}}</h4>
      </nuxt-link>
    </div>
    <!-- 文章内容 -->
    <div class="articleContent">
      <p>{{postInfo.summary}}</p>
    </div>
    <!-- 文章图片 -->
    <div class="articleImg">
      <img v-for="(item,index) in postInfo.images" :key="index" :src="item" />
    </div>
    <!-- 文章信息 -->
    <div class="articleInfo">
      <!-- 作者信息 -->
      <div class="authorInfo">
        <span>
          <i class="el-icon-location-outline"></i>
          {{postInfo.cityName}}
        </span>
        <span>
          by
          <a href="/">
            <img :src="'http://localhost:1337' + postInfo.account.defaultAvatar" />
          </a>
          <a href="/">{{postInfo.account.nickname}}</a>
        </span>
        <span>
          <i class="el-icon-view"></i>
          &nbsp;{{postInfo.watch}}
        </span>
      </div>
      <!-- 文章点赞数 -->
      <div class="articleIdentify">74&nbsp;赞</div>
    </div>
  </div>
</template>

<script>
export default {
  // 父传递数据
  props: {
    postInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped lang='less'>
.article {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .articleTitle {
    font-size: 18px;
    h4 {
      // 单行文本超出部分省略并用省略号代替
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 400;
      margin-bottom: 15px;
      &:hover {
        color: orange;
      }
    }
  }
  .articleContent {
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
    p {
      color: #666;
      // 多行文本超过部分省略并用省略号代替
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
  .articleImg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin: 15px 0;
    img {
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
  }
  .articleInfo {
    display: flex;
    justify-content: space-between;
    .authorInfo {
      font-size: 12px;
      color: #999;
      display: flex;
      align-items: center;
      > span {
        margin-right: 10px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
          border-radius: 100px;
          margin: 5px;
        }
        span {
          color: orange;
        }
      }
    }
    .articleIdentify {
      color: orange;
    }
  }
}
.content {
  width: 470px;
  .articleContent {
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
    p {
      color: #666;
      // 多行文本超过部分省略并用省略号代替
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
.img {
  .articleImg {
    box-sizing: border-box;
    margin: 0;
    img {
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
  }
}
</style>