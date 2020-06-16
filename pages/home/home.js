// pages/home/home.js
var routes = require('../../route/routes.js')
var api = require('../../api/api.js');
const sputil = require('../../utils/sputil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "http://files.weiye.site/2020/05/23/1e8308d9-10ba-4453-b9f5-0d298826c8f8.jpg",
      "http://files.weiye.site/2020/05/23/b20f8602-a7e1-4937-842e-ebc204dca28a.jpg",
      "http://files.weiye.site/2020/05/23/1654205f-a9fb-4d18-ab46-424cbbe5785f.jpg"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.login('18306832083','24351587uytr');
    sputil.loginOut();
    sputil.isLogin()
    
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

  toHome(){
    routes.toHome()
  },
  toWhiteList(){
    routes.toWhiteList()
  },
  toSignList(){
    routes.toSignList()
  },
  toLocation(){
    routes.toLoaction()
  },
  toBindDevice(){
    routes.toBindDevice()
  }
})