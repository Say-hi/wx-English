// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    operation: [
      {
        c: '年级',
        t: '一年级'
      },
      {
        c: '所属机构',
        t: 'xx培训机构'
      },
      {
        c: '作业'
      },
      {
        c: '作业群'
      },
      {
        c: '我的收藏'
      },
      {
        c: '测试得分排行榜'
      }
    ]
  },
// 获取用户信息
  getUserInfo () {
    if (app.gu()) {
      this.setData({
        userInfo: app.gu()
      })
    } else {
      app.gu(this.getUserInfo)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
