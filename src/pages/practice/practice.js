
/*eslint-disable*/
const app = getApp()
const useUrl = require('../../utils/service')
let windowWidth = 375
wx.getSystemInfo({
  success (res) {
    windowWidth = res.windowWidth - (( 2 * (res.windowWidth * 0.03)).toFixed(2))
  }
})
Page({
  data: {
    items:[],
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
    showArr: [
      // '',
      // '../answerListen/answerListen', // 1.听力选择题
      // '../answerTranslate/answerTranslate', // 2.中英互译题
      // '../answerMatch/answerMatch', //  3.连线匹配题
      // '../answerWrite/answerWrite', // 4.听写题
      // '../answerPicture/answerPicture', // 5.看图写词
      // '../answerCloze/answerCloze', // 6.完形填空
      // '../answerReading/answerReading', // 7.阅读理解
      // '../answerRational/answerRational', // 8.语法填空
      // '../answer75/answer75' // 9.阅读理解七选五
    ],
    percent: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取答案列表
  getAns () {
    let that = this
    let { catId, typeId } = app.gs('testId')
    app.wxrequest({
      url: useUrl.intelligentTestReport,
      data: {
        session_key: app.gs(),
        cat_id: catId,
        type_id: typeId
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            items: res.data.data.res_arr,
            typeTitle: that.data.timuArr[typeId]
          })
          that.drawPercent(res.data.data.correct_rate / 100)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取组卷答案
  getZjAns (id) {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentTestpaperUserReport,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            items: res.data.data.res_arr,
            info: res.data.data.res_info,
          })
          that.drawPercent(res.data.data.res_info.score / 100)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // goReport
  goReport (e) {
    if (this.data.from) {
      return wx.navigateTo({
        url: `../report/report?timu=${e.currentTarget.dataset.timu}&id=${this.data.id}&type=${e.currentTarget.dataset.type}&choose=${e.currentTarget.dataset.index}&all=${this.data.items.length}&error=${e.currentTarget.dataset.error}&from=zj`
      })
    }
    wx.navigateTo({
      url: `../report/report?id=${e.currentTarget.dataset.id}&choose=${e.currentTarget.dataset.index}&all=${this.data.items.length}&error=${e.currentTarget.dataset.error}`
    })
  },
  goBack () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (params) {
    if (params.from === 'zj') {
      this.setData({
        from: 'zj',
        id: params.id
      })
      this.getZjAns(params.id)
    } else {
      this.getAns()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(params)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    return {
      title: '您的好友向您分享了精彩内容，快来看一看吧',
      path: '/pages/login/login'
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  drawPercent(p){
    var that = this
    var arcs = p * 2;
    var arc = 0;
    var context = wx.createCanvasContext('firstcanvas');
    // context.fillStyle = "#ffffff";
    context.clearRect(0, 0, windowWidth, 200);
    // console.log(windowWidth / 2);
    var X = windowWidth / 2;
    var XX = ''
    var YY = ''
    var Y = 105;
    // console.log(wx.createSelectorQuery().select('#can'));
    wx.createSelectorQuery().select('#can').fields({
      size: true
    }, function(res){
      // console.log(res);
      XX = res.width
      YY = res.height
      X = (res.width / 2).toFixed(2)
      Y = res.height / 2
      // console.log(res.width);      // 节点的宽度
      // console.log(res.height);     // 节点的高度
    }).exec()

    var timer = setInterval(function () {
      context.clearRect(0, 0, XX, YY);
      if(arc <= arcs){
        context.beginPath();
        context.setStrokeStyle("#e7e7e7")
        context.setLineWidth(1)
        context.arc(X, Y, 80, 0, 2 * Math.PI, false);
        context.stroke();
        context.beginPath();
        if (that.data.percent > 60) {
          context.setStrokeStyle("#29c8a0")
          context.setFillStyle("#29c8a0")
        } else {
          context.setStrokeStyle("#ff0000")
          context.setFillStyle("#ff0000")
        }
        context.setLineWidth(4)
        context.arc(X, Y, 60, 0, arc * Math.PI, false);
        context.stroke();
        context.setFontSize(24)
        if (p * 1 === 0) {
          if (that.data.from) {
            context.fillText('0 分', X - 20, Y + 10)
          } else {
            context.fillText('0 %', X - 20, Y + 10)
          }
        } else {
          if (that.data.from) {
            context.fillText(((p * arc / arcs) * 10000 / 100).toFixed(0) + '分', X - 20, Y + 10)
          } else {
            context.fillText(((p * arc / arcs) * 10000 / 100).toFixed(0) + '%', X - 20, Y + 10)
          }
        }
        context.draw()
        arc += 0.01
        that.setData({
          percent: ((p * arc / arcs) * 10000 / 100).toFixed(0)
        })
      }else {
        clearInterval(timer)
      }
    }, 30)
  },
})
