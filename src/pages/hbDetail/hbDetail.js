// 获取全局应用程序实例对象
// const app = getApp()
/*eslint-disable*/
// 创建页面实例对象
let windowWidth = 375
wx.getSystemInfo({
  success (res) {
    windowWidth = res.windowWidth - (( 2 * (res.windowWidth * 0.03)).toFixed(2))
  }
})

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    text: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpghttp://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    passed_str: '00:00',
    bar_width: 0,
    time_total_str: '',
    play: true,
    collect: false,
    time: {
      passed: 0,
      total: 249
    },
    touches: {}
  },
  // 收藏
  collect () {
    this.setData({
      collect: !this.data.collect
    })
  },
  // 播放控制相关
  mytouchstart (e){
    console.log(e.touches[0].pageX)
    this.setData({
      touches: {
        startPos: e.touches[0].pageX,
        startTime: this.data.time.passed,
        move:0
      }
    })
    console.log("startPos:"+e.touches[0].pageX)
  },
  mytouchmove (e){
    var touches = this.data.touches
    touches.move = e.touches[0].pageX - touches.startPos
    var time = this.data.time
    time.passed = touches.startTime + parseInt(touches.move / windowWidth * time.total)
    if(time.passed < 0){
      time.passed = 0
    } else if(time.passed > time.total){
      time.passed = time.total
    }
    console.log("pageX:"+e.touches[0].pageX)
    console.log("move:"+touches.move)
    console.log('time', time)
    // console.log("passed time:"+time.passed)
    this.setData({
      touches: touches,
      time: time,
      bar_width: windowWidth * (time.passed) / time.total,
      // passed_str:this.getTimeStr(time.passed),
    })

    //console.log(e.touches[0])
  },
  mytouchend (){
    // this.audiopassed()
  },
  play () {
    this.setData({
      play: !this.data.play
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
