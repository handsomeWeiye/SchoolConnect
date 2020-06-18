const Bmob = require('../utils/Bmob-2.2.2.min.js');
const sputil = require('../utils/sputil.js');
const utils = require('../utils/util.js');
const routes =  require('../route/routes.js');
const { showToast } = require('../utils/util.js');
Bmob.initialize("18be9117e3873cfe", "410423");

Bmob.debug(true)

var parent =  Bmob.Query('parent');
var student =  Bmob.Query('student');
var banner =  Bmob.Query('banner');
var whiteList = Bmob.Query('whiteList');
var order = Bmob.Query('order');
var sign = Bmob.Query('sign');
var splash = Bmob.Query('splash');

function getSplashList(){
    splash.find().then(res =>{
        console.log(res);
        return res;
        
    }).catch(err=>{
        console.log(err);
        console.log('获取引导页失败');
    })
}

function login(phone,password){
    parent.equalTo("phone", "==", phone);
    parent.find().then(res=>{
        console.log(res);
        if(res.length==0){
            console.log('该账号还未注册');
        }
        if(res.length==1){
            console.log('查询到注册记录');
            var password1 = res[0].password;
            //如果密码相符
            if(password == password1){
                utils.showToast('登录成功')
                console.log('登录成功');
            //如果密码不相符
            }else{
                utils.showToast('密码错误')
                console.log('密码错误');
            }
        }
    })
}

function logOut(){
    sputil.loginOut()
}

function register(phone,password,password1) {
    if(password != password1){
        utils.showToast('密码不正确');
        return null;
    }else{
        parent.set('phone',phone);
        parent.set('password',password);
        parent.save().then(res=>{
            console.log(res);
            if(res.code == 0){
                utils.showToast('注册成功');
            }else{
                utils.showToast('注册失败');
            };
        }).catch(err => {
            console.log(err);
            utils.showToast('注册失败');
          });
    }

}

function sendSms(phone){
    var data = {
        mobilePhoneNumber:phone
    }
    Bmob.requestSmsCode(data).then(res=>{
        if(res.code == 0){
            utils.showToast('短信发送成功')
            sputil.saveValue('code',res.data)
            return res
        }else{
            utils.showToast('短信发送失败');
        }
    }).catch(err=>{
        utils.showToast('短信发送失败');
        console.log(err);
        
    })
}

function verifyCode(phone,code){
    let data = {
        mobilePhoneNumber: phone
    }
    Bmob.verifySmsCode(code,data).then(res=>{
        if(res.code ==0){
            utils.showToast('验证码正确')
            return true
        }else{
           utils.showToast('验证码错误')
           return false
        }
    }).catch(err=>{
        console.log(err);
        utils.showToast("验证出现错误");
        return false
    })
}

function verifyPhone(phone){
    parent.equalTo("phone","==",phone)
    parent.find().then(res=>{
        if(res.length == 0){
            utils.showToast('该号码还没有被注册，请注册')
            routes.toReset()
            return false;
        }else{
            console.log('验证成功');
            return true;
        }
    })
}

function getObjectId(sheet,field,value){
    sheet.equalTo(field,"==",value)
    parent.find().then(res=>{
        if(res.length == 0){
            console.log('查询没有结果');
            return null;
        }else{
            console.log('查询成功');
            var objectId = res[0].objectId;
            console.log(objectId);
            return objectId;
        }
    })
}

function conditionQuery(sheet,field,value){
    sheet.equalTo(field,"==",value)
    parent.find().then(res=>{
        return res;
    }).catch(err=>{
        utils.showToast(err)
        console.log(err);
        return [];
    })
}

function uniqueConditionQuery(sheet,field,value){
    sheet.equalTo(field,"==",value)
    parent.find().then(res=>{
        return res[0];
    }).catch(err=>{
        utils.showToast(err)
        console.log(err);
    })
}

function reset(phone,code,password){
    if(verifyPhone(phone)){
        if(verifyCode(phone,code)){
           var objectId =  getObjectId(parent,"phone",phone)
           if(objectId!=null){
                parent.get(objectId).then(res=>{
                    console.log(res);
                    res.set('password',password)
                    res.save()
                    console.log(res);
                }).catch(err=>{console.log(err)
                });           }else{
                    console.log('没有查询到对象');
                    
           }
        }else{
            utils.showToast('验证码出现错误');
            return null;
        }
    }else{
        showToast('该手机号还没有被注册')
        return null;
    }


}

