const Bmob = require('../utils/Bmob-2.2.2.min.js');
const sputil = require('../utils/sputil.js');
const utils = require('../utils/util.js');
const routes =  require('../route/routes.js');
const { showToast } = require('../utils/util.js');
const dateUtil = require('../utils/dateUtil.js')
Bmob.initialize("18be9117e3873cfe", "410423");

// Bmob.debug(true)

var parent =  Bmob.Query('parent');
var student =  Bmob.Query('student');
var banner =  Bmob.Query('banner');
var whiteList = Bmob.Query('whiteList');
var order = Bmob.Query('order');
var sign = Bmob.Query('sign');
var splash = Bmob.Query('splash');

function getSplashList(){
    return new Promise(function(resolve,reject){
        splash.find().then(res =>{
            console.log(res);
            resolve(res) 
        }).catch(err=>{
            console.log(err);
            console.log('获取引导页失败');
            reject(err)
        });
    });
}



function login({phone,password}){
    return new Promise(function(resolve,reject){
        conditionQuery({sheet:parent,field:'phone',value:phone}).then(res=>{
            console.log(res);
            if(res.length==0){
                console.log('该账号还未注册');
                utils.showToast('该账号还未注册')
                reject(false)
            }
            if(res.length==1){
                console.log('查询到注册记录');
                var password1 = res[0].password;
                //如果密码相符
                if(password == password1){
                    console.log('登录成功');
                    utils.showToast('登录成功')
                    resolve(true)
                //如果密码不相符
                }else{
                    utils.showToast('密码错误')
                    console.log('密码错误');
                    reject(false)
                }
            }
        }).catch(err=>{
            console.log(err);
            
        });
    });
 
}

function logOut(){
    sputil.loginOut()
}

function register({phone,password,password1}) {

    return new Promise(function(resolve,reject){
        if(password != password1){
            utils.showToast('密码不一致');
            reject('密码不一致');
        }else{
            parent.set('phone',phone)
            parent.set('password',password);
            parent.save().then(res=>{
                console.log(res);
                utils.showToast('注册成功');
                resolve('注册成功')
            }).catch(err => {
                console.log(err);
                utils.showToast('注册失败');
                reject('注册失败');
              });
        }

    });


}

function sendSms({phone}){
    return new Promise(function(resolve,reject){  
        var data = {
            mobilePhoneNumber:phone
        }
        Bmob.requestSmsCode(data).then(res=>{
                utils.showToast('短信发送成功')

                resolve(res) 
    
        }).catch(err=>{
            utils.showToast('短信发送失败');
            console.log(err);
            reject(err)
        })
      });
 
}

function verifyCode({phone,code}){
    return new Promise(function(resolve,reject){  
    let data = {
        mobilePhoneNumber: phone
    }
    Bmob.verifySmsCode(code,data).then(res=>{
        console.log(res);
        utils.showToast('验证码正确')
        resolve (true)
        }
    ).catch(err=>{
        console.log(err);
        utils.showToast("验证码错误");
        reject (false)
    });
            });
}

function verifyPhone({phone}){
    return new Promise(function(resolve,reject){   
        uniqueConditionQuery({sheet:parent,field:'phone',value:phone}).then((res)=>{
        console.log('该号码存在');
        resolve (true);
    }).catch((err)=>{
        utils.showToast('该号码不存在，请注册')
        routes.toRegister()
        reject (false);
    })    });
   

}

function getObjectId({sheet,field,value}){
    console.log(value);
    
    return new Promise(function(resolve,reject){
        uniqueConditionQuery({sheet:sheet,field:field,value:value}).then(res=>{
            console.log('查询成功');
            console.log( res.objectId);
            resolve ( res.objectId);
        }).catch(err=>{
            console.log('查询没有结果');
            reject(undefined) ;
        })
});
}

function conditionQuery({sheet,field,value}){
    return new Promise(function(resolve,reject){
        sheet.equalTo(field,"==",value)
        sheet.find().then(res=>{
            // console.log(res);
            resolve(res);
        }).catch(err=>{
            utils.showToast(err)
            // console.log(err);
            reject(err);
        })
    })
}

