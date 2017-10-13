// 获取全局应用程序实例对象
// const app = getApp()
/*eslint-disable*/
let windowWidth = 375
// wx.getSystemInfo({
//   success (res) {
//     windowWidth = res.windowWidth - (( 2 * (res.windowWidth * 0.03)).toFixed(2))
//   }
// })
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrLabel: ['A', 'B', 'C', 'D', 'E', 'F'],
    time: '5:00',
    current: 1,
    all: 20,
    chooseIndex: -1,
    list: [
      {
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        text: 'askdfhasdhfkjsadhfasdfojasdfjsadlfjsdlajfasdljflsadkjf',
        arr: ['asdfasdf', 'asdfsadfas', 'asdfasdfas']
      },
      {
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        text: 'askdfhasdhfkjsadhfasdfojasdfjsadlfjsdlajfasdljflsadkjf',
        arr: ['asdfasdf', 'asdfsadfas', 'asdfasdfas']
      }
    ],
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
// 播放控制相关
  mytouchstart (e){
    // console.log(e)
    // console.log(e.touches[0].pageX)
    this.setData({
      touches: {
        startPos: e.touches[0].pageX,
        startTime: this.data.timeVideo.passed,
        move:0,
        timeStamp: e.timeStamp
      }
    })
    // console.log("startPos:"+e.touches[0].pageX)
  },
  mytouchmove (e){
    var touches = this.data.touches
    touches.move = e.touches[0].pageX - touches.startPos
    var time = this.data.timeVideo
    time.passed = touches.startTime + parseInt(touches.move / windowWidth * time.total)
    if (time.passed < 0){
      time.passed = 0
    } else if(time.passed > time.total){
      time.passed = time.total
    }
    this.setData({
      passed_str: (parseInt(time.passed / 60) < 10 ? '0' + parseInt(time.passed / 60) : parseInt(time.passed / 60))  + ':' + (time.passed % 60 < 10 ? '0' + time.passed % 60 : time.passed % 60),
      touches: touches,
      timeVideo: time,
      bar_width: windowWidth * (time.passed) / time.total
    })
  },
  mytouchend (e){
    // console.log(e)
    if (Math.abs(e.timeStamp - this.data.touches.timeStamp) <= 300 && Math.abs(e.changedTouches[0].pageX - this.data.touches.startPos) <= 10) {
      this.play()
    }
    // this.audiopassed()
  },
  play () {
    this.setData({
      play: !this.data.play
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
  // 选择答案
  chooseCircle (e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
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
    wx.createSelectorQuery().select('#video_control').boundingClientRect(rect => {
      windowWidth = rect.width
    }).exec()
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
