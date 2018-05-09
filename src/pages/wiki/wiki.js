// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'wiki',
    lists: [
      {
        title: '故事',
        id: 123,
        list: [
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          }
        ]
      },
      {
        title: '故事2',
        id: 1213,
        list: [
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          }
        ]
      }
    ]
  },
  // 获取文化百科首页数据
  getIndexInfo () {
    let that = this
    app.wxrequest({
      url: useUrl.encyclopediaIndex,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // console.log(res)
          that.setData({
            lists: res.data.data
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
  onLoad () {
    this.getIndexInfo()
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
  onShareAppMessage () {
    return {
      title: '您的好友向您分享了精彩内容，快来看一看吧',
      path: '/pages/login/login'
    }
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
