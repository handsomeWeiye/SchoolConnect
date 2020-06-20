const { unBindDrive } = require("../../api/api");
const api = require("../../api/api");

// pages/bindDevice/bindDevice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd:undefined,
    name:undefined,
    studentNum:undefined,
    sex:undefined,
    school:undefined,
    grade:undefined,
    _class:undefined,
    deviceId:undefined,
    phone:undefined,
    scanRes:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deviceId = String(options.deviceId);
    // var isAdd = Boolean(options.isAdd);
    console.log(deviceId);
    // console.log(isAdd);
    api.getStudentInfo({deviceId:deviceId}).then(res=>{
      this.setData({
        isAdd:false,
        name:res.name,
        studentNum:res.studentNum,
        sex:res.sex,
        school:res.school,
        grade:res.grade,
        _class:res.class,
        deviceId:res.deviceId,
        phone:res.phone,
      })
    }).catch(err=>{
      console.log(err);
      this.setData({
        isAdd:true,
      })   
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
  scanCode:function(){
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;

        _this.setData({
          scanRes: result,
          deviceId:result
        })
      }
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