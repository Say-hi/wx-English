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
    id: '',
    topImg: '',
    lists: []
  },
  // 获取绘本列表专题内容
  getList (id) {
    let that = this
    app.wxrequest({
      url: useUrl.huibenListsByCategory,
      data: {
        cat_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // app.setMore(res.data.data, that)
          that.setData({
            lists: that.data.lists.concat(res.data.data.lists),
            topImg: res.data.data.common.banner_image
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 绘本详情
  goHBdetail (e) {
    wx.navigateTo({
      url: `../hbDetail/hbDetail?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.data.id = params.id
    wx.setNavigationBarTitle({
      title: `${params.title}绘本专题`
    })
    this.getList(params.id)
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
  // onReachBottom () {
  //   if (this.data.more) {
  //     this.getList(this.data.id, ++this.data.page)
  //   }
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