function uniqueConditionQuery({sheet,field,value}){
    return new Promise(function(resolve,reject){
        sheet.equalTo(field,"==",value)
        sheet.find().then(res=>{
            console.log(res);
            if(res.length==1){
                console.log(res[0]);
                resolve(res[0]);
            }else{
                console.log('查询不到记录');
                reject('查询不到记录');
            }

        }).catch(err=>{
            utils.showToast(err)
            console.log(err);
            reject(err);
        })
    })
}

function reset({phone,code,password}){
    return new Promise(function(resolve,reject){
    verifyPhone({phone:phone}).then(isExsit=>{
        if(isExsit){
            verifyCode({phone:phone,code:code}).then(isTrue=>{
                if(isTrue){
                    getObjectId({sheet:parent,field:"phone",value:phone}).then(res=>{
                        parent.get(res).then(respon=>{
                            console.log(res);
                            respon.set('password',password)
                            respon.save()
                            console.log(res);
                            resolve('重设密码成功');
                        })
                    }).catch(err=>{
                        utils.showToast('没有查询到对象');
                        reject('没有查询到对象') ;
                    })
                }else{
                    utils.showToast('验证码出现错误');
                    reject('验证码出现错误');
                }
            })
        }else{
            showToast('该手机号还没有被注册')
            reject('该手机号还没有被注册');
        }
    })
})

}

function getBannerList(){
    return new Promise(function(resolve,reject){
    banner.find().then(res=>{
        if(res.length==0){
            console.log('banner无数据');
            reject('banner无数据')
        }else{
            console.log(res);
            resolve (res);
        }
    }).catch(err=>{
        console.log('查询banner出错');
        console.log(err);
        reject('查询banner出错')
    })
})
}

function getChildList({phone}){
    return new Promise(function(resolve,reject){
    conditionQuery({sheet: student,field:'phone',value:phone}).then(res=>{
        console.log(res);
        if(res.length==0){
            utils.showToast('您还没有绑定设备')
            reject('您还没有绑定设备')
        }else{
           console.log('获取成功');
            console.log(res);
            resolve (res);
        }
    })
    

})
}

function addWhiteList({phone1,phone2,phone3,phone4,phone5,phone6,phone7,phone,deviceId}){
    return new Promise(function(resolve,reject){
    whiteList.set('phone',phone);
    whiteList.set('phone1',phone1);
    whiteList.set('phone2',phone2);
    whiteList.set('phone3',phone3);
    whiteList.set('phone4',phone4);
    whiteList.set('phone5',phone5);
    whiteList.set('phone6',phone6);
    whiteList.set('phone7',phone7);
    whiteList.set('deviceId',deviceId);
    whiteList.save().then(res=>{console.log('白名单添加成功');
    resolve('白名单添加成功')
}
    ).catch(err=>{
        console.log(err);
        reject('白名单添加失败,设备编号重复')
        console.log('白名单添加失败');
    })
    
})
}

function getWhiteList({deviceId}){
    return new Promise(function(resolve,reject){
     uniqueConditionQuery({sheet:whiteList,field:'deviceId',value:deviceId}).then(
         res=>{
            resolve(res)
         }
     ).catch(err=>{
         reject(err)
     })
    
})
}

function removeWhiteList({deviceId}){
    return new Promise(function(resolve,reject){
    getObjectId({sheet:whiteList,field:'deviceId',value:deviceId}).then(
        objectId=>{
   whiteList.destroy(objectId).then(res=>{
        console.log(res);
        console.log('删除白名单成功');
        resolve('删除白名单成功')
    }).catch(err=>{
        console.log(err);
        console.log('删除白名单发生错误');
        reject('删除白名单发生错误')
    })
        }
    )
 
})
}

function addSign({deviceId,phone}){
    return new Promise(function(resolve,reject){
    sign.set('deviceId',deviceId);
    sign.set('phone',phone)
    sign.save().then(res=>{console.log(res);
        resolve(res)
    }).catch(err=>{
        console.log(err);
        reject(err)
    })
})
}
function getSignListOne({deviceId}){
    return new Promise(function(resolve,reject){
    conditionQuery({sheet:sign,field:"deviceId",value:deviceId}).then(signList=>{
        console.log(signList);
        resolve (signList);
    }).catch(err=>{
        reject(err);
    })
})
    
    
}
function getSignListAll({phone}){

    return new Promise(function(resolve,reject){
        conditionQuery({sheet:sign,field:"phone",value:phone}).then(signList=>{
            console.log(signList);
            resolve (signList);
        }).catch(err=>{
            reject(err);
        })
    })
    
}

