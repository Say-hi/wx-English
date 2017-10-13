// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    memoryList: [],
    page: 1,
    show: 0,
    listArr: ['icon-erji', 'icon-huatong', 'icon-langdu', 'icon-book']
  },
  // 去到详情页面
  goDetail (e) {
    let u = this.data.show * 1 === 0 ? '../listenDetail/listenDetail' : this.data.show * 1 === 1 ? '../talkDetail/talkDetail' : this.data.show * 1 === 2 ? '../readDetail/readDetail' : this.data.show * 1 === 3 ? '../memoryDetail/memoryDetail' : ''
    wx.navigateTo({
      url: `${u}?id=${e.currentTarget.dataset.id}`
    })
  },
  // 获取学科分类内容列表
  getList (gradeId, catId, page) {
    let that = this
    app.wxrequest({
      url: useUrl.subjectenglishLists,
      data: {
        session_key: app.gs(),
        grade_id: gradeId,
        cat_id: catId,
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            memoryList: that.data.memoryList.concat(res.data.data)
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
      show: params.type
    })
    let {gradeId, catId} = params
    this.setData({
      gradeId,
      catId
    })
    this.getList(gradeId, catId, 1)
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
      this.getList(this.data.gradeId, this.data.catId, ++this.data.page)
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
