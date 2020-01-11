<template>
  <div class="comtainner">
    <!-- 左边文章详情 -->
    <div class="left">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 标题 -->
      <h2>{{postInfo.title}}</h2>
      <!-- 文章信息 -->
      <div class="postInfo">
        <span>攻略：{{postInfo.city.created_at}}</span>
        <span>阅读：{{postInfo.watch}}</span>
      </div>
      <!-- 文章内容 -->
      <div class="postContent" v-html="postInfo.content"></div>
      <!-- 文章操作项 -->
      <div class="postOption">
        <div class="item">
          <span>
            <i class="el-icon-edit-outline"></i>
            评论({{postInfo.comments.length}})
          </span>
          <span>
            <i class="el-icon-star-off"></i>
            收藏
          </span>
          <span>
            <i class="el-icon-share"></i>
            分享
          </span>
          <span>
            <i class="el-icon-thumb"></i>
            点赞(11)
          </span>
        </div>
      </div>
      <!-- 评论区域 -->
      <div class="comment">
        <h4>评论</h4>
        <!-- 评论框 -->
        <div class="commentFrame">
          <el-input
            type="textarea"
            rows="2"
            resize="none"
            placeholder="说点什么吧..."
            v-model="commentContent"
          ></el-input>
        </div>
        <!-- 上传图片和提交 -->
        <div class="uploadSubmit">
          <!-- 上传图片 -->
          <div class="upload">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <!-- 提交评论 -->
          <div class="submit">
            <el-button size="small" type="primary">提交</el-button>
          </div>
        </div>
        <!-- 回复跟帖 -->
        <!-- 评论列表 -->
        <div class="commentList">
          <!-- 评论内容 -->
          <div class="commentItem" v-for="(item,index) in commentArr" :key="index">
            <!-- 评论作者信息 -->
            <div class="authorInfo">
              <img :src="'http://localhost:1337' + item.account.defaultAvatar" />
              {{item.account.nickname}}
              <span>{{item.created_at | timeFormat}}</span>
              <i>{{item.level}}</i>
            </div>
            <!-- 评论内容 -->
            <div class="commentContent">
              <!-- 评论的所有跟帖,一级评论没有跟帖 -->
              <div class="allReply" v-if="item.parent">
                <CommentFloor :comment="item.parent" />
              </div>
              <!-- 最新跟帖内容 -->
              <div class="newReply">
                <span>{{item.content}}</span>
                <div class="replyButton">
                  <span>回复</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页栏 -->
        <div class="pagination"></div>
      </div>
    </div>
    <!-- 右边相关攻略 -->
    <div class="right">
      <h4>相关攻略</h4>
      <!-- 相关攻略列表 -->
      <div class="recommendList"></div>
    </div>
  </div>
</template>

<script>
// 引入评论组件
import CommentFloor from "@/components/post/commentFloor.vue";
export default {
  // 注册组件
  components: { CommentFloor },
  // 数据
  data() {
    return {
      postInfo: {
        city: {},
        comments: []
      }, // 文章信息
      commentArr: [], //  评论详情数组
      commentContent: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  // 钩子函数
  created() {
    // 当组件被创建后,向服务器请求文章详情数据渲染页面
    const id = this.$route.query.id;
    // 请求文章详情
    this.$axios({
      url: "/posts",
      params: { id }
    }).then(res => {
      // 将文章信息取出并储存起来
      const [data] = res.data.data;
      this.postInfo = data;
      console.log(this.postInfo);
    });
    // 请求评论
    this.$axios({
      url: "/posts/comments",
      params: {
        post: id,
        _limit: 2,
        _start: 1
      }
    }).then(res => {
      // 将返回的评论详情取出存入到commentArr中
      const { data } = res.data;
      this.commentArr = data;
      console.log(this.commentArr);
    });
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
  },
  // 方法函数
  methods: {
    handlePictureCardPreview() {},
    handleDownload() {},
    handleRemove() {}
  }
};
</script>

<style scoped lang='less'>
.comtainner {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 700px;
    h2 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .postInfo {
      color: #999;
      padding: 20px;
      text-align: right;
    }
    .postContent {
      line-height: 1.5;
      // 由于postContent盒子下的内容是通过v-html渲染出来的,所以由于scoped只能作用于这个文件,所以需要通过/deep/来深度修改
      /deep/ img {
        margin: 10px 0;
      }
      /deep/ * {
        max-width: 700px !important;
      }
    }
    .postOption {
      padding: 50px 0 30px;
      .item {
        display: flex;
        justify-content: center;
        span {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 20px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          i {
            color: orange;
            font-size: 28px;
            display: block;
          }
        }
      }
    }
    .comment {
      margin-bottom: 20px;
      h4 {
        font-weight: 400;
        margin-bottom: 20px;
        font-size: 18px;
      }
      .commentFrame {
        widows: 100%;
        margin-bottom: 10px;
        font-size: 14px;
        vertical-align: bottom;
      }
    }
    .uploadSubmit {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .upload {
        /deep/.el-upload--picture-card {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
        /deep/.el-upload-list--picture-card .el-upload-list__item {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
      }
    }
    .commentList {
      border: 1px solid #ddd;
      .commentItem {
        border-bottom: 1px dashed #ddd;
        padding: 20px 20px 5px;
        &:last-child {
          border-bottom: none;
        }
        .authorInfo {
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
          padding-left: 30px;
          .newReply {
            margin-top: 10px;
            &:hover .replyButton span {
              display: inline;
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
        }
      }
    }
    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  .right {
    width: 280px;
    h4 {
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>