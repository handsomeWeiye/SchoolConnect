

function toLogin() {
    wx.navigateTo({
        url: '/pages/login/login'
      })
}

function toReset() {
    wx.navigateTo({
        url: '/pages/reset/reset'
      })
}

function toAbout() {
  wx.navigateTo({
      url: '/pages/about/about'
    })
}

function toRegister() {
    wx.navigateTo({
        url: '/pages/register/register'
      })
}

function toSplash() {
    wx.navigateTo({
        url: '/pages/splash/splash'
      })
}

function toHome() {
    wx.switchTab({
        url: '/pages/home/home'
      })
}

function toSignList(deviceId) {
  wx.navigateTo({
    url: '/pages/signList/signList?deviceId=' + deviceId
    })
}

function toWhiteList(deviceId) {
    wx.navigateTo({
        url: '/pages/whiteList/whiteList?deviceId=' + deviceId
      })
}



function toLoaction(deviceId) {
    wx.navigateTo({
        url: '/pages/location/location?deviceId=' + deviceId
      })
}



function toMine() {
    wx.switchTab({
        url: '/pages/mine/mine'
      })
}
function toMessage() {
    wx.switchTab({
        url: '/pages/message/message'
      })
}
function toInfoManage(deviceId) {
    wx.navigateTo({
        url: '/pages/bindDevice/bindDevice?deviceId=' + deviceId
      })
}

function toBindDevice() {
  wx.navigateTo({
      url: '/pages/bindDevice/bindDevice'
    })
}

function toUnBindDevice() {
  wx.navigateTo({
      url: '/pages/bindDevice/bindDevice'
    })
}

function toPay() {
  wx.navigateTo({
      url: '/pages/pay/pay'
    })
}

function toChoiceChild(routeStr){
    wx.navigateTo({
        url: '/pages/choiceChild/choiceChild?route=' + routeStr
      })
}

module.exports = {
    toPay:toPay,
    toLogin: toLogin,
    toReset: toReset,
    toRegister:toRegister,
    toSplash:toSplash,
    toHome: toHome,
    toWhiteList: toWhiteList,
    toLoaction: toLoaction,
    toSignList: toSignList,
    toMine: toMine,
    toMessage: toMessage,
    toBindDevice:toBindDevice,
    toChoiceChild:toChoiceChild,
    toInfoManage:toInfoManage,
    toAbout:toAbout,
  } 
