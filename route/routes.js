

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

function toSignList() {
    wx.navigateTo({
        url: '/pages/signList/signList'
      })
}

function toWhiteList() {
    wx.navigateTo({
        url: '/pages/whiteList/whiteList'
      })
}



function toLoaction() {
    wx.navigateTo({
        url: '/pages/location/location'
      })
}

// function toSignList() {
//     wx.navigateTo({
//         url: '/pages/signList/signList'
//       })
// }

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
function toBindDevice() {
    wx.navigateTo({
        url: '/pages/bindDevice/bindDevice'
      })
}

function toChoiceChild(){
    wx.navigateTo({
        url: '/pages/choiceChild/choiceChild'
      })
}

module.exports = {
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
    toChoiceChild:toChoiceChild
  } 
