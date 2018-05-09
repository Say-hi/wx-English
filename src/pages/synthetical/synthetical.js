// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    urlArr: [
      '',
      '听力选择题', // 1.听力选择题
      '中英互译题', // 2.中英互译题
      '连线匹配题', //  3.连线匹配题
      '听写题', // 4.听写题
      '看图写词', // 5.看图写词
      '完形填空', // 6.完形填空
      '阅读理解', // 7.阅读理解
      '语法填空', // 8.语法填空
      '阅读理解七选五' // 9.阅读理解七选五
    ],
    typeArr: [
      '',
      '../answerListen/answerListen', // 1.听力选择题
      '../answerTranslate/answerTranslate', // 2.中英互译题
      '../answerMatch/answerMatch', //  3.连线匹配题
      '../answerWrite/answerWrite', // 4.听写题
      '../answerPicture/answerPicture', // 5.看图写词
      '../answerCloze/answerCloze', // 6.完形填空
      '../answerReading/answerReading', // 7.阅读理解
      '../answerRational/answerRational', // 8.语法填空
      '../answer75/answer75' // 9.阅读理解七选五
    ],
    page: 1,
    syntheticalList: []
  },
  // 获取组卷列表
  getList (page) {
    let that = this
    app.wxrequest({
      url: useUrl.getIntelligentTestpaperLists,
      data: {
        session_key: app.gs(),
        page: page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            syntheticalList: that.data.syntheticalList.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转答题卡
  goNext (e) {
    wx.setStorageSync('zjId', e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.type)
    console.log(this.data.typeArr[e.currentTarget.dataset.type])
    let url = `${this.data.typeArr[e.currentTarget.dataset.type]}?timu_id=${e.currentTarget.dataset.timu}&id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&from=zj&type=${e.currentTarget.dataset.type}`
    wx.redirectTo({
      url
    })
  },
  // 跳转结果
  goResult (e) {
    wx.navigateTo({
      url: `../practice/practice?id=${e.currentTarget.dataset.id}&from=zj`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getList(1)
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
  onShareAppMessage () {
    return {
      title: '您的好友向您分享了精彩内容，快来看一看吧',
      path: '/pages/login/login'
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },
  onReachBottom () {
    if (this.data.more) {
      this.getList(++this.data.page)
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
