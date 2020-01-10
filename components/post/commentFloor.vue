<template>
  <div>
    <!-- 递归组件,知道生成1楼为止 -->
    <div class="oldReply" v-if="comment.parent">
      <firstComment :comment="comment.parent" />
    </div>
    <!-- 每层评论信息 -->
    <div class="newReply">
      <!-- 作者信息 -->
      <div class="replyInfo">
        {{comment.account.nickname}}
        <span>{{comment.created_at | timeFormat}}</span>
        <i>{{comment.level}}</i>
      </div>
      <!-- 评论内容 -->
      <div class="commentContent">
        <span>{{comment.content}}</span>
      </div>
      <!-- 回复按钮 -->
      <div class="replyButton">
        <span class="reply">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 递归组件命名
  name: "firstComment",
  // 父组件传递数据
  props: {
    comment: {
      type: Object,
      default() {
        return {
          account: {}
        };
      }
    }
  },
  // 过滤器
  filters: {
    timeFormat(data, spe) {
      spe = spe || "-";
      let time = new Date(data);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = time.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hours = time.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = time.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return year + spe + month + spe + day + spe + hours + spe + minutes;
    }
  }
};
</script>

<style scoped lang='less'>
.oldReply {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 2px;
}
.newReply {
  padding: 5px 10px 0;
  &:hover .replyButton span {
    display: inline;
  }
  .replyInfo {
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
    * {
      vertical-align: top;
    }
    img {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    span {
      color: #999;
    }
    i {
      float: right;
    }
  }
  .commentContent {
    span {
      font-size: 14px;
    }
    margin-top: 10px;
  }
  .replyButton {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #1e50a2;
    text-align: right;
    span {
      &:hover {
        text-decoration: underline;
      }
      display: none;
      cursor: pointer;
    }
  }
}
</style>