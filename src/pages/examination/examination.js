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
    timuArr: [
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
    finishArr: []
  },
  // 获取对应题型题目列表
  getList (catId, typeId) {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentQuestionLists,
      data: {
        session_key: app.gs(),
        cat_id: catId,
        type_id: typeId
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            finishArr: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转对应题目
  goTimu (e) {
    wx.redirectTo({
      url: `${this.data.timuArr[this.data.typeId]}?id=${e.currentTarget.dataset.id}`
    })
  },
  // 跳转详情
  goDetail () {
    for (let v of this.data.finishArr) {
      if (v.is_do * 1 !== 1) {
        return app.setToast(this, {content: '您还有题目未完成，无法提交'})
      }
    }
    wx.redirectTo({
      url: '../practice/practice'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let {catId, typeId} = wx.getStorageSync('testId')
    this.setData({
      catId,
      typeId
    })
    wx.setNavigationBarTitle({
      title: `${this.data.urlArr[typeId]}`
    })
    this.setData({
      title: this.data.urlArr[typeId]
    })
    this.getList(catId, typeId)
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
