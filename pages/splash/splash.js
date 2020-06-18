var api = require('../../api/api.js');
var route =require('../../route/routes.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imageUrl = api.getSplashList()
    console.log(imageUrl);
    this.setData({
      imageUrl:res
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goHome:function(){
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(function () {
      route.toHome()
    }, 3500) //
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