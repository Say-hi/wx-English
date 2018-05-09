// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
let videoContext = wx.createVideoContext('myVideo')
let height = wx.getSystemInfoSync().windowHeight
let width = wx.getSystemInfoSync().windowWidth
// const wxParse = require('../../wxParse/wxParse')
// let seek = -1
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    objectFit: 'fill',
    videoContentList: [
      {
        en: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f020169040http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f020169040',
        cn: '阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近',
        time: 0
      },
      {
        en: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f020169040http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f020169040',
        cn: '阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近阿拉斯加大幅拉升近',
        time: 50
      }
    ]
  },
  // 视频控制
  videoControl (e) {
    console.log(e.currentTarget.dataset.type)
  },
  // 视频进度控制
  goTime (e) {
    // console.log(videoContext)
    videoContext.seek(e.currentTarget.dataset.time)
  },
  // 获取数据
  getList (id) {
    let that = this
    app.wxrequest({
      url: useUrl.subjectenglishDetailByShuo,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.WP('article', 'html', res.data.data.content, that, 5)
          // app.data.wxParse.wxParse('article', 'html', res.data.data.content, that, 5)
          that.setData({
            info: res.data.data,
            src: res.data.data.video_url
          })
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
    // let that = this
    this.setData({
      videoHeight: width * 250 / 375,
      bHeight: height - (width * 250 / 375)
    })
    // console.log('width', width)
    // console.log('height', height)
    // console.log('videoHeight', width * 250 / 375)
    // wx.createSelectorQuery().select('#v-w').fields({
    //   size: true
    // }, function (res) {
    //   // console.log('wsdf',res.height)
    //   that.setData({
    //     bHeight: height - res.height
    //   })
    // }).exec()
    this.getList(params.id)
    // this.getList(10)
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
  },
  onShareAppMessage () {
    return {
      title: '您的好友向您分享了精彩内容，快来看一看吧',
      path: '/pages/login/login'
    }
  }
})
