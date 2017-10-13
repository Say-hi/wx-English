// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },
  // 获取信息
  getInfo (id) {
    let that = this
    app.wxrequest({
      url: useUrl.encyclopediaDetail,
      data: {
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 重新获取数据
  getReload (e) {
    this.getInfo(e.currentTarget.dataset.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.getInfo(params.id)
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
