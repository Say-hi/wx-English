// 获取全局应用程序实例对象
/*eslint-disable*/
const app = getApp()
const useUrl = require('../../utils/service')
const backgroundAudioManager = wx.getBackgroundAudioManager()
backgroundAudioManager.onTimeUpdate(() => {
  let time = {
    total: '',
    passed: ''
  }
  time.total = backgroundAudioManager.duration
  time.passed = backgroundAudioManager.currentTime
  let barWidth = 480 * (time.passed) / time.total
  getCurrentPages()[getCurrentPages().length - 1].timeUp(time, barWidth)
})
// 自然结束播放
backgroundAudioManager.onEnded(() => {
  let that = getCurrentPages()[getCurrentPages().length - 1]
  that.data.time.passed = 0
  that.setData({
    bar_width: 0,
    time: that.data.time,
    play: false
  })
})
// 人为结束播放
backgroundAudioManager.onStop(() => {
  let that = getCurrentPages()[getCurrentPages().length - 1]
  that.data.time.passed = 0
  that.setData({
    bar_width: 0,
    time: that.data.time,
    play: false
  })
})
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bar_width: 0,  // 240
    play: false,
    listen: {
      t: '听一听',
      c: '听一听内容展示听一听内容展示听一听内容展示',
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    },
    time: {
      passed: 0,
      total: ''
    },
    lists: []
  },
  // 时间变动
  timeUp (time, barWidth) {
    this.setData({
      time,
      bar_width: barWidth
    })
  },
  // 播放音乐
  playMusic (url, title, seek) {
    let that = this
    wx.playBackgroundAudio({
      dataUrl: url,
      title,
      success () {
        that.setData({
          play: true
        })
        // 暂停后恢复
        if (seek !== undefined) {
          wx.seekBackgroundAudio({
            position: seek
          })
        }
        wx.getBackgroundAudioPlayerState({
          success (res) {
            that.data.time.total = res.duration
            that.setData({
              time: that.data.time
            })
          }
        })
      }
    })
  },
  // 播放状态控制
  play () {
    this.setData({
      play: !this.data.play
    })
    // 暂停播放
    if (!this.data.play) {
      wx.pauseBackgroundAudio()
    } else {
      this.playMusic(this.data.info.audio_url, this.data.info.name, this.data.time.passed || 1)
    }
  },
  // 获取数据
  getList (id) {
    let that = this
    app.wxrequest({
      url: useUrl.subjectenglishDetailByTing,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.WP('lists', 'html', res.data.data.problem, that, 5)
          that.setData({
            info: res.data.data
          })
          that.playMusic(res.data.data.audio_url, res.data.data.name)
        } else {
          app.setToast(that, res.data.message)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.getList(params.id)
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
    wx.stopBackgroundAudio()
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  },
  onShareAppMessage () {
    return {
      title: '您的好友向您分享了精彩内容，快来看一看吧',
      path: '/pages/login/login'
    }
  }
})
