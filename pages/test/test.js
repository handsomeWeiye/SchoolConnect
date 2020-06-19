// pages/test/test.js
var api = require('../../api/api.js');
var route =require('../../route/routes.js');
const Bmob = require('../../utils/Bmob-2.2.2.min.js');
const dateUtil = require('../../utils/dateUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    api.unBindDrive({deviceId:'360'}).then(
      res=>{
        console.log(res);
      });
      
    // )
    // api.updateUserInfo({phone:'19102688475',avatar:"http://files.weiye.site/cuser/24022/2020/05/23/b06bf2d6-0f85-4c7a-8ccc-f86ca02a183a.jpg",nickName:'weiyehandsome'}).then(
    //   res=>{
    //     console.log(res);
    //   }
      
    // )
    // api.getLocation({}).then(res=>{
    //   console.log(res);
      
    // })

    // api.addSign({deviceId:'fsdafdsfdsfdsfdsfs',phone:'18306832083'})
    // api.addSign({deviceId:'dfsdafasfdsf',phone:'18306832083'})
// api.getSignListOne({deviceId:'dfsdafasfdsf'})
    // api.addWhiteList({phone:'19102688475',phone1:'12345678998',phone2:'12345678998',phone3:'12345678998',phone4:'12345678998',phone5:'12345678998',phone6:'12345678998',phone7:'12345678998',deviceId:'jdljfhdskafjs'})
    // api.getChildList({phone:'19102688475'}).then(
    //   res=>{
    //   console.log(res);
    //   this.setData({
    //     res:res
    //   })
    // },
    // err=>{
    //   console.log(err);
    //   this.setData({
    //     res:err
    //   })
    // }
    // )
    // api.reset({phone:"19102688475",code:"743328",password:"243568686"}).then(res=>{
    //   console.log(res);
    // })
    // api.getObjectId({sheet:api.parent,field:'phone',value:'19102688475'});

    // api.sendSms({phone:'19102688475'});

    // api.verifyCode({phone:'19102688475',code:'743328'})

    // api.uniqueConditionQuery({sheet:api.parent,field:'phone',phone:'18306832083'}).then(
    //   (res)=>{
    //     console.log(res);
    //     this.setData({
    //       res:res
    //     })
    //   }
    // )

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