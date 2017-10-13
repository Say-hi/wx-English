// 获取全局应用程序实例对象
// const app = getApp()
let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    times: '5:00',
    current: 1,
    all: 20,
    Star_time: '2017-09-26 15:43',
    lists: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  startJS () {
    clearInterval(timer)
    this.timeLost(new Date().getTime())
  },
  // 倒计时
  timeLost (startTime, end) {
    let time = startTime || new Date().getTime()
    // console.log('stime', time)
    let endTime = end || 300000 // 默认5分钟
    let lostTime = 0
    let that = this
    console.log('开始计时')
    timer = setInterval(() => {
      // 获取现在和开始之间的相差的毫秒数
      lostTime = (new Date().getTime()) - time
      // 如果毫秒数超过结束限制时间 清除记时器
      if (lostTime >= endTime) {
        console.log('结束计时')
        clearInterval(timer)
        return
      }
      lostTime = endTime - lostTime
      that.setData({
        times: parseInt(lostTime / 60000) + ':' + (parseInt(lostTime % 60000 / 1000) < 10 ? '0' + parseInt(lostTime % 60000 / 1000) : parseInt(lostTime % 60000 / 1000))
      })
    }, 200)
  },
  // 记录开始时间
  setTime () {
    // this.setData({
    //   start_time: (new Date()).getTime()
    // })
    wx.setStorageSync('start_time', new Date().getTime())
  },
  // swiper 切换
  currentChange (e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setTime()
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