function getBannerList(){
    banner.find().then(res=>{
        if(res.length){
            console.log('banner无数据');
        }else{
            console.log(res);
            return res;
        }
    }).catch(err=>{
        console.log('查询banner出错');
        console.log(err);
        
    })
}

function getChildList(phone){
    var childList = conditionQuery(student,'phone',phone)
    console.log(childList);
    if(childList.length==0){
        utils.showToast('您还没有绑定设备')
    }else{
        console.log(childList);
        return childList;
    }
}

function addWhiteList({phone1,phone2,phone3,phone4,phone5,phone6,phone7,phone,deviceId}){
    whiteList.set('phone',phone);
    whiteList.set('phone1',phone1);
    whiteList.set('phone2',phone2);
    whiteList.set('phone3',phone3);
    whiteList.set('phone4',phone4);
    whiteList.set('phone5',phone5);
    whiteList.set('phone6',phone6);
    whiteList.set('phone7',phone7);
    whiteList.set('deviceId',deviceId);
    whiteList.save().then(res=>{console.log('白名单添加成功');}
    ).catch(err=>{
        console.log(err);
        console.log('白名单添加成功');
    })
}

function getWhiteList(deviceId){
    var data = uniqueConditionQuery(whiteList,'devicedId',deviceId);
    return data;
}

function removeWhiteList(deviceId){
    var objectId = getObjectId(whiteList,'devicedId',deviceId);
    whiteList.destory(objectId).then(res=>{
        console.log(res);
        console.log('删除白名单成功');
    }).catch(err=>{
        console.log(err);
        console.log('删除白名单发生错误');
    })
}

function addSign(deviceId,phone){
    sign.set('deviceId',deviceId);
    sign.set('phone',phone)
    sign.save().then(res=>{console.log(res);
    })
}
function getSignList({deviceId,phone}){

    var signList = conditionQuery(sign,"phone",phone);
    console.log(signList);
    return signList;
    
}

function getLocation(deviceId){
    return {'jingdu':'116.37',"weidu":'29.9'} 
}

function updateWhiteList({phone1,phone2,phone3,phone4,phone5,phone6,phone7,phone,deviceId}) {
    var data = uniqueConditionQuery(whiteList,'devicedId',deviceId)
    if(data!= undefined){
        data.set('phone',phone);
        data.set('phone1',phone1);
        data.set('phone2',phone2);
        data.set('phone3',phone3);
        data.set('phone4',phone4);
        data.set('phone5',phone5);
        data.set('phone6',phone6);
        data.set('phone7',phone7);
        data.set('deviceId',deviceId);
        data.save().then(res=>{console.log('保存电话白名单纪录成功');}
        )
    }else{
        console.log('查询电话白名单纪录失败');
        
    }
}

function updateUserInfo(avatar,nickName,phone){
    //测试条件查询，是否可以直接修改
    var dataList = conditionQuery(parent,'phone',phone);
    if (dataList.length != 0){
        var data = dataList[0];
        data.set("avatar",avatar);
        data.set("nickName",nickName);
        data.save()
        console.log('更新用户信息成功');
        utils.showToast('更新用户信息成功');
    }
}

//根据家长表中保存的endDate来判断是否为会员状态
function getIsPay(phone){
    var dataList = conditionQuery(parent,'phone',phone);
    if (dataList.length != 0){
        utils.showToast('获取会员信息成功');
        console.log('获取会员信息成功');
        var data = dataList[0];
        //得到会员结束的时间
        var endDate = data.endDate;
        //得到当前的时间
        var now = utils.formatTime(endDate);
        var diff = different('endDate',now)
        if(diff>0){
            return {"isPay":true,"endDate":endDate}
        }else{
            return {"isPay":false,}
        }
    }else{
        utils.showToast('获取会员信息失败');
        console.log('获取会员信息失败');
    }
}

//保存一个endDate到家长表
function saveIsPay(phone){
    var dataList = conditionQuery(parent,'phone',phone);
    if(dataList.length !=0){
        var endDate = dataList[0].endDate;
        if(endDate !=null){
            endDate = endDate + 1;
            dataList[0].set('endDate',endDate)
            dataList[0].save()
        }else{
            endDate = now + 1;
            dataList[0].set('endDate',endDate)
            dataList[0].save()
        }
    }else{
        utils.showToast('查询失败')
    }
}

