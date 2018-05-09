// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
/*eslint-disable*/
let timer = ''
let windowWidth = 375
wx.getSystemInfo({
  success (res) {
    windowWidth = res.windowWidth - (( 2 * (res.windowWidth * 0.03)).toFixed(2))
  }
})
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    nextTime: '5:00',
    current: 1,
    all: 20,
    chooseIndex: -1,
    list: [
      {
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        text: 'askdfhasdhfkjsadhfasdfojasdfjsadlfjsdlajfasdljflsadkjf_ _ _ _ _.',
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
    barWidth: 0,
    time_total_str: '00:00',
    play: false,
    time: {
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
  // mytouchmove (e){
  //   var touches = this.data.touches
  //   touches.move = e.touches[0].pageX - touches.startPos
  //   var time = this.data.timeVideo
  //   time.passed = touches.startTime + parseInt(touches.move / windowWidth * time.total)
  //   if (time.passed < 0){
  //     time.passed = 0
  //   } else if(time.passed > time.total){
  //     time.passed = time.total
  //   }
  //   this.setData({
  //     passed_str: (parseInt(time.passed / 60) < 10 ? '0' + parseInt(time.passed / 60) : parseInt(time.passed / 60))  + ':' + (time.passed % 60 < 10 ? '0' + time.passed % 60 : time.passed % 60),
  //     touches: touches,
  //     timeVideo: time,
  //     bar_width: windowWidth * (time.passed) / time.total
  //   })
  // },
  // mytouchend (e){
  //   // console.log(e)
  //   if (Math.abs(e.timeStamp - this.data.touches.timeStamp) <= 300 && Math.abs(e.changedTouches[0].pageX - this.data.touches.startPos) <= 10) {
  //     this.play()
  //   }
  //   // this.audiopassed()
  // },
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
  // 获取背景音乐状态
  getBA () {
    let that = this
    wx.getBackgroundAudioPlayerState({
      success (res) {
        that.data.time.total = res.duration,
          that.setData({
            time_total_str: (parseInt(res.duration / 60) < 10 ? '0' + parseInt(res.duration / 60) : parseInt(res.duration / 60))  + ':' + (res.duration % 60 < 10 ? '0' + parseInt(res.duration % 60) : parseInt(res.duration % 60)),
            time: that.data.time
          })
        if (that.data.info.exercise_problems && res.status * 1 !== 1) {
          setTimeout(() => {
            that.getBA()
          }, 300)
        }
      }
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
            // console.log(res)
            that.data.time.total = res.duration,
              that.setData({
                time_total_str: (parseInt(res.duration / 60) < 10 ? '0' + parseInt(res.duration / 60) : parseInt(res.duration / 60))  + ':' + (res.duration % 60 < 10 ? '0' + parseInt(res.duration % 60) : parseInt(res.duration % 60)),
                time: that.data.time
              })
            if (res.status * 1 !== 1) {
              setTimeout(() => {
                that.getBA()
              }, 300)
            }
          }
        })
        // that.getBA()
      }
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
  // 获取题目
  getTi (catId, typeId, id) {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentQuestionDetail,
      data: {
        session_key: app.gs(),
        cat_id: catId,
        type_id: typeId,
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data,
            chooseIndex: [],
            starTime: new Date().getTime()
          })
          that.playMusic(res.data.data.exercise_problems, '听力写词')
          that.setTime()
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取组卷题目
  getZjT (id, timu_id) {
    let that = this
    app.wxrequest({
      url: useUrl.getIntelligentTestpaperDetail,
      data: {
        session_key: app.gs(),
        id,
        timu_id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data,
            chooseIndex: [],
            startTime: new Date().getTime()
          })
          that.playMusic(res.data.data.exercise_problems, '听力写词')
          that.setTime()
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 提交答案
  upAnswer () {
    let that = this
    for (let v of this.data.chooseIndex) {
      if (!v.trim()) return app.setToast(that, {content: '请选择答案'})
    }
    clearInterval(timer)
    wx.stopBackgroundAudio()
    let answer = {}
    this.data.chooseIndex.forEach((v, i)=> {
      answer[i + 1] = v.trim()
    })
    if (that.data.from) {
      app.wxrequest({
        url: useUrl.postIntelligentTestpaper,
        data: {
          session_key: app.gs(),
          id: that.data.info.id,
          timu_id: that.data.info.timu_id,
          user_answer: JSON.stringify(answer)
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            if (that.data.info.next_timu_id * 1 === 0 ) {
              app.setToast(that, {content: '没有下一题了,查询结果中'})
              return setTimeout(() => {
                wx.redirectTo({
                  url: `../practice/practice?from=zj&id=${that.data.info.id}`
                })
              }, 1500)
            }
            wx.showLoading({
              title: '开始下一题'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: `${app.data.typeArr[that.data.info.next_type_id]}?timu_id=${that.data.info.next_timu_id}&from=zj&id=${that.data.info.id}`
              })
            }, 1000)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    } else {
      app.wxrequest({
        url: useUrl.checkIntelligentAnswer,
        data: {
          session_key: app.gs(),
          id: that.data.info.id,
          answer: JSON.stringify(answer),
          answering_time: Math.floor((new Date().getTime() - that.data.starTime) / 1000)
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            if (that.data.info.next_id * 1 === 0 ) {
              app.setToast(that, {content: '没有下一题了,查询结果中'})
              return setTimeout(() => {
                wx.redirectTo({
                  url: '../practice/practice'
                })
              }, 1500)
            }
            wx.showLoading({
              title: '开始下一题'
            })
            setTimeout(() => {
              that.getTi(that.data.catId, that.data.typeId, that.data.info.next_id)
            }, 1000)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    }
  },
  // 时间变动
  timeUp (time, barWidth) {
    let that = this
    if (this.data.time_total_str == '00:00') {
      this.setData({
        time_total_str: (parseInt(time.total / 60) < 10 ? '0' + parseInt(time.total / 60) : parseInt(time.total / 60))  + ':' + (time.total % 60 < 10 ? '0' + parseInt(time.total % 60) : parseInt(time.total % 60))
      })
    }
    if (this.data.barWidth * 1 === 0) {
      wx.createSelectorQuery().select('.progress_bar').fields({
        size: true
      }, function(res){
        that.setData({
          barWidth: res.width,
          bar_width: res.width * (time.passed) / time.total
        })
      }).exec()
    }
    let passed_str = (parseInt(time.passed / 60) < 10 ? '0' + parseInt(time.passed / 60) : parseInt(time.passed / 60))  + ':' + (time.passed % 60 < 10 ? '0' + parseInt(time.passed % 60) : parseInt(time.passed % 60))
    this.setData({
      time,
      passed_str,
      bar_width: this.data.barWidth * (time.passed) / time.total
      // bar_width: barWidth
    })
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
    let that = this
    let delTime = 300
    timer = setInterval(() => {
      if (delTime <= 0) {
        clearInterval(timer)
        let answer = {}
        let s = 1
        for (let i of that.data.info.questions_lists) {
          answer[s] = 'A'
          s++
        }
        if (that.data.from) {
          app.wxrequest({
            url: useUrl.postIntelligentTestpaper,
            data: {
              session_key: app.gs(),
              id: that.data.info.id,
              timu_id: that.data.info.timu_id,
              user_answer: JSON.stringify(answer)
            },
            success (res) {
              wx.hideLoading()
              if (res.data.code === 200) {
                if (that.data.info.next_timu_id * 1 === 0 ) {
                  app.setToast(that, {content: '没有下一题了,查询结果中'})
                  return setTimeout(() => {
                    wx.redirectTo({
                      url: `../practice/practice?from=zj&id=${that.data.info.id}`
                    })
                  }, 1500)
                }
                wx.showLoading({
                  title: '超时自动提交,开始下一题'
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: `${app.data.typeArr[that.data.info.next_type_id]}?timu_id=${that.data.info.next_timu_id}&from=zj&id=${that.data.info.id}`
                  })
                }, 1000)
              } else {
                app.setToast(that, {content: res.data.message})
              }
            }
          })
        } else {
          app.wxrequest({
            url: useUrl.checkIntelligentAnswer,
            data: {
              session_key: app.gs(),
              id: that.data.info.id,
              answer: JSON.stringify(answer),
              answering_time: delTime
            },
            success (res) {
              wx.hideLoading()
              if (res.data.code === 200) {
                if (that.data.info.next_id * 1 === 0 ) {
                  app.setToast(that, {content: '没有下一题了,查询结果中'})
                  return setTimeout(() => {
                    wx.redirectTo({
                      url: '../practice/practice'
                    })
                  }, 1500)
                }
                wx.showLoading({
                  title: '超时自动提交,开始下一题'
                })
                setTimeout(() => {
                  that.getTi(that.data.catId, that.data.typeId, that.data.info.next_id)
                }, 1000)
              } else {
                app.setToast(that, {content: res.data.message})
              }
            }
          })
        }
        return
      }
      delTime--
      that.setData({
        nextTime: (parseInt(delTime / 60) < 10 ? '0' + parseInt(delTime / 60) : parseInt(delTime / 60)) + ':' + (delTime % 60 < 10 ? '0' + parseInt(delTime % 60) : parseInt(delTime % 60))
      })
    }, 1000)
  },
  // 去错题本
  goWrong () {
    clearInterval(timer)
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
      return this.getZjT(params.id, params.timu_id)
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
    clearInterval(timer)
    wx.stopBackgroundAudio()
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
