// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: {
      src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      t: '英语作业',
      type: '英语作业',
      day: '今天星期一',
      time: '15:24',
      id: 123,
      c: '背诵十分英语'
    }
  },
  getDetail (id) {
    let that = this
    app.wxrequest({
      url: useUrl.taskworkDetail,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            item: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  finish () {
    let that = this
    app.wxrequest({
      url: useUrl.userCompleteTaskwork,
      data: {
        id: that.data.id,
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '完成作业'
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
  onLoad (params) {
    this.setData({
      id: params.id
    })
    this.getDetail(params.id)
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
  onShareAppMessage () {
    return {
      title: '您的好友向您分享了精彩内容，快来看一看吧',
      path: '/pages/login/login'
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
