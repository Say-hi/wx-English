// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // array: ['小学', '初中', '高中', '大学'],
    // array2: ['xxx机构1', 'xxx机构2', 'xxx机构3', 'xxx机构4'],
    showText: '获取验证码'
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
  // bindPickerChange (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   if (e.currentTarget.dataset.type === 'a1') {
  //     this.setData({
  //       index: e.detail.value
  //     })
  //   } else {
  //     this.setData({
  //       index2: e.detail.value
  //     })
  //   }
  // },
  // 下一步
  goNext () {
    let that = this
    let { name, mobile, pwd, pwd2, code } = this.data
    if (pwd !== pwd2) {
      return wx.showToast({
        image: '../../images/jiong.png',
        title: '两次输入的密码不一致'
      })
    }
    if ((!name || name.length === 0) && (!pwd || pwd.length === 0) && (!code || (code.length === 0))) {
      return wx.showToast({
        image: '../../images/jiong.png',
        title: '请补全信息'
      })
    }
    app.wxrequest({
      url: useUrl.findUserPassword,
      data: {
        mobile,
        password: pwd,
        mobile_code: code
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showModal({
            title: '密码找回',
            content: '您的新密码已经生效',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
