const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getTimestamp(isotime){
  var time = isotime.replace(/-/g,':').replace(' ',':'); // 注意，第二个replace里，是' '，中间有个空格，千万不能遗漏
  time = time.split(':');
  var timestamp = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]).getTime().toString().substring(0, 10);
  console.log(timestamp);
  return timestamp;
}

function getEndDate(now){
  now = now.setFullYear(now.getFullYear()+1);
  now.setDate(now.getDate()-1);
  console.log(formatTime(now));
  var endDate = formatTime(now)
  return endDate
}

function _getDate(isotime){
  var time = isotime.replace(/-/g,':').replace(' ',':'); // 注意，第二个replace里，是' '，中间有个空格，千万不能遗漏
  time = time.split(':');
  var date = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
  console.log(date);
  return date;
}

function showToast(message) {
  wx.showToast({
    title: message,//提示文字
    duration:2000,//显示时长
    icon:'success', //图标，支持"success"、"loading"   
  })
}

module.exports = {
  _getDate:_getDate,
  getTimestamp:getTimestamp,
  getEndDate:getEndDate,
  formatTime: formatTime,
  showToast:showToast,
}
