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
    lists: [
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '母亲节快乐',
      //   c: '母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐'
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '母亲节快乐',
      //   c: '母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐母亲节快乐'
      // }
    ]
  },
  // 获取数据
  getList (page) {
    let that = this
    app.wxrequest({
      url: useUrl.userCollegeLists,
      data: {
        session_key: app.gs(),
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            lists: that.data.lists.concat(res.data.data)
          })
        }
      }
    })
  },
  // 绘本详情
  goHBdetail (e) {
    app.goHBdetail(e)
    // wx.navigateTo({
    //   url: `../hbDetail/hbDetail?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
    // })
  },
  // 触底
  onReachBottom () {
    if (this.data.more) {
      this.getList(++this.data.page)
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
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.getList(1)
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
