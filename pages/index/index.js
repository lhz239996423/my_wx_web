//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background: ['../../assets/static/4.jpg', '../../assets/static/5.jpg', '../../assets/static/6.jpg'],
    navList:[],
    movieList:[]
  },
  //事件处理函数
  onLoad: function (options) {
    var _this = this;//获取当前对象
    wx.request({     //小程序请求接口方式
      url: 'http://127.0.0.1:3002/index',//请求接口地址
      method: 'GET',              //请求数据方式GET(快速请求)
      success: function (res) {   //请求成功执行
        _this.setData({           //存储请求返回的数据
          navList: res.data.navList,//包含8个列表图标数据
          movieList: res.data.movieList//包含3张电影海报数据
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
