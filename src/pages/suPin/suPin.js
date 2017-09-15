// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    show: true,
    maskShow: false,
    lists: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '小学英语',
        id: 123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '中学英语',
        id: 123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '高中英语',
        id: 123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '旅游英语',
        id: 123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '商务英语',
        id: 123
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '学术英语',
        id: 123
      }
    ],
    content: '阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发阿尔gas地方撒旦发射点发 阿斯顿发撒旦法阿斯顿发'
  },
  // 速拼切换
  showSp () {
    this.setData({
      show: !this.data.show
    })
  },
  // 放大
  showBig () {
    this.setData({
      maskShow: true
    })
  },
  // 关闭弹窗
  close () {
    this.setData({
      maskShow: false
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
