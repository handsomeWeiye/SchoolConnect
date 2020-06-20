// pages/pay/pay.js

const routes = require("../../route/routes");
const api = require("../../api/api");
const { updateWhiteList } = require("../../api/api");
const sputil = require("../../utils/sputil");
const util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
  },

  pay:function () {
    switch (this.data.radio) {
      case "1":
        var price ="360";
        var goodsName = "一年360元VIP";
        var remark  = "VIP 一年"
        var phone = sputil.getPhone()
        api.bmobPay({phone:phone,remark:remark,goodsName:goodsName,price:price}).then(res=>{
          console.log(res);
          util.showToast(res)
        }).catch(err=>{
          console.log(
          err);
          util.showToast(err)
        })
        break;
    
      case "2":
        var price ="480";
        var goodsName = "一年480元VIP";
        var remark  = "VIP 一年";
        var phone = sputil.getPhone();
        api.bmobPay({phone:phone,remark:remark,goodsName:goodsName,price:price}).then(res=>{
          console.log(res);
          util.showToast(res)
        }).catch(err=>{
          console.log(
          err);
          util.showToast(err)
        })
        break;
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onChange:function(e){

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

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
})