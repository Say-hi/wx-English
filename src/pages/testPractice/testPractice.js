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
    lists: []
  },
  // 获取用户题目列表
  getList (id) {
    let that = this
    app.wxrequest({
      url: useUrl.intelligentQuestionTypesLists,
      data: {
        session_key: app.gs(),
        cat_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // console.log(res)
          that.setData({
            lists: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转题目
  goTimu (e) {
    let that = this
    wx.setStorageSync('testId', {typeId: e.currentTarget.dataset.type, catId: that.data.catId})
    wx.redirectTo({
      url: `../examination/examination`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    wx.setNavigationBarTitle({
      title: `${params.title}`
    })
    this.setData({
      catId: params.id
    })
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
