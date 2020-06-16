const { showToast } = require("./util")

function saveLogin(){
    wx.setStorage({
 
        key:"isLogin",
       
        data:true,
       
        success: function() {
       
          console.log('保存登录状态成功')
       
        },
       
        fail: function() {
       
          console.log('保存登录状态失败')
       
        }
       
      })

}

function loginOut(){
    wx.setStorage({
 
        key:"isLogin",
       
        data:false,
       
        success: function() {
       
          console.log('保存登出成功')
       
        },
       
        fail: function() {
       
          console.log('保存登出失败')
       
        }
       
      })

}

function isLogin(){
    var isLogin =  wx.getStorageSync("isLogin");
    console.log(typeof isLogin);
    if(isLogin ==false){
        isLogin = false;
    }
    console.log(isLogin);
    return isLogin;
}


function saveValue(key,value){
    wx.setStorageSync(key,value)
    wx.showToast('已保存key'+key + 'value' +value)
}

module.exports = {
    saveLogin:saveLogin,
    isLogin:isLogin,
    loginOut:loginOut,
    saveValue:saveValue
}

