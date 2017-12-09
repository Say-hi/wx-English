// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    show: false,
    maskShow: false,
    lists: [
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '小学英语',
      //   id: 123
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '中学英语',
      //   id: 123
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '高中英语',
      //   id: 123
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '旅游英语',
      //   id: 123
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '商务英语',
      //   id: 123
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: '学术英语',
      //   id: 123
      // }
    ],
    content: ''
  },
  // 用户输入
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 速拼切换
  showSp () {
    this.setData({
      show: !this.data.show
    })
    if (this.data.show) {
      wx.setNavigationBarTitle({
        title: `速拼英语`
      })
    } else {
      wx.setNavigationBarTitle({
        title: `学科英语`
      })
    }
  },
  // 放大
  showBig () {
    this.setData({
      maskShow: true
    })
  },
  // 关闭弹窗
  close () {
    this.setData({
      maskShow: false
    })
  },
  // 获取速拼学科列表
  getLists () {
    let that = this
    app.wxrequest({
      url: useUrl.subjectenglishGradeLists,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            lists: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转读一读。。。
  goDetail (e) {
    wx.navigateTo({
      url: `../subjectDetail/subjectDetail?title=${e.currentTarget.dataset.title}&grade_id=${e.currentTarget.dataset.id}`
    })
  },
  // 翻译相关操作
  /*eslint-disable*/
  translate (e) {
    console.log(1)
    let { type } = e.currentTarget.dataset
    this.setData({
      info: [],
      eu: '',
      cn: ''
    })
    if (type === 'suPin') {
      if (/^.*[~！@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|‘’“”；：，\<。\>\/？+].*$/.test(this.data.transText)) {
        return app.setToast(this, {title: '翻译', content: '请不要输入中文符号'})
      }
      this.suPinTran(this.data.transText)
    } else if (type === 'translate') {
      // if (/^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?+].*$/.test(this.data.transText)) {
      //   return app.setToast(this, {title: '翻译', content: '请不要输入特殊符号,仅可输入空格'})
      // }
      if (/[\u4e00-\u9fa5]/i.test(this.data.transText) && /[a-zA-Z]/i.test(this.data.transText)) {
        app.setToast(this, {title: '翻译', content: '请输入全中文或全英文内容'})
      } else if (/[\u4e00-\u9fa5]/i.test(this.data.transText)) { // 全中文
        console.log(1)
        this.cnToeu(this.data.transText)
      } else if (/[a-zA-Z]/i.test(this.data.transText)) { // 全英文
        console.log(2)
        this.euTocn(this.data.transText)
      }
    } else if (type === 'read') {
      this.getAudio(this.data.transText)
    }
  },
  // 速拼翻译
  suPinTran (words) {
    let that = this
    if (/[\u4e00-\u9fa5]/.test(words)) {
      return app.setToast(that, {title: '速拼', content: '请输入英文内容'})
    }
    // if (/^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?+].*$/.test(words)) {
    //   return app.setToast(that, {title: '速拼', content: '请不要输入特殊符号,单词用空格区分'})
    // }
    app.wxrequest({
      url: useUrl.supinTrans,
      data: {
        session_key: app.gs(),
        words
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // res.data.data[0].supin_word = 'a' + res.data.data[0].supin_word.slice(1)
          res.data.data.supin_str = res.data.data.supin_str.replace(/&quot;/g, '"')
          that.setData({
            info: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 中文翻译英文
  cnToeu (words) {
    let that = this
    app.wxrequest({
      url: useUrl.baiduTransapiByZhToEn,
      data: {
        session_key: app.gs(),
        words
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            cn: res.data.data.trans_words
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 英文翻译中文
  euTocn (words) {
    let that = this
    app.wxrequest({
      url: useUrl.baiduTransapiByEnToZh,
      data: {
        session_key: app.gs(),
        words
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            eu: res.data.data.trans_words
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  /*eslint-able*/
  // 播放音乐
  playMusic (url, title) {
    wx.playBackgroundAudio({
      dataUrl: url,
      title
    })
  },
  // 获取百度语音
  getAudio (words) {
    let that = this
    app.wxrequest({
      url: useUrl.baiduSpeech,
      data: {
        session_key: app.gs(),
        words
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.playMusic(res.data.data.mp3_url, '朗读')
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
    this.getLists()
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
    this.setData({
      show: app.data.suPin
    })
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
