// pages/choiceChild/choiceChild.js
var routes = require('../../route/routes.js')
var api = require('../../api/api.js');
const sputil = require('../../utils/sputil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // routeMap :{
    //   "toWhiteList":this.toWhiteList(),
    //   "toSignList":this.toSignList(),
    //   "toLocation":this.toLocation(),
    //   "toBindDevice":this.toBindDevice(),
    //   "toChoiceChild":this.toChoiceChild(),
    // },
    childList:[],
    routeStr:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //得到传递的路由值
    console.log(options);
    var routeStr = String(options.route);
    console.log(routeStr);
    this.setData({
      routeStr:routeStr
    })

    //得到childList
    api.getChildList({phone:sputil.getPhone()}).then(res=>{
      console.log(res);
      this.setData({
        childList:res
      })
    })
  },
  // //跳转到详情页面
  // toDetail(e) {
  //   console.log(e)
  //   wx.navigateTo({
  //     url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id +'&'+ "price=" + e.currentTarget.dataset.minprice 
  //   })
  // },

  navigatorPage:function(e){
    console.log(e.currentTarget.dataset.deviceid);
    var deviceId = String(e.target.dataset.deviceid);
    console.log(this.data.routeStr);
    
    switch(this.data.routeStr) {
      case "toWhiteList":
         routes.toWhiteList(deviceId);
         break;
      case "toSignList":
        routes.toSignList(deviceId);
         break;
      case "toLocation":
        routes.toLoaction(deviceId);
        break; 
      case "toInfoManage":
          routes.toInfoManage(deviceId);
          break; 
      case "toUnBindDevice":
        wx.showModal({
          title: '解除绑定',
          content: '确定要解除您的孩子与设备的绑定？',
          showCancel: true,//是否显示取消按钮
          cancelText:"取消",//默认是“取消”
          cancelColor:'green',//取消文字的颜色
          confirmText:"确定",//默认是“确定”
          confirmColor: 'red',//确定文字的颜色
          success: function (res) {
             if (res.cancel) {
                //点击取消,默认隐藏弹框
             } else {
                //点击确定
                api.unBindDrive({deviceId:deviceId})
             }
          },
       })  
        break; 
 } 
  },

  // toChoiceChild(){
  //   routes.toChoiceChild()
  // },
  // toHome(){
  //   routes.toHome()
  // },
  // toWhiteList(){
  //   routes.toWhiteList()
  // },
  // toSignList(){
  //   routes.toSignList()
  // },
  // toLocation(){
  //   routes.toLoaction()
  // },
  // toBindDevice(){
  //   routes.toBindDevice()
  // },
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