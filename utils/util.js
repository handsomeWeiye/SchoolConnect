const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showToast(message) {
  wx.showToast({
    title: message,//提示文字
    duration:2000,//显示时长
    icon:'success', //图标，支持"success"、"loading"  
    success:function(){},//接口调用成功
    fail: function () { },  //接口调用失败的回调函数  
    complete: function () { } //接口调用结束的回调函数  
  })
}

module.exports = {
  formatTime: formatTime,
  showToast:showToast,
}
