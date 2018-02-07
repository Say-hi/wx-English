// 获取全局应用程序实例对象
/*eslint-disable*/
const app = getApp()
const useUrl = require('../../utils/service')
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
    topImg: '',
    text: '',
    bar_width: 0,
    time_total_str: '',
    play: false,
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
    // console.log(e.touches[0].pageX)
    this.setData({
      touches: {
        startPos: e.touches[0].pageX,
        startTime: this.data.time.passed,
        move:0
      }
    })
    // console.log("startPos:"+e.touches[0].pageX)
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
    this.setData({
      touches: touches,
      time: time,
      bar_width: windowWidth * (time.passed) / time.total
    })
  },
  mytouchend (){
    let that = this
    wx.seekBackgroundAudio({
      position: that.data.time.passed
    })
    // this.audiopassed()
  },
  imgLoad () {
    console.log(1)
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
      this.playMusic(this.data.info.yuyin_url, this.data.info.title, this.data.time.passed || 1)
    }
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
  // 获取绘本内容
  getInfo (id, title) {
    let that = this
    app.wxrequest({
      url: useUrl.huibenDetail,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        // let str = ''
        if (res.data.code === 200) {
          if (res.data.data.image) {
            wx.getImageInfo({
              src: res.data.data.image,
              success (ss) {
                let width = ss.width * 240 / ss.height
                that.setData({
                  width
                })
              }
            })
          }
          that.setData({
            info: res.data.data,
            str: res.data.data.supin_str,
            collect: res.data.data.is_college
          })
          that.playMusic(res.data.data.yuyin_url, title)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 收藏、取消绘本
  userCollect () {
    let that = this
    if (!app.gs()) {
      app.setToast(that, {title: '收藏', content: '尚未登陆小程序，请登录后使用'})
      setTimeout(() => {
        wx.reLaunch({
          url: '../login/login'
        })
      }, 1500)
    }
    app.wxrequest({
      url: useUrl.userCollegeHandle,
      data: {
        session_key: app.gs(),
        college_id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            collect: !that.data.collect
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 时间变动
  timeUp (time, barWidth) {
    this.setData({
      time,
      bar_width: barWidth
    })
  },
  // goSuPin跳转速拼
  goSuPin () {
    wx.switchTab({
      url: '../suPin/suPin'
    })
  },
  // 显示中文
  showZh () {
    let that = this
    if (!this.data.show) {
      if (!this.data.ZH) {
        console.log(that.data.info.content.toString())
        app.wxrequest({
          url: useUrl.baiduTransapiByEnToZh,
          data: {
            session_key: app.gs(),
            words: that.data.info.content
          },
          success (res) {
            wx.hideLoading()
            if (res.data.code === 200) {
              that.setData({
                ZH: res.data.data.trans_words
              })
            } else {
              app.setToast(that, {content: res.data.message})
            }
          }
        })
      }
    }
    this.setData({
      show: !this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // params.id = 1
    // params.title = 'Test'
    wx.setNavigationBarTitle({
      title: `${params.title}详情`
    })
    this.setData({
      id: params.id
    })
    this.getInfo(params.id, params.title)
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
    wx.stopBackgroundAudio()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
