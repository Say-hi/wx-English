// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toast: {
      title: '错误信息',
      image: '../../images/jiong.png',
      content: '错误信息展示',
      show: false
    },
    array: [],
    array2: [],
    level: 0,
    organization: 0,
    showText: '获取验证码'
  },
  // 获取机构
  getMechanismLists () {
    let that = this
    app.wxrequest({
      url: useUrl.getMechanismLists,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            array2: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取年级
  getGradeLists () {
    let that = this
    app.wxrequest({
      url: useUrl.getGradeLists,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            array: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户输入
  inputValue (e) {
    // let that = this
    app.inputValue(e, this)
  },
  // 获取验证码
  getNumber () {
    if (app.checkMobile(this.data.mobile)) {
      return wx.showToast({
        title: '请输入正确的11位手机号码'
      })
    }
    this.setData({
      numberDisabled: true
    })
    let time = 60
    let that = this
    let timer = setInterval(function () {
      if (time <= 0) {
        clearInterval(timer)
        that.setData({
          numberDisabled: false,
          showText: '重新获取验证码'
        })
        return
      }
      that.setData({
        showText: --time + 's'
      })
    }, 1000)
    // 请求手机验证码
    app.wxrequest({
      url: useUrl.sendMobileCode,
      data: {
        mobile: that.data.mobile
      },
      complete (res) {
        wx.hideLoading()
        if (res.data.code === 400) {
          return app.setToast(that, {content: res.data.message})
        } else {
          app.setToast(that, {title: '短信状态', content: '短信发送成功，请注意查收！'})
        }
      }
    })
  },
  // picker 选择切换
  bindPickerChange (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.currentTarget.dataset.type === 'a1') {
      this.setData({
        level: e.detail.value
      })
    } else {
      this.setData({
        organization: e.detail.value
      })
    }
  },
  // 注册下一步
  goNext () {
    let that = this
    let {name, mobile, code, pwd, pwd2, level, organization} = this.data
    if (pwd !== pwd2) {
      return wx.showToast({
        image: '../../images/jiong.png',
        title: '两次输入的密码不一致'
      })
    }
    if (!name && !mobile && !code && !pwd) {
      return wx.showToast({
        image: '../../images/jiong.png',
        title: '请补全信息'
      })
    }
    app.wxrequest({
      url: useUrl.register,
      data: {
        account_name: name,
        mobile,
        mobile_code: code,
        password: pwd,
        grade: that.data.array[level].id,
        mechanism: that.data.array2[organization].id,
        code: wx.getStorageSync('code'),
        iv: wx.getStorageSync('userInfo').iv,
        encryptedData: wx.getStorageSync('userInfo').encryptedData
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.setStorageSync('session_key', res.data.data.session_key)
          wx.showModal({
            title: '注册成功',
            content: '恭喜您注册成功',
            showCancel: false,
            success () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取授权信息
  get (e) {
    if (e.detail.iv) {
      this.setData({
        needLogin: false
      })
    }
    wx.setStorageSync('userInfo', e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this
    wx.login({
      success (res) {
        wx.setStorageSync('code', res.code)
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success (res) {
            wx.setStorageSync('userInfo', res)
          },
          fail () {
            that.setData({
              needLogin: true
            })
            wx.showToast({
              title: '请允许获取您的微信资料'
            })
          }
        })
      }
    })
    this.getMechanismLists()
    this.getGradeLists()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
