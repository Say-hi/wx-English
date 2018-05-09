// 获取全局应用程序实例对象
const app = getApp()
// const useUrl = require('../../utils/service')
// let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nextTime: '5:00',
    current: 1,
    all: 20,
    Star_time: '2017-09-26 15:43',
    lists: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  // 倒计时
  // timeLost (startTime, end) {
  //   let time = startTime || new Date().getTime()
  //   // console.log('stime', time)
  //   let endTime = end || 300000 // 默认5分钟
  //   let lostTime = 0
  //   let that = this
  //   console.log('开始计时')
  //   timer = setInterval(() => {
  //     // 获取现在和开始之间的相差的毫秒数
  //     lostTime = (new Date().getTime()) - time
  //     // 如果毫秒数超过结束限制时间 清除记时器
  //     if (lostTime >= endTime) {
  //       console.log('结束计时')
  //       clearInterval(timer)
  //       return
  //     }
  //     lostTime = endTime - lostTime
  //     that.setData({
  //       times: parseInt(lostTime / 60000) + ':' + (parseInt(lostTime % 60000 / 1000) < 10 ? '0' + parseInt(lostTime % 60000 / 1000) : parseInt(lostTime % 60000 / 1000))
  //     })
  //   }, 200)
  // },
  // swiper 切换
  currentChange (e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  // 获取题目
  getTi (catId, typeId, id) {
    app.getTi(catId, typeId, id, this)
  },
  // 提交答案
  upAnswer () {
    if (this.data.chooseIndex.length < this.data.info.questions_lists.length) {
      return app.setToast(this, {content: '请完成未填写的题目'})
    }
    app.upAnswer(this, 'picture')
  },
  // 文字输入
  inputValue (e) {
    this.data.chooseIndex[e.currentTarget.dataset.index] = e.detail.value
    this.setData({
      chooseIndex: this.data.chooseIndex
    })
  },
  // 返回错题本
  goCTB () {
    wx.redirectTo({
      url: '../examination/examination'
    })
  },
  // 设置倒计时
  setTime () {
    app.settime(this)
  },
  // 去错题本
  goWrong () {
    app.clearTimer()
    wx.redirectTo({
      url: '../wrong/wrong'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    if (params.from === 'zj') {
      this.setData({
        from: 'zj'
      })
      return app.getZjT(this, params.id, params.timu_id)
    }
    let {catId, typeId} = wx.getStorageSync('testId')
    this.setData({
      catId,
      typeId
    })
    this.getTi(catId, typeId, params.id)
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
    app.clearTimer()
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
