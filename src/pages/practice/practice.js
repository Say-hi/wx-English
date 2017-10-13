
/*eslint-disable*/
// const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    items:[
      { num: 1 },
      { num: 2 },
      { num: 3 },
      { num: 4 },
      { num: 5 },
      { num: 6 },
      { num: 7 },
      { num: 8 },
      { num: 9 },
      { num: 10 }
    ],
    percent: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    var percent = 60;
    this.drawPercent(percent / 100)
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
  onShareAppMessage: function () {

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
    var context = wx.createCanvasContext('firstCanvas');
    // context.fillStyle = "#ffffff";
    context.clearRect(0, 0, 375, 195);
    
    var timer = setInterval(function () {
      context.clearRect(0, 0, 375, 195);
      if(arc < arcs){
        context.beginPath();
        if (that.data.percent > 50) {
          context.setStrokeStyle("#29c8a0")
        } else {
          context.setStrokeStyle("#ff0000")
        }
        context.setLineWidth(4)
        // context.arc(187, 100, 44, 0.5 * Math.PI, arc * Math.PI, false);
        context.arc(187, 100, 44, 0, arc * Math.PI, false);
        context.stroke();
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