function getLocation({deviceId}){
    return new Promise(function(resolve,reject){
        resolve({'jingdu':'116.37',"weidu":'29.9'} ) 
})
}

function updateWhiteList({phone1,phone2,phone3,phone4,phone5,phone6,phone7,phone,deviceId}) {
    return new Promise(function(resolve,reject){
        getObjectId({sheet:whiteList,field:'deviceId',value:deviceId}).then(
            objectId=>{
                whiteList.get(objectId).then(
                    data=>{
                        data.set('phone',phone);
                        data.set('phone1',phone1);
                        data.set('phone2',phone2);
                        data.set('phone3',phone3);
                        data.set('phone4',phone4);
                        data.set('phone5',phone5);
                        data.set('phone6',phone6);
                        data.set('phone7',phone7);
                        data.set('deviceId',deviceId);
                        data.save().then(res=>{
                            console.log(res);
                            resolve('保存电话白名单纪录成功')
                        }
                        )
                    }
                )

            }
        ).catch(err=>{
            console.log('查询电话白名单纪录失败');
            reject(err)
        })

})
}

function updateUserInfo({avatar,nickName,phone}){
    return new Promise(function(resolve,reject){
    getObjectId({sheet:parent,field:'phone',value:phone}).then(
        objectId=>{
            parent.get(objectId).then(
                res=>{
                    res.set("avatar",avatar);
                    res.set("nickName",nickName);
                    res.save().then(res=>{
                        console.log(res);
                        utils.showToast('更新用户信息成功');
                        resolve(res)
                    }).catch(
                        err=>{
                            console.log('err');
                            utils.showToast('更新用户信息失败');
                            reject(err)                           
                        }
                    )

                }
            )
        }
    ).catch(err=>{
        console.log('查询用户信息失败');
        reject(err)
    })

})
}


//根据家长表中保存的endDate来判断是否为会员状态
function getIsPay({phone}){
    return new Promise(function(resolve,reject){
     uniqueConditionQuery({sheet:parent,field:'phone',value:phone}).then(
        res=>{
            //获取VIP到期时间
            var endDate = res.endDate.iso;
            console.log(res.endDate.iso);
            //将VIP到期时间转化为时间戳
            var endTimestamp = utils.getTimestamp(endDate);
            console.log(endTimestamp);
            //获取当前时间戳
            Bmob.timestamp().then(res => {
                console.log(res);           
                var nowTimestamp = res.timestamp;
                //如果会员结束时间戳大于目前的时间戳，那么会员有效
                if(endTimestamp-nowTimestamp>0){
                    resolve({"isPay":true,"endDate":endDate})
                }else{
                    resolve({"isPay":false,})
                }
              })
        }
     ).catch(
        err=>{
            utils.showToast('获取会员信息失败');
            console.log('获取会员信息失败');
            reject('获取会员信息失败')
        }
     )
    })
}

//保存一个endDate到家长表
function saveIsPay({phone}){
    return new Promise(function(resolve,reject){
        getObjectId({sheet:parent,field:'phone',value:phone}).then(
            objectId=>{
                console.log(123);
                parent.get(objectId).then(
                    res=>{
                        console.log(123);
                        var nowDate = dateUtil.formatDateThis(new Date());
                        //制作endDate(Vip到期时间)
                        var endDate =  dateUtil.mathChangeDate(nowDate,"+",365)
                        console.log(nowDate);
                        //保存endDate
                        console.log(endDate);
                        var date = {
                            "__type": "Date",
                            "iso": endDate
                        }
                        res.set('endDate',date);
                        res.save().then(
                            repons=>{
                                console.log(repons);
                                console.log('充值会员成功');
                                utils.showToast('充值会员成功');
                                resolve('充值会员成功');
                            }
                        ).catch(err=>{
                            console.log(err);
                            console.log('充值会员失败');
                            utils.showToast('充值会员失败');
                            reject('充值会员失败');
                        })       
        
                 })
           }
        ).catch(
           err=>{
               utils.showToast('获取信息失败');
               console.log('获取信息失败');
               reject('获取信息失败')
           }
        )
       })
}

