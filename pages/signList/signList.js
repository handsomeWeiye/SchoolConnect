// pages/signList/signList.js
const api = require("../../api/api");
const sputil = require("../../utils/sputil");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signList:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deviceId = String(options.deviceId);
    console.log(deviceId);
    api.getSignListOne({deviceId:deviceId}).then(res=>{console.log(res);
      this.setData({
        signList:res
      })
    }).catch(
      err=>{
        console.log(err);
        this.setData({
          signList:res
        })
      }
    )
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