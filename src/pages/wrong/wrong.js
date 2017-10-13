// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    wrongList: [
      {
        problem: 'abcdefghijklmnopqrstuvwxyz',
        choose: [
          {
            t: 'asdfasdf',
            s: false
          },
          {
            t: 'asdfasdf',
            s: false
          },
          {
            t: 'asdfasdf',
            s: false
          },
          {
            t: 'asdfasdf',
            s: true
          }
        ],
        level: '初级',
        time: '2017/08/07'
      },
      {
        problem: '5446498465445646546546541654654',
        choose: [
          {
            t: 'asdfasdf',
            s: true
          },
          {
            t: 'asdfasdf',
            s: false
          },
          {
            t: 'asdfasdf',
            s: false
          },
          {
            t: 'asdfasdf',
            s: false
          }
        ],
        level: '中级',
        time: '2017/08/07'
      }
    ]
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
