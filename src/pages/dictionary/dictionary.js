// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // info: {
    //   en: 'ˈdɪkʃənrɪz',
    //   us: 'ˈdɪkʃən,ɛriz'
    // },
    src: '',
    pron: [],
    lists: []
  },
  // 播放发音
  playVoice (e) {
    let url = ''
    if (e.currentTarget.dataset.type * 1 === 0) {
      url = this.data.info.pron[0]
    } else {
      url = this.data.info.pron[1]
    }
    wx.playBackgroundAudio({
      dataUrl: url
    })
  },
  // 用户输入
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 翻译
  getTran () {
    let that = this
    app.wxrequest({
      url: useUrl.cidian,
      data: {
        session_key: app.gs(),
        words: that.data.transText
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // res.data.data.pron.forEach((v, i) => {
          //   // console.log(`${i}:${v}`)
          //   wx.downloadFile({
          //     url: v,
          //     success (ress) {
          //       that.data.pron[i] = ress.tempFilePath
          //       that.setData({
          //         pron: that.data.pron
          //       })
          //     }
          //   })
          // })
          that.setData({
            info: res.data.data
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
