// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  // 用户输入
  inputValue (e) {
    // let that = this
    app.inputValue(e, this)
  },
  // 用户登录
  login (e) {
    let login = {
      url: useUrl.login,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.setStorageSync('loginInfo',{ loginInput, pwd })
          wx.setStorageSync('session_key', res.data.data.session_key)
          wx.switchTab({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            image: '../../images/jiong.png',
            title: res.data.message
          })
        }
      }
    }
    let { loginInput, pwd } = this.data
    if (e.currentTarget.dataset.type === 'tourist') {
      login.data = {
        type: 'tourist'
      }
    } else {
      login.data = {
        loginInput,
        pwd,
        type: 'user'
      }
    }
    app.wxrequest(login)
  },
  // 自动登录获取参数
  getBeforeInput () {
    let { loginInput, pwd } = wx.getStorageSync('loginInfo')
    if (loginInput && pwd) {
      this.setData({
        loginInput,
        pwd
      })
    }
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
    this.getBeforeInput()
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
