<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 导入生成二维码的包
import QRCode from "qrcode";
export default {
  // 数据
  data() {
    return {
      price: 0,
      timerId: ""
    };
  },
  // 钩子函数
  mounted() {
    // 组件加载完毕后向服务器请求订单详情数据
    // 由于mounted的速度快过vuex同步本地数据库的速度,所以需要设置延迟
    setTimeout(() => {
      this.$axios({
        url: "/airorders/" + this.$route.query.id,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        // 将付款信息和总金额取出
        this.price = res.data.price;
        const { payInfo } = res.data;
        // 找到用于存放二维码的canvas的dom元素
        const canvasQRcode = document.querySelector("#qrcode-stage");
        // 调用QRCode的toCanvas方法,将付款信息下的付款url转换成二维码在页面上显示
        // options的格式是对象
        QRCode.toCanvas(canvasQRcode, payInfo.code_url, {
          width: 200
        });
        // 查询付款状态
        this.timerId = setInterval(() => {
          this.isPay(payInfo).then(res => {
            // 如果订单状态不是NOTPAY则说明订单已支付
            // console.log(res)
            const {trade_state} = res.data
            if (trade_state !== "NOTPAY") {
              // 订单支付成功后将关闭定时器
              clearInterval(this.timerId);
              // 给出提示,并关闭页面,跳到国内机票页面
              this.$message.success("支付成功,即将跳转回首页");
              this.$router.push({ path: "/air" });
            }
          });
        }, 3000);
      });
    }, 1);
  },
    // 钩子函数
    destroyed() {
        // 若没有支付,但离开了订单页,定时器仍会继续工作,所以需要加入摧毁组件后执行的钩子函数来关闭定时器
        clearInterval(this.timerId)
    },
  //  方法函数
  methods: {
    // 封装查询付款状态接口方法
    isPay(data) {
      // 获取订单id
      const { id } = this.$route.query;
      return this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id,
          nonce_str: data.nonce_str,
          out_trade_no: data.order_no
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>