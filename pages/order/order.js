// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    carList:[],
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '支付'
    })
    var _this = this;
    
    var count=options.count.split(",");
    count=count.map((value)=>{
      return parseInt(value);
    });
    wx.request({
      //user接口要求定义sessionId字段的值，这里随便取值即可通过验证
      url: 'http://127.0.0.1:3002/user?sessionId=123',
      method: 'GET',
      success: function (res) {
        //获取用户信息
        var userInfo=res.data.userInfo;
        console.log(userInfo);
        //再次请求，order为订单页面数据接口
        wx.request({
          url: 'http://127.0.0.1:3002/order',
          method: 'GET',
          success: function (res) {
            var all = 0;
            for (var i = 0; i < res.data.data.length; i++) {
              all = all + res.data.data[i].num * parseInt(res.data.data[i].new_price);
            }
            _this.setData({
              userInfo: userInfo,//用户信息存储到本地userInfo[]数组中
              carList: res.data.data,//订单接口返回的商品信息存储到本地
              total: all
            });
          },
          fail: function (res) {
            console.log(res);
          }
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
    
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