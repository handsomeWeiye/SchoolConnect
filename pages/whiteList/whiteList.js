const api = require("../../api/api");
const sputil = require("../../utils/sputil");

// pages/whiteList/whiteList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd:true,
    phone1:undefined,
    phone2:undefined,
    phone3:undefined,
    phone4:undefined,
    phone5:undefined,
    phone6:undefined,
    phone7:undefined,
    phone:undefined,
    deviceId:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deviceId = String(options.deviceId);
    console.log(deviceId);
    api.getWhiteList({deviceId:deviceId}).then(res=>{
      this.setData({
        isAdd:false,
        phone1:res.phone1,
        phone2:res.phone2,
        phone3:res.phone3,
        phone4:res.phone4,
        phone5:res.phone5,
        phone6:res.phone6,
        phone7:res.phone7,
        phone:res.phone,
        deviceId:res.deviceId,
      })
      
    }).catch(err=>{
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

  onButtonClick:function(){
    if(this.data.isAdd){
      api.addWhiteList({phone1:this.data.phone1, phone2:this.data.phone2, phone3:this.data.phone3, phone4:this.data.phone4, phone5:this.data.phone5, phone6:this.data.phone6, phone7:this.data.phone7, phone:sputil.getPhone(), deviceId:this.data.deviceId })
    }else{
      api.updateWhiteList({phone1:this.data.phone1, phone2:this.data.phone2, phone3:this.data.phone3, phone4:this.data.phone4, phone5:this.data.phone5, phone6:this.data.phone6, phone7:this.data.phone7, phone:sputil.getPhone(), deviceId:this.data.deviceId })
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