//保存订单信息到订单表
function saveOrder({price,goodsName,remark,orderId,openId,phone}){
    return new Promise(function(resolve,reject){
    order.set('orderId',orderId)
    order.set('goodsName',goodsName)
    order.set('price',price)
    order.set('remark',remark)
    order.set('openId',openId)
    order.set('phone',phone)
    order.save().then(res=>{
        console.log(res);
        utils.showToast('创建订单成功')
        resolve('创建订单成功')
    }).catch(err=>{
        console.log(err);
        utils.showToast('创建订单失败')
        reject('创建订单失败')
    })
})
}

function bmobPay({price,goodsName,remark,phone}){
    return new Promise(function(resolve,reject){
    // var openId = wx.getStorageSync('openid');
    var openId = 'jfljfklsdjflsdafjlf'
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
          saveOrder({price:price,goodsName:goodsName,remark:remark,orderId:orderId,openId:openId,phone:phone});
          saveIsPay({phone:phone})
          console.log('付款成功');
          utils.showToast('付款成功');
          resolve('付款成功')
        },
        'fail': function (res) {
          //付款失败
          console.log('付款失败');
          console.log(res);
          reject('付款失败');
        }
      })

    }, function (err) {
      console.log('服务端返回失败');
      console.log(err);
      reject('付款失败');
    });

})
}

function saveStudentInfo({name='',studentNum='',sex='',school='',grade='',_class='',phone,deviceId}){
    return new Promise(function(resolve,reject){
    student.set("name",name);
    student.set("studentNum",studentNum);
    student.set("sex",sex);
    student.set("school",school);
    student.set("grade",grade);
    student.set("class",_class);
    student.set("phone",phone);
    student.set("deviceId",deviceId);
    student.save().then(res=>{console.log('保存学生信息成功');
    resolve('保存学生信息成功')
    }).catch(err=>{console.log('保存学生信息失败');
    reject('保存学生信息成功')
    })
})
}

function getStudentInfo({deviceId}){
    return new Promise(function(resolve,reject){
        uniqueConditionQuery({sheet: student,field:'deviceId',value:deviceId}).then(res=>{
            console.log(res);
            if(res.length==0){
                utils.showToast('您还没有绑定设备')
                reject('您还没有绑定设备')
            }else{
               console.log('获取成功');
                console.log(res);
                resolve (res);
            }
        })
        
    })
}


function updateStudentInfo({name='',studentNum='',sex='',school='',grade='',_class='',phone,deviceId}){
    return new Promise(function(resolve,reject){
    getObjectId({sheet:student,field:'deviceId',value:deviceId}).then(
        objectId=>{
            student.get(objectId).then(res=>{
                res.set("name",name);
                res.set("studentNum",studentNum);
                res.set("sex",sex);
                res.set("school",school);
                res.set("grade",grade);
                res.set("class",_class);
                res.set("phone",phone);
                res.set("deviceId",deviceId);
                res.save().then(res=>{console.log('保存学生信息成功');
                utils.showToast('更新学生信息成功，更新成功')
                resolve('保存学生信息成功')
            }).catch(err=>{
                utils.showToast('更新学生信息错误，更新失败')
                reject('更新学生信息错误，更新失败')
            })
            })
        }
    )
})
}

function unBindDrive({deviceId}){
    return new Promise(function(resolve,reject){
        getObjectId({sheet:student,field:'deviceId',value:deviceId}).then(
            objectId=>{
                student.get(objectId).then(res=>{
                    res.set("deviceId",objectId);
                    res.save().then(res=>{console.log('解绑成功');
                    utils.showToast('解绑成功')
                    resolve('解绑成功')
                }).catch(err=>{
                    utils.showToast('解绑失败')
                    reject('解绑失败')
                })
                })
            }
        )
    })

}

module.exports = {
    parent:parent,

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
    getSignListOne:getSignListOne,
    getSignListAll:getSignListAll,

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