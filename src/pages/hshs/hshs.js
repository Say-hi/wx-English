// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hbCurrent: 0,
    curNav: 1,
    curNavP: 0,
    page: 1,
    cikaid: '',
    showLists: [
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'cat',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dragon',
      //   id: 123
      // }
    ],
    cardLists: [
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog1',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog2',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog3',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog4',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog5',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog6',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog7',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog8',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dog9',
      //   id: 123
      // }
    ],
    navListOne: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '动物',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '食物',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '工具',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '身体',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '衣服',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '交通工具',
        id: 123
      }
    ],
    navListTwo: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '工具',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '工具',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '工具',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '工具',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '工具',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: '交通工具',
        id: 123
      }
    ],
    recommend: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    navList: ['年龄', '主题'],
    bottomLists: [
      // {
      //   src: '../../images/login-bg.png',
      //   t: 'dog',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'cat',
      //   id: 123
      // },
      // {
      //   src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   t: 'dragon',
      //   id: 123
      // }
    ]
  },
  // 播放音乐
  playMusic (url, title) {
    wx.playBackgroundAudio({
      dataUrl: url,
      title
    })
  },
  // 绘本分类选择
  hbChoose (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.hbCurrent * 1) return
    this.setData({
      hbCurrent: e.currentTarget.dataset.index
    })
    this.getHbLists(e.currentTarget.dataset.index + 1)
  },
  // 获取百度语音
  getAudio (e, words) {
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
          // this.setData({
          //   showLists: this.data.showLists.splice(0, 3)
          // })
          that.data.cardLists[e.currentTarget.dataset.index]['mp3'] = res.data.data.mp3_url
          that.data.showLists.unshift(that.data.cardLists[e.currentTarget.dataset.index])
          that.setData({
            showLists: that.data.showLists.splice(0, 3)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 播放语音
  playAudio () {
    if (this.data.showLists.length * 1 === 0 || !this.data.showLists[this.data.curNavP].mp3) return
    this.playMusic(this.data.showLists[this.data.curNavP].mp3, '单词朗读')
  },
  // 获取绘本列表
  getHbLists (type) {
    let that = this
    app.wxrequest({
      url: useUrl.huibenCategoryLists,
      data: {
        type: type
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            bottomLists: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 词卡页切换内容
  changeInfo (e) {
    this.data.page = 1
    this.data.cardLists = []
    this.data.cikaid = e.currentTarget.dataset.id
    this.changeInfos(e, 1)
  },
  changeInfos (e, page) {
    let that = this
    app.wxrequest({
      url: useUrl.cikaLists,
      data: {
        cat_id: e.currentTarget.dataset.id,
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          that.setData({
            cardLists: that.data.cardLists.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 搜索框点击
  onIn () {
    this.setData({
      onIn: true
    })
  },
  // 删除当前的选择项
  delShowItem () {
    this.data.showLists.splice(this.data.curNavP, 1)
    this.setData({
      showLists: this.data.showLists,
      curNavP: 0
    })
  },
  // 添加到展示列表
  addToShow (e) {
    this.getAudio(e, this.data.cardLists[e.currentTarget.dataset.index].word)
  },
  // 选择标题
  chooseNav (e) {
    this.setData({
      curNav: e.currentTarget.dataset.index
    })
  },
  // 选择项目
  chooseNavP (e) {
    this.setData({
      curNavP: e.currentTarget.dataset.index
    })
  },
  // 获取词卡分类
  getCikaLists () {
    let that = this
    app.wxrequest({
      url: useUrl.cikaCategoryLists,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            cikaid: res.data.data[0].cat_id || 0,
            navListOne: res.data.data.slice(0, 6),
            navListTwo: res.data.data.slice(6)
          })
          let e = {
            currentTarget: {
              dataset: {
                id: res.data.data[0].cat_id
              }
            }
          }
          that.changeInfos(e, 1)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 一周绘本推荐
  getWeekHb () {
    let that = this
    app.wxrequest({
      url: useUrl.weekRecommendByHuiben,
      success (res) {
        if (res.data.code === 200) {
          that.setData({
            recommend: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 绘本详情
  goHBdetail (e) {
    app.goHBdetail(e)
    // wx.navigateTo({
    //   url: `../hbDetail/hbDetail?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
    // })
  },
  // 绘本列表专题
  goHBListDetail (e) {
    if (this.data.hbCurrent * 1 === 0) {
      wx.navigateTo({
        url: `../hbListsD/hbListsD?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
      })
    } else {
      wx.navigateTo({
        url: `../hbLists/hbLists?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCikaLists()
    this.getWeekHb()
    this.getHbLists(1)
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
  onReachBottom () {
    if (this.data.more) {
      let that = this
      let e = {
        currentTarget: {
          dataset: {
            id: that.data.cikaid
          }
        }
      }
      // e['currentTarget']['dataset']['id'] = this.data.cikaid
      console.log(e)
      this.changeInfos(e, ++this.data.page)
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
