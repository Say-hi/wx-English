// const wechat = require('./utils/wechat')
// const Promise = require('./utils/bluebird')
/*eslint-disable*/
const useUrl = require('./utils/service')
// const Moment = require('./utils/moment')
// Moment.locale('en', {
//   relativeTime : {
//     future: "差 %s",
//     past:   "%s前",
//     s:  "几秒",
//     m:  "一分钟",
//     mm: "%d分钟",
//     h:  "一小时",
//     hh: "%d小时",
//     d:  "一天",
//     dd: "%d天",
//     M:  "一个月",
//     MM: "%d月",
//     y:  "一年",
//     yy: "%d年"
//   }
// });
// moment.locale('zh-cn')
App({
  data: {
    name: '英语小程序'
  },
  // 解析时间
  // moment (time) {
  //   return Moment(time, 'YYYYMMDD HH:mm:ss').fromNow()
  // },
  // 发起微信支付
  wxpay (obj) {
    let objs = {
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType || 'MD5',
      paySign: obj.paySign,
      success: obj.success || function (res) {
        console.log('未传入success回调函数', res)
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:', err.errMsg)
      },
      complete: obj.complete || function () {}
    }
    wx.requestPayment(objs)
  },
  // 上传媒体文件
  wxUpload (obj) {
    let s = {
      url: obj.url,
      filePath: obj.filePath,
      name: obj.name || 'file',
      header: {
        'content-type' : 'multipart/form-data'
      },
      formData: obj.formData,
      success: obj.success || function (res) {
        console.log('未传入成功回调函数', res)
      },
      fail: obj.fail || function (res) {
        console.log('为传入失败回调函数', res)
      },
      complete: obj.complete || function () {}
    }
    wx.uploadFile(s)
  },
  // 请求数据
  wxrequest (obj) {
    wx.showLoading({
      title: '请求数据中...'
      // mask: true
    })
    wx.request({
      url: obj.url || useUrl.serviceUrl.login,
      method: obj.method || 'POST',
      data: obj.data || {},
      header: {
        'content-type': obj.header || 'application/x-www-form-urlencoded'
      },
      success: obj.success || function () {
        console.log('未传入success回调函数')
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:' + err.errMsg)
      },
      complete: obj.complete || function () {}
    })
  },
  // 用户登陆
  wxlogin (loginSuccess, params) {
    let that = this
    if (wx.getStorageSync('session_key')) {
      let checkObj = {
        url: useUrl.userCenter,
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        success (res) {
          // session失效
          if (res.data.code === 400 && (res.data.message === 'session_key 已过期，请再次登陆！' || res.data.message === 'session_key 失效！')) {
            console.log('session_key失效')
            // 无条件获取登陆code
            wx.login({
              success (res) {
                // console.log(res)
                let code = res.code
                // 获取用户信息
                let obj = {
                  success (data) {
                    wx.setStorageSync('userInfo', data.userInfo)
                    let iv = data.iv
                    let encryptedData = data.encryptedData
                    // 获取session_key
                    let objs = {
                      url: useUrl.login,
                      data: {
                        recommend_id: params.id || 0,
                        code: code,
                        iv: iv,
                        encryptedData: encryptedData
                      },
                      success (res) {
                        // let session_key = 'akljgaajgoehageajnafe'
                        // console.log(res)
                        wx.setStorageSync('session_key', res.data.data.session_key)
                        // console.log(session)
                        if (loginSuccess) {
                          loginSuccess(params)
                        }
                      }
                    }
                    that.wxrequest(objs)
                  },
                  fail (res) {
                    console.log(res)
                    wx.showToast({
                      title: '您未授权小程序,请授权登陆'
                    })
                  }
                }
                that.getUserInfo(obj)
              },
              fail (err) {
                console.log('loginError' + err)
              }
            })
          } else {
            console.log('session_key有效')
            if (loginSuccess) {
              loginSuccess(params)
            }
          }
        }
      }
      that.wxrequest(checkObj)
    } else {
      // 无条件获取登陆code
      wx.login({
        success (res) {
          // console.log(res)
          let code = res.code
          // 获取用户信息
          let obj = {
            success (data) {
              wx.setStorageSync('userInfo', data.userInfo)
              let iv = data.iv
              let encryptedData = data.encryptedData
              // 获取session_key
              let objs = {
                url: useUrl.login,
                data: {
                  recommend_id: params.id || 0,
                  code,
                  iv,
                  encryptedData
                },
                success (session) {
                  // let s = 'DUGufWMOkMIolSIXLajTvCEvXAYQZwSpnafUVlSagdNEReVSRDAECzwEVAtFbPWg'
                  wx.setStorageSync('session_key', session.data.data.session_key)
                  // wx.setStorageSync('session_key', s)
                  if (loginSuccess) {
                    loginSuccess(params)
                  }
                }
              }
              that.wxrequest(objs)
            },
            fail () {
              wx.showToast({
                title: '您未授权小程序,请授权登陆'
              })
            }
          }
          that.getUserInfo(obj)
        },
        fail (err) {
          console.log('loginError' + err)
        }
      })
    }
  },
  // 获取缓存session_key
  gs () {
    return wx.getStorageSync('session_key')
  },
  // 设置页面是否加载
  setMore (params, that) {
    if (params.length === 0) {
      that.setData({
        more: false
      })
    } else {
      that.setData({
        more: true
      })
    }
  },
  // 获取用户信息
  getUserInfo (obj) {
    wx.getUserInfo({
      withCredentials: obj.withCredentials || true,
      lang: obj.lang || 'zh_CN',
      success: obj.success || function (res) {
        console.log('getUserInfoSuccess', res)
      },
      fail: obj.fail || function (res) {
        console.log('getUserInfoFail', res)
      }
    })
  },
  // 获取用户缓存信息
  gu (cb) {
    if(wx.getStorageSync('userInfo')) {
      return wx.getStorageSync('userInfo')
    } else {
      let obj = {
        success (res) {
          wx.setStorageSync('userInfo', res.userInfo)
          if (cb) {
            cb()
          }
        }
      }
      return this.getUserInfo(obj)
    }
  },
  // 获取消息数量
  getMessageCount (that) {
    let self = this
    let _this = that
    let gmc = {
      url: useUrl.getNotReadMessage,
      data: {
        session_key: self.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          _this.setData({
            mCount: res.data.data.count
          })
        }
      }
    }
    this.wxrequest(gmc)
  },
  // 输入内容
  inputValue (e, that) {
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === 'loginInput') {
      that.setData({
        loginInput: value // 登录输入
      })
    } else if (type === 'pwd') {
      that.setData({
        pwd: value // 密码输入
      })
    } else if (type === 'pwd2') {
      that.setData({
        pwd2: value // 密码输入2
      })
    } else if (type === 'name') {
      that.setData({
        name: value // 姓名
      })
    } else if (type === 'mobile') {
      that.setData({
        mobile: value // 手机号码
      })
    } else if (type === 'code') {
      that.setData({
        code: value // 验证码
      })
    }
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    // console.log(' ========== Application is launched ========== ')
    // this.wxlogin()
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    // console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    // console.log(' ========== Application is hid ========== ')
  }
})
