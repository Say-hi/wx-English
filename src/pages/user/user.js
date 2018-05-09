// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    operation: [
      {
        c: '年级',
        t: ''
      },
      {
        c: '所属机构',
        t: ''
      },
      {
        c: '作业',
        url: '../homeWork/homeWork'
      },
      // {
      //   c: '作业群',
      //   url: '../homeWorkGroup/homeWorkGroup'
      // },
      {
        c: '我的收藏',
        url: '../myCollect/myCollect'
      },
      {
        c: '测试得分排行榜',
        url: '../testRank/testRank'
      }
    ]
  },
// 获取用户信息
  getUserInfo () {
    // console.log(app.gu())
    if (app.gu()) {
      // console.log(app.gu())
      this.setData({
        userInfo: app.gu()
      })
    } else {
      app.gu(this.getUserInfo)
    }
  },
  // 获取用户信息
  getUser () {
    let that = this
    app.wxrequest({
      url: useUrl.userCenter,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.operation[0].t = res.data.data.grade_name
          that.data.operation[1].t = res.data.data.mechanism_name
          that.setData({
            // userInfos: res.data.data,
            operation: that.data.operation
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    if (!app.gs()) {
      app.setToast(this, {title: '未登录', content: '您尚未登陆，请登录后查看'})
      setTimeout(() => {
        wx.reLaunch({
          url: '../login/login'
        })
      }, 1500)
      return
    }
    this.getUser()
    this.getUserInfo()
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
