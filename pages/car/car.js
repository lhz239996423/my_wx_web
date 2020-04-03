// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
    total:0
  },
  getCar:function(){//获取购物车页面所需数据
    var _this = this;
    wx.request({//小程序请求数据
      //cartList接口指定字段userId的值为weiyide才能引用
      url: 'http://127.0.0.1:3002/cartList?userId=weiyide',
      method: 'GET',
      success: function (res) {
        var all = 0;
        //res.data.data是一个二维数组存放多个一维数组的商品信息
        for (var i = 0; i < res.data.data.length; i++) {
          //遍历商品种类，计算每个商品的总价
          all = all + res.data.data[i].num * parseInt(res.data.data[i].new_price);
        }
        _this.setData({//赋值给本地存储
          carList: res.data.data,//存储所有商品信息
          total: all//存储所有商品的结算总价
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//页面时加载执行
    this.getCar();//执行对象下的getCar()方法
  },

  //增加商品数量方法
  add: function(event){
    //获取触发事件的ID，事先将ID设为商品对应的数组下标
    var i = event.target.dataset.id;
    var _this = this;
    wx.request({
      //add接口指定了productId字段值为商品对应ID值
      url: 'http://127.0.0.1:3002/add?userId=weiyide&productId='+this.data.carList[i].id,
      method: 'GET',
      success: function (res) {
        var all = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          all = all + res.data.data[i].num * parseInt(res.data.data[i].new_price);
        }
        _this.setData({//增加商品的数量后需要重写商品信息
          carList: res.data.data,
          total: all//重新记录计算商品总价之后的值
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  minus: function (event) {
    var i = event.target.dataset.id;
    var _this = this;
    if(this.data.carList[i].num>1){
      wx.request({
        url: 'http://127.0.0.1:3002/sub?userId=weiyide&productId=' + this.data.carList[i].id,
        method: 'GET',
        success: function (res) {
          var all = 0;
          for (var i = 0; i < res.data.data.length; i++) {
            all = all + res.data.data[i].num * parseInt(res.data.data[i].new_price);
          }
          _this.setData({
            carList: res.data.data,
            total: all
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }
  },

  delete: function (event) {
    var index = event.target.dataset.id;
    var _this = this;
    wx.showModal({
      title: '删除提示',
      content: '是否要将该商品移出购物车',
      success:function(res){
        if(res.confirm){
          wx.request({
            //delete接口移除指定ID的商品信息，慎重选择！移除后数据文件将不再拥有此商品数据
            url: 'http://127.0.0.1:3002/delete?userId=weiyide&productId=' + _this.data.carList[index].id,
            method: 'GET',
            success: function (res) {
              var all = 0;
              for (var i = 0; i < res.data.data.length; i++) {
                all = all + res.data.data[i].num * parseInt(res.data.data[i].new_price);
              }
              _this.setData({
                carList: res.data.data,
                total: all
              });
            },
            fail: function (res) {
              console.log(res);
            }
          });
        }else{
          console.log("点击取消");
        }
      }
    })
    
  },

  order: function () {
    wx.navigateTo({
      //点击跳转到订单详情页面，传递
      url: '/pages/order/order?count='+this.data.count,
      
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