//保存订单信息到订单表
function saveOrder(price,goodsName,remark,orderId,openId,phone){

    order.set('orderId',orderId)
    order.set('goodsName',goodsName)
    order.set('price',price)
    order.set('remark',remark)
    order.set('openId',openId)
    order.set('phone',phone)
    order.save().then(res=>{
        console.log(res);
        if(res.code == 0){
            utils.showToast('创建订单成功')
        }else{
            utils.showToast('创建订单失败')
        }
        
    }).catch(err=>{
        console.log(err);
    })
}

function bmobPay(price,goodsName,remark,phone){
    var openId = wx.getStorageSync('openid');
//传参数金额，名称，描述,openid
    Bmob.Pay.weApp(price, goodsName, remark, openId).then(function (resp) {
      console.log(resp);

    //   that.setData({
    //     loading: true,
    //     dataInfo: resp
    //   })

      //服务端返回成功
      var timeStamp = resp.timestamp,
        nonceStr = resp.noncestr,
        packages = resp.package,
        orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
        sign = resp.sign;

      //打印订单号
      console.log(orderId);

      //发起支付
      wx.requestPayment({
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': packages,
        'signType': 'MD5',
        'paySign': sign,
        'success': function (res) {
          //付款成功,这里可以写你的业务代码
          console.log(res);
          saveOrder(price,goodsName,remark,orderId,openId,phone);
          saveIsPay(phone)
        },
        'fail': function (res) {
          //付款失败
          console.log('付款失败');
          console.log(res);
        }
      })

    }, function (err) {
      console.log('服务端返回失败');
      console.log(err);
    });
}

function saveStudentInfo(name,studentNum,sex,school,grade,_class,phone,deviceId){
    student.set("name",name);
    student.set("studentNum",studentNum);
    student.set("sex",sex);
    student.set("school",school);
    student.set("grade",grade);
    student.set("class",_class);
    student.set("phone",phone);
    student.set("deviceId",deviceId);
    student.save().then(res=>{console.log('保存学生信息成功');
    }).catch(err=>{console.log('保存学生信息失败');
    })
}

function getStudentInfo(phone){
    var dataList = conditionQuery(student,"phone",phone)
    if(dataList.length >0){
        console.log(dataList);
        console.log('获取学生信息成功');
    }else{
        console.log('没有绑定学生信息，或者查询失败');
    }
}


function updateStudentInfo({studentId,name,studentNum,sex,school,grade,_class,phone,deviceId}){
    // var dataList = getObjectId(student,"objectId",studentId)
    student.get(studentId).then(res=>{
        if(res.length ==0){
            utils.showToast('更新学生信息错误，更新失败')
        }else{
            if(name!=undefined){
                res.set("name",name);
            }
            if(studentNum!=undefined){
                res.set("name",name);
            }
            if(sex!=undefined){
                res.set("name",name);
            }
            if(school!=undefined){
                res.set("name",name);
            }
            if(grade!=undefined){
                res.set("name",name);
            }
            if(_class!=undefined){
                res.set("class",_class);
            }
            if(phone!=undefined){
                res.set("phone",phone);
            }
            if(deviceId!=undefined){
                res.set("deviceId",deviceId);
            }
            res.save().then(respon=>{
                console.log('信息更新成功');
                
            }).catch(err=>{
                console.log('信息更新失败');
                
            })
        }
    })
}

function unBindDrive(studentId,deviceId){
    updateStudentInfo({deviceId:deviceId,studentId:studentId});
    console.log('设备解绑成功');
}

module.exports = {
    conditionQuery:conditionQuery,
    uniqueConditionQuery:uniqueConditionQuery,
    getObjectId:getObjectId,


    login:login,
    logOut:logOut,
    register:register,
    verifyPhone:verifyPhone,
    verifyCode:verifyCode,
    sendSms:sendSms,
    reset:reset,
    updateUserInfo:updateUserInfo,


    getChildList:getChildList,
    getBannerList:getBannerList,
    getSplashList:getSplashList,

    addWhiteList:addWhiteList,
    updateWhiteList:updateWhiteList,
    getWhiteList:getWhiteList,
    removeWhiteList:removeWhiteList,

    addSign:addSign,
    getSignList:getSignList,

    getLocation:getLocation,

    getIsPay:getIsPay,
    saveIsPay:saveIsPay,
    saveOrder:saveOrder,
    bmobPay:bmobPay,

    saveStudentInfo:saveStudentInfo,
    getStudentInfo:getStudentInfo,
    updateStudentInfo:updateStudentInfo,
    unBindDrive:unBindDrive,
}