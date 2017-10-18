// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'inteTest',
    lists: [
      {
        title: '版本',
        id: 0,
        width: 230,
        height: 206,
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
        title: '年级',
        width: 221,
        height: 263,
        id: 1,
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
        title: '难易',
        width: 347,
        height: 363,
        id: 2,
        list: [
          {
            image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          },
          {
            image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            t: '乌鸦喝水'
          }
        ]
      }
    ]
  },
  // 下一步
  goNext (e) {
    let type = e.currentTarget.dataset.type * 1
    let id = e.currentTarget.dataset.id
    // 版本
    let u = type === 0 ? '../testDetail/testDetail' : type === 1 ? '../worldCard/worldCard' : ''
    wx.navigateTo({
      url: `${u}?id=${id}&title=${e.currentTarget.dataset.title}`
    })
  },
  // 获取年级列表
  getGrade () {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentNianjiLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.lists[1].list = res.data.data
          that.setData({
            lists: that.data.lists
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取版本列表
  getLevel () {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentBanbenLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.lists[0].list = res.data.data
          that.setData({
            lists: that.data.lists
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
    this.getGrade()
    this.getLevel()
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
