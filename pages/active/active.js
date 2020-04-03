// pages/active/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[],
    down_time:[],
  },
  //自定义方法，将秒转化处理为天、时、分、秒格式返回
  formatSeconds: function (value) {
    var result = "";
    var day = 0;//天
    var hour = 0;// 小时
    var min = 0;// 分
    var sec = 0;// 秒
    day = parseInt(value / 86400);
    hour = parseInt((value % 86400) / 3600);
    min = parseInt((value % 3600) / 60);
    sec = parseInt(value % 60);
    if (hour / 10 < 1) {
      hour = "0" + hour;
      if (hour == 0) {
        hour = "00";
      }
    }
    if (min / 10 < 1) {
      min = "0" + min;
      if (min == 0) {
        min = "00";
      }
    }
    if (sec / 10 < 1) {
      sec = "0" + sec;
      if (sec == 0) {
        sec = "00";
      }
    }
    result = "还剩下" + day + "天" + hour + "时" + min + "分" + sec + "秒";
    return result;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var _this = this;
    var item;
    wx.request({//小程序请求接口方式
      url: 'http://127.0.0.1:3002/active',//请求接口地址
      method: 'GET',//请求数据方式GET(快速请求)
      success: function (res) {
        var down_time=[];//数组存储商品活动倒计时数据
        //分组存储每个商品的活动倒计时
        for (var i = 0; i < res.data.item.length; i++) {
          //将商品倒计时从秒转化处理为天、时、分、秒格式存储
          down_time[i] = _this.formatSeconds(res.data.item[i].down_time)
        }
        item = res.data.item;
        _this.setData({ //存储请求返回的数据
          item: item,
          down_time:down_time
        });
        //间隔时间设为每隔1秒减1秒活动时间
        var interval = setInterval(function () {
          var down_time = [];
          for (var i = 0; i < item.length; i++) {
			if(item[i].down_time>1){//活动剩余时间大于1秒时触发减1
				item[i].down_time-=1;
				down_time[i] = _this.formatSeconds(item[i].down_time);
			}
          }
          _this.setData({
            item: item,
            down_time: down_time
          });
        }.bind(_this), 1000);//绑定对象，每隔1秒执行1次倒计时方法
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  activeDetail:function(event){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+event.target.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})