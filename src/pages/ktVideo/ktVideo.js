// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// let height = wx.getSystemInfoSync().windowHeight
let width = wx.getSystemInfoSync().windowWidth
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'ktVideo',
    lists: [],
    page: 1,
    choose: -1
  },
  // 获取数据
  getLists (catId, page) {
    let that = this
    app.wxrequest({
      url: useUrl.microclassLists,
      data: {
        session_key: app.gs(),
        cat_id: catId,
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            lists: that.data.lists.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取视频
  goDetail (e) {
    let that = this
    app.wxrequest({
      url: useUrl.microclassDetail,
      data: {
        session_key: app.gs(),
        id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            choose: e.currentTarget.dataset.index,
            showSrc: res.data.data.video_url
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
    wx.setNavigationBarTitle({
      title: `${params.title}`
    })
    this.setData({
      cat_id: params.cat_id
    })
    this.setData({
      videoHeight: width * 250 / 375
    })
    this.getLists(params.cat_id, 1)
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
  onReachBottom () {
    if (this.data.more) {
      this.getLists(this.data.cat_id, ++this.data.page)
    }
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
