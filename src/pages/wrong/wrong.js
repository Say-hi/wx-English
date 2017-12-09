// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    wrongList: []
  },
  // 获取错题列表
  getList (page) {
    let that = this
    app.wxrequest({
      url: useUrl.getWrongQuestionLists,
      data: {
        session_key: app.gs(),
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            wrongList: that.data.wrongList.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 去错题报告详情
  goDetail (e) {
    wx.navigateTo({
      url: `../report/report?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}&from=ctb`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getList()
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
