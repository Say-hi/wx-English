// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    notice: '',
    curNotice: 0
    // navLists: [
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'switchTab',
    //     url: '../suPin/suPin',
    //     t: '速拼英语'
    //   },
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../hshs/hshs',
    //     t: '绘声绘色'
    //   },
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../inteTest/inteTest',
    //     t: '智能测试'
    //   }
    // ],
    // fkLists: [
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../wrong/wrong',
    //     t: '错题本'
    //   },
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../wiki/wiki',
    //     t: '英语故事听说'
    //   }
    // ],
    // ktLists: [
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'switchTab',
    //     url: '../suPin/suPin',
    //     t: '学科英语'
    //   },
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../ktVideo/ktVideo?title=错题精讲&id=2',
    //     t: '错题精讲'
    //   },
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../ktVideo/ktVideo?title=决胜考场&id=3',
    //     t: '决胜考场'
    //   }
    // ],
    // zlLists: [
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../dictionary/dictionary',
    //     t: '词典'
    //   },
    //   {
    //     src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     type: 'navigateTo',
    //     url: '../wiki/wiki',
    //     t: '文化百科'
    //   }
    // ]
  },
  // 获取首页图片
  getIndexLists () {
    let that = this
    app.wxrequest({
      url: useUrl.getIndexLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
        // ../ktVideo/ktVideo?title=学科英语&amp;cat_id=1
          if (res.data.data.ktLists) {
            for (let v of res.data.data.ktLists) {
              // console.log(v)
              v.url = v.url.replace('&amp;', '&')
            }
          }
          // console.log(res.data.data.ktLists)
          that.setData({
            navLists: res.data.data.navLists,
            fkLists: res.data.data.fkLists,
            ktLists: res.data.data.ktLists,
            zlLists: res.data.data.zlLists
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取首页轮播图
  getSwiper () {
    let that = this
    app.wxrequest({
      url: useUrl.getIndexBannale,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            imgUrls: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取首页公告
  getGonggaoLists () {
    let that = this
    app.wxrequest({
      url: useUrl.getGonggaoLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            notice: res.data.data
          })
          let i = 1
          setInterval(() => {
            if (i >= res.data.data.length) i = 0
            that.setData({
              curNotice: i
            })
            i++
          }, 5000)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 页面跳转
  jumpPage (e) {
    if (e.currentTarget.dataset.t === '速拼英语') {
      app.data.suPin = true
    } else if (e.currentTarget.dataset.t === '学科英语') {
      app.data.suPin = false
    }
    if (e.currentTarget.dataset.type === 'switchTab') {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else if (e.currentTarget.dataset.type === 'reLaunch') {
      wx.reLaunch({
        url: e.currentTarget.dataset.url
      })
    } else if (e.currentTarget.dataset.type === 'redirectTo') {
      wx.redirectTo({
        url: e.currentTarget.dataset.url
      })
    } else if (e.currentTarget.dataset.type === 'navigateTo') {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
  // 获取文化百科故事的id
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getGonggaoLists()
    this.getIndexLists()
    this.getSwiper()
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
  },
  // 触底加载更多
  onReachBottom () {

  }
})
