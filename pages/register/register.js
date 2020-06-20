const api = require("../../api/api");
const routes = require("../../route/routes");
const sputil = require('../../utils/sputil.js');
const utils = require('../../utils/util.js');

// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:undefined,
    password:undefined,
    password1:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  register:function(){
    api.register({phone:this.data.phone,password:this.data.password,password1:this.data.password1}).then(res=>{
      console.log(res);
      console.log('注册成功');
      utils.showToast('注册成功');
      routes.toLogin();
    }).catch(err=>{
      console.log(err);
      console.log('注册失败');
      utils.showToast('注册失败')
    })
  },
  inputChange:function(e){
    console.log(e);
    var phoneNum = e.detail;
    var name = e.currentTarget.dataset.name;
    console.log(phoneNum);
    console.log(name);
    this.setData({
      [name]:phoneNum
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