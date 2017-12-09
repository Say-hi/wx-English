const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    nextTime: '5:00',
    current: 1,
    all: 20,
    chooseIndex: [],
    showIndex: 0,
    passed_str: '00:00',
    bar_width: 0,
    time_total_str: '04:09',
    play: true,
    timeVideo: {
      passed: 0,
      total: 249
    },
    touches: {}
  },
// 切换题目
  mytouchstart (e) {
    // console.log(e)
    this.setData({
      touches: {
        startPos: e.changedTouches[0].pageX
      }
    })
  },
  mytouchend (e) {
    // console.log(e)
    let way = e.changedTouches[0].pageX - this.data.touches.startPos
    // console.log(way)
    if (way > 0) {
      // 上一题目
      this.goLast()
    } else if (way < 0) {
      // 下一题目
      this.goNext()
    }
  },
  goLast () {
    if (this.data.showIndex <= 0) return
    --this.data.showIndex
    this.setData({
      // showIndex: this.data.showIndex <= 0 ? 0 : this.data.showIndex
      showIndex: this.data.showIndex
    })
  },
  goNext () {
    if (this.data.showIndex >= (this.data.list.length - 1)) return
    ++this.data.showIndex
    this.setData({
      // showIndex: this.data.showIndex >= (this.data.list.length - 1) ? (this.data.list.length - 1) : this.data.showIndex
      showIndex: this.data.showIndex
    })
  },
  // swiper 切换
  currentChange (e) {
    this.setData({
      current: e.detail.current + 1,
      bar_width: 0,
      timeVideo: {
        passed: 0,
        total: 249
      },
      passed_str: '00:00',
      touches: {},
      chooseIndex: -1
    })
  },
  // // 选择答案
  // chooseCircle (e) {
  //   let index = e.currentTarget.dataset.index
  //   let i = 0
  //   if (!this.data.choose[this.data.showIndex]) {
  //     this.data.choose[this.data.showIndex] = []
  //   }
  //   this.data.choose[this.data.showIndex][index] = !this.data.choose[this.data.showIndex][index]
  //   for (let v of this.data.choose[this.data.showIndex]) {
  //     if (v) i++
  //   }
  //   if (i > 5) {
  //     this.data.choose[this.data.showIndex][index] = !this.data.choose[this.data.showIndex][index]
  //   }
  //   this.setData({
  //     choose: this.data.choose
  //   })
  //   // if (!this.data.choose[this.data.showIndex]) {
  //   //   this.data.choose[this.data.showIndex] = []
  //   // }
  //   // let temp = this.data.choose[this.data.showIndex]
  //   // let temps = this.data.choose[this.data.showIndex]
  //   // console.log('index', e.currentTarget.dataset.index)
  //   // temp[e.currentTarget.dataset.index] = !temp[e.currentTarget.dataset.index]
  //   // let i = 0
  //   // for (let v of temp) {
  //   //   if (v) i++
  //   // }
  //   // // console.log(i)
  //   // if (i > 5) {
  //   //   console.log('temp', temp)
  //   //   console.log('temps', temps)
  //   //   console.log(this.data.choose)
  //   //   this.setData({
  //   //     choose: this.data.choose
  //   //   })
  //   // } else {
  //   //   this.data.choose[this.data.showIndex] = temp
  //   //   this.setData({
  //   //     choose: this.data.choose
  //   //   })
  //   // }
  // },
  // 选择答案
  chooseCircle (e) {
    this.data.chooseIndex[e.currentTarget.dataset.oindex] = e.currentTarget.dataset.index
    this.setData({
      chooseIndex: this.data.chooseIndex
    })
  },
  // 获取题目
  getTi (catId, typeId, id) {
    app.getTi(catId, typeId, id, this, this.wxp)
  },
  // 提交答案
  upAnswer () {
    app.upAnswer(this, 'choose75')
  },
  wxp () {
    app.WP('timu', 'html', this.data.info.exercise_problems, this, 5)
  },
  // 返回答题卡
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
      return app.getZjT(this, params.id, params.timu_id, this.wxp)
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
    // wx.createSelectorQuery().select('#video_control').boundingClientRect(rect => {
    //   windowWidth = rect.width
    // }).exec()
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
