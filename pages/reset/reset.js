const api = require("../../api/api");
const routes = require("../../route/routes");

// pages/reset/reset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:undefined,
    password:undefined,
    code:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  sendSms:function(){
    api.sendSms({phone:this.data.phone}).then(res=>{
      console.log(res);
      console.log('发送验证码成功');
    }).catch(err=>{
      console.log(err);
      console.log('发送验证码失败');
    })
  },
  reset:function(){
    api.reset({phone:this.data.phone,password:this.data.password,code:this.data.code}).then(res=>{
      console.log(res);
      console.log('修改密码成功');
      routes.toLogin();
    }).catch(err=>{
      console.log(err);
      console.log('修改密码失败');
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