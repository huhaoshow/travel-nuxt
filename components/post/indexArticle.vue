<template>
  <div class="article">
    <!-- 文章标题 -->
    <div class="articleTitle">
      <nuxt-link to="/">
        <h4 title="塞班贵？一定是你的打开方式不对！6000块玩转塞班">
          <slot name="title">塞班贵？一定是你的打开方式不对！6000块玩转塞班</slot>
        </h4>
      </nuxt-link>
    </div>
    <!-- 文章内容 -->
    <div class="articleContent">
      <p>
        <slot
          name="content"
        >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</slot>
      </p>
    </div>
    <!-- 文章图片 -->
    <div class="articleImg">
      <img
        src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
        alt
      />
      <img src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png" alt />
      <img
        src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
        alt
      />
    </div>
    <!-- 文章信息 -->
    <div class="articleInfo">
      <!-- 作者信息 -->
      <div class="authorInfo">
        <span>
          <i class="el-icon-location-outline"></i>
          北京市
        </span>
        <span>
          by
          <a href="/">
            <img src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png" alt />
          </a>
          <a href="/">地球发动机</a>
        </span>
        <span>
          <i class="el-icon-view"></i>
          &nbsp;1346
        </span>
      </div>
      <!-- 文章点赞数 -->
      <div class="articleIdentify">74&nbsp;赞</div>
    </div>
  </div>
</template>

<script>
export default {};
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
      text-overflow: ellipsis;
      display: -webkit-box;
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
</style>