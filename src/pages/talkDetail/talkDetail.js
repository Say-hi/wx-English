// 获取全局应用程序实例对象
// const app = getApp()
let videoContext = wx.createVideoContext('myVideo')
// let seek = -1
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
  }
})
