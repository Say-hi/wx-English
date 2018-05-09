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
  // 速拼展示
  supin (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.currentIndex * 1) {
      return this.setData({
        currentIndex: -1
      })
    }
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
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
            return app.setToast(that, {title: '下一组', content: '没有更多内容了'})
          }
          that.setData({
            cardList: res.data.data,
            currentIndex: -1
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
  getNextUp () {
    if (this.data.page * 1 === 1) {
      return app.setToast(this, {title: '上一组', content: '现在是第一页啦'})
    }
    this.getList(this.data.id, --this.data.page)
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
