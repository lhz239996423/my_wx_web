// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//放置商品ID
    info:[]//放置商品详细信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//option为页面跳转链接传递的参数集合
    var _this = this;
    this.setData({
      id:options.id//提取附在跳转链接后的商品ID值
    });
    wx.request({
      url: 'http://127.0.0.1:3002/detail',//请求detail接口返回商品详细数据
      method: 'GET',
      data:{
        id:options.id
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({info:res.data[0]});//请求返回的商品信息保存到本地info数组中
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