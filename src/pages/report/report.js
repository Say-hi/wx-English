// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
/*eslint-disable*/
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrLabel: ['A', 'B', 'C', 'D', 'E', 'F'],
    timuArr: [
      '',
      '听力选择题',
      '中英互译题',
      '连线匹配题',
      '听写题',
      '看图写词',
      '完形填空',
      '阅读理解',
      '语法填空',
      '阅读理解七选五'
    ],
    // time: '5:00',
    userDo: 0,
    all: 0,
    play: false,
    userChoose: 1,
    rightChoose: 1,
    count: 2341234,
    accuracy: 80,
    easyWrong: 'C',
    from: '',
    userTime: 2,
    choose: [],
    showIndex: 0,
    title: '填空题',
    wrong: true,
    list: [],
    translateText: '',
    analysisText: '',
    testItems: []
  },
// 切换题目
//   mytouchstart (e){
//     // console.log(e)
//     this.setData({
//       touches: {
//         startPos: e.changedTouches[0].pageX
//       }
//     })
//   },
//   mytouchend (e){
//     // console.log(e)
//     let way = e.changedTouches[0].pageX - this.data.touches.startPos
//     console.log(way)
//     if ( way > 0) {
//       // 上一题目
//       this.goLast()
//     } else if (way < 0){
//       // 下一题目
//       this.goNext()
//     }
//   },
//   goLast () {
//     if (this.data.showIndex <= 0) return
//     --this.data.showIndex
//     this.setData({
//       // showIndex: this.data.showIndex <= 0 ? 0 : this.data.showIndex
//       showIndex: this.data.showIndex
//     })
//   },
//   goNext () {
//     if (this.data.showIndex >= (this.data.list.length - 1)) return
//     ++this.data.showIndex
//     this.setData({
//       // showIndex: this.data.showIndex >= (this.data.list.length - 1) ? (this.data.list.length - 1) : this.data.showIndex
//       showIndex: this.data.showIndex
//     })
//   },
//   // swiper 切换
//   currentChange (e) {
//     this.setData({
//       current: e.detail.current + 1,
//       bar_width: 0,
//       timeVideo: {
//         passed: 0,
//         total: 249
//       },
//       passed_str: '00:00',
//       touches: {},
//       chooseIndex: -1
//     })
//   },
//   // 选择答案
//   chooseCircle (e) {
//     this.data.choose[e.currentTarget.dataset.outindex] = e.currentTarget.dataset.index
//     this.setData({
//       choose: this.data.choose
//     })
//   },
  // 获取题目详情
  getTimu (id, catId, typeId) {
    let that = this
    if (that.data.from === 'zj') {
      app.wxrequest({
        url: useUrl.intelligentTestpeparReportByDetail,
        data: {
          session_key: app.gs(),
          id,
          timu_id: catId
        },
        success (res) {
          console.log('typeId', typeId)
          wx.hideLoading()
          if (res.data.code === 200) {
            if (typeId * 1 === 6 || typeId * 1 === 7 || typeId * 1 === 9) {
              // if (that.data.from) {
              //   app.WP('timu', 'html', res.data.data.exercise_problems, that, 5)
              // } else {
              //
              // }
              app.WP('timu', 'html', res.data.data.exercise_problems, that, 5)
              res.data.data.exercise_problems = ''
            }
            that.setData({
              info: res.data.data
            })
            if (typeId * 1 === 3) {
              that.setData({
                rightAnswerM: JSON.stringify(res.data.data.questions_lists[0].right_answer).replace(/[\{\}\"]/g, ''),
                userAnswerM: JSON.stringify(res.data.data.questions_lists[0].user_answer).replace(/[\{\}\"]/g, '')
              })
              console.log(that.data.rightAnswerM)
            }
            app.WP('analysis', 'html', res.data.data.analysis, that, 5)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    } else {
      app.wxrequest({
        url: useUrl.intelligentTestReportByDetail,
        data: {
          session_key: app.gs(),
          cat_id: catId,
          type_id: typeId,
          answer_id: id
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            if (typeId * 1 === 6 || typeId * 1 === 7 || typeId === 9) {
              app.WP('timu', 'html', res.data.data.exercise_problems, that, 5)
              res.data.data.exercise_problems = ''
            }
            that.setData({
              info: res.data.data
            })
            if (typeId * 1 === 3) {
              that.setData({
                rightAnswerM: JSON.stringify(res.data.data.questions_lists[0].right_answer).replace(/[\{\}\"]/g, ''),
                userAnswerM: JSON.stringify(res.data.data.questions_lists[0].user_answer).replace(/[\{\}\"]/g, '')
              })
              console.log(that.data.rightAnswerM)
            }
            app.WP('analysis', 'html', res.data.data.analysis, that, 5)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    }
  },
  // 错题本
  getCtbTimu (id, typeId) {
    let that = this
    // if (that.data.from === 'zj') {
      app.wxrequest({
        url: useUrl.wrongQuestionDetail,
        data: {
          session_key: app.gs(),
          id
        },
        success (res) {
          // console.log('typeId', typeId)
          wx.hideLoading()
          if (res.data.code === 200) {
            if (typeId * 1 === 6 || typeId * 1 === 7 || typeId * 1 === 9) {
              // if (that.data.from) {
              //   app.WP('timu', 'html', res.data.data.exercise_problems, that, 5)
              // } else {
              //
              // }
              app.WP('timu', 'html', res.data.data.exercise_problems, that, 5)
              res.data.data.exercise_problems = ''
            }
            that.setData({
              info: res.data.data,
              wrong: 1
          })
            if (typeId * 1 === 3) {
              that.setData({
                rightAnswerM: JSON.stringify(res.data.data.questions_lists[0].right_answer).replace(/[\{\}\"]/g, ''),
                userAnswerM: JSON.stringify(res.data.data.questions_lists[0].user_answer).replace(/[\{\}\"]/g, '')
              })
              console.log(that.data.rightAnswerM)
            }
            app.WP('analysis', 'html', res.data.data.analysis, that, 5)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    // }
    // else {
    //   app.wxrequest({
    //     url: useUrl.intelligentTestReportByDetail,
    //     data: {
    //       session_key: app.gs(),
    //       cat_id: catId,
    //       type_id: typeId,
    //       answer_id: id
    //     },
    //     success (res) {
    //       wx.hideLoading()
    //       if (res.data.code === 200) {
    //         if (typeId * 1 === 6 || typeId * 1 === 7 || typeId === 9) {
    //           app.WP('timu', 'html', res.data.data.exercise_problems, that, 5)
    //           res.data.data.exercise_problems = ''
    //         }
    //         that.setData({
    //           info: res.data.data
    //         })
    //         if (typeId * 1 === 3) {
    //           that.setData({
    //             rightAnswerM: JSON.stringify(res.data.data.questions_lists[0].right_answer).replace(/[\{\}\"]/g, ''),
    //             userAnswerM: JSON.stringify(res.data.data.questions_lists[0].user_answer).replace(/[\{\}\"]/g, '')
    //           })
    //           console.log(that.data.rightAnswerM)
    //         }
    //         app.WP('analysis', 'html', res.data.data.analysis, that, 5)
    //       } else {
    //         app.setToast(that, {content: res.data.message})
    //       }
    //     }
    //   })
    // }
  },
  // 播放语音文件
  playMusic () {
    let that = this
    this.setData({
      play: !this.data.play
    })
    if (this.data.play) {
      wx.playBackgroundAudio({
        dataUrl: that.data.info.exercise_problems,
        title: '听力音频'
      })
    } else {
      wx.stopBackgroundAudio()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    if (params.from === 'ctb') {
      this.setData({
        from: 'ctb',
        typeId: params.type,
        title: this.data.timuArr[params.type],
      })
      return this.getCtbTimu(params.id, params.type)
    } else if (params.from === 'zj') {
      this.setData({
        from: 'zj',
        typeId: params.type,
        title: this.data.timuArr[params.type],
        all: params.all,
        userDo: params.choose,
        wrong: params.error   // 0 正确  1 错误
      })
      this.getTimu(params.id, params.timu, params.type)
    } else {
      let {catId, typeId} = app.gs('testId')
      this.setData({
        typeId,
        title: this.data.timuArr[typeId],
        all: params.all,
        userDo: params.choose,
        wrong: params.error   // 0 正确  1 错误
      })
      this.getTimu(params.id, catId, typeId)
    }
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
