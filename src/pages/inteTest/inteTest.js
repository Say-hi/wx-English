// 获取全局应用程序实例对象
// const app = getApp()

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
        id: 123,
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
      },
      {
        title: '难易',
        width: 347,
        height: 363,
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
  goNext (e) {
    wx.navigateTo({
      url: `../`
    })
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
