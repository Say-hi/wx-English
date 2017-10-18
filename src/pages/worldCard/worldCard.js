// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    cardList: []
  },
// 获取版本词卡内容
  getList (id, page) {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentNianjiCikaWordLists,
      data: {
        session_key: app.gs(),
        id,
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          if (!that.data.more) {
            return app.setToast(this, {title: '下一组', content: '没有更多内容了'})
          }
          that.setData({
            cardList: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取下一组数据
  getNext () {
    if (!this.data.more) {
      return app.setToast(this, {title: '下一组', content: '没有更多内容了'})
    }
    this.getList(this.data.id, ++this.data.page)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    wx.setNavigationBarTitle({
      title: `${params.title}`
    })
    this.setData({
      id: params.id
    })
    this.getList(params.id, 1)
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
