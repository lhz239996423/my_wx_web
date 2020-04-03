// pages/mine/mine.js
//定义常量获取全局变量，使用全局变量引用用户信息
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//存放获取的用户信息
    hasUserInfo: false,//用户信息获取状态
    //判断当前使用的微信版本是否支持getUserInfo方法，getUserInfo用来获取用户信息
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取用户信息的方法
  getUserInfo: function (e) {
    console.log(e);
    //全局变量赋值用户信息
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      //用户信息存储到本地数据
      userInfo: e.detail.userInfo,
      hasUserInfo: true//设置用户信息获取状态为真
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