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
    lists: [
      {
        en: 'what fuck a nice day, but i\'m still in work, I watn go out and play with friend',
        cn: '阿斯利康的发生的减肥拉斯'
      },
      {
        en: 'aksdhfiasdhfoisadhf',
        cn: '阿斯利康的发生的减肥拉斯'
      },
      {
        en: 'aksdhfiasdhfoisadhf',
        cn: '阿斯利康的发生的减肥拉斯'
      },
      {
        en: 'aksdhfiasdhfoisadhf',
        cn: '阿斯利康的发生的减肥拉斯'
      }
    ]
  },
  // 播放音乐
  // playMusic (url) {
  //   myAudio.setSrc(url)
  //   myAudio.play()
  //   // wx.playVoice({
  //   //   filePath: url
  //   // })
  //   // wx.playBackgroundAudio({
  //   //   dataUrl: url,
  //   //   title
  //   // })
  // },
  // 播放发音
  playVoice (e) {
    console.log(this.data.pron)
    // if (e.currentTarget.dataset.type * 1 === 0) {
    //   let audioContext = wx.createAudioContext('myAudio')
    //   audioContext.setSrc(this.data.info.pron[0])
    //   audioContext.play()
    // } else {
    //   let audioContext2 = wx.createAudioContext('myAudio2')
    //   audioContext2.setSrc(this.data.info.pron[1])
    //   audioContext2.play()
    // }
    let that = this
    // console.log(that.data.pron)
    // console.log(that.data.pron[e.currentTarget.dataset.type])
    wx.playVoice({
      filePath: that.data.pron[e.currentTarget.dataset.type]
    })
    // console.log(this.data.info.pron[e.currentTarget.dataset.type])

    // this.playMusic()
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
          res.data.data.pron.forEach((v, i) => {
            console.log(`${i}:${v}`)
            wx.downloadFile({
              url: v,
              success (ress) {
                that.data.pron[i] = ress.tempFilePath
                that.setData({
                  pron: that.data.pron
                })
              }
            })
          })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
