const routes = require("../../route/routes");
const api = require("../../api/api");
const { updateWhiteList } = require("../../api/api");
const sputil = require("../../utils/sputil");

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:undefined,
    isPay:true,
    endDate:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
await api.getUserInfo({phone:sputil.getPhone()}).then(res=>{
  console.log(res);
  this.setData({
    userInfo:res
  })
}).catch(err=>{
  console.log(err);
})

await api.getIsPay({phone:sputil.getPhone()}).then(res=>{
  console.log(res);
  this.setData({
    isPay:res.isPay,
    endDate:res.endDate
  })
})
  },
  logOut(){
    api.logOut();

  },
  toPay(){
    routes.toPay()
  },

  toBindDevice(){
    routes.toBindDevice()
  },

  toReset(){
    routes.toReset()
  },
  toAbout(){
    routes.toAbout()
  },
  toUnBindDevice(){
    routes.toChoiceChild("toUnBindDevice")
  },
  toInfoManage(e){
    console.log(e)
    var routeStr = String(e.currentTarget.dataset.route);
    routes.toChoiceChild(routeStr);
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