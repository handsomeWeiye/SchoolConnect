// pages/home/home.js
var routes = require('../../route/routes.js')
var api = require('../../api/api.js');
const sputil = require('../../utils/sputil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getBannerList().then(res=>{
      console.log(res);
      this.setData({
        imgUrls:res
      })
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

  },

  //跳转到设备选择页面
 toChoiceChild(e) {
    console.log(e)
    var routeStr = String(e.currentTarget.dataset.route);
    routes.toChoiceChild(routeStr);
    // wx.navigateTo({
    //   url: "/pages/choiceChild/choiceChild?route=" + e.currentTarget.dataset.route 
    // })
    },

  //   +'&'+ "price=" + e.currentTarget.dataset.minprice 
  // toChoiceChild(){
  //   routes.toChoiceChild()
  // },
  // toHome(){
  //   routes.toHome()
  // },
  // toWhiteList(){
  //   routes.toWhiteList()
  // },
  // toSignList(){
  //   routes.toSignList()
  // },
  // toLocation(){
  //   routes.toLoaction()
  // },
  toBindDevice(){
    routes.toBindDevice()
  }
})