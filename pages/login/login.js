// pages/login/login.js
var routes = require('../../route/routes.js')
var api = require('../../api/api.js');
const sputil = require('../../utils/sputil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  login(){
    api.login({phone:this.data.phone,password:this.data.password}).then(res=>{
      console.log(res);
      console.log('登录成功');
      sputil.saveLogin();
      sputil.savePhone({phone:this.data.phone});
      routes.toHome();
    }).catch(
      err=>{
        console.log(err);
        console.log('登录失败');
      }
    )
  },
  toReset(){
    routes.toReset()
  },
  toRegister(){
    routes.toRegister()
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

  onButtonClick:function(){
    if(this.data.isAdd){
      api.saveStudentInfo({name:this.data.name, studentNum:this.data.studentNum, sex:this.data.sex, school:this.data.school, grade:this.data.grade, _class:this.data._class,  phone:sputil.getPhone(), deviceId:this.data.deviceId })
    }else{
      api.updateStudentInfo({name:this.data.name, studentNum:this.data.studentNum, sex:this.data.sex, school:this.data.school, grade:this.data.grade, _class:this.data._class,  phone:sputil.getPhone(), deviceId:this.data.deviceId })
    }
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