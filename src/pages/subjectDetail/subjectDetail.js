// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navList: ['听一听', '说一说', '读一读', '背一背'],
    curNav: 0,
    goLeft: 0,
    memoryList: [],
    readList: [],
    talkList: [],
    listenList: [
      // {
      //   t: '听一听1',
      //   id: 123,
      //   status: 1
      // },
      // {
      //   t: '听一听2',
      //   id: 123,
      //   status: 0
      // },
      // {
      //   t: '听一听3',
      //   id: 123,
      //   status: 0
      // }
    ]
  },
  // 跳转详情
  goDetail (e) {
    // console.log(e.currentTarget.dataset.status)
    // if (e.currentTarget.dataset.status * 1 === 0) {
    if (e.currentTarget.dataset.status * 1 === 0 || !e.currentTarget.dataset.status) {
      // console.log(1)
      // 购买弹窗
      this.setData({
        needBuy: true,
        catId: e.currentTarget.dataset.id
      })
    } else {
      // todo 跳转对应详情
      // let u = this.data.curNav * 1 === 0 ? '../listenDetail/listenDetail' : this.data.curNav * 1 === 1 ? '../talkDetail/talkDetail' : this.data.curNav * 1 === 2 ? '../readDetail/readDetail' : this.data.curNav * 1 === 3 ? '../memoryDetail/memoryDetail' : ''
      wx.navigateTo({
        url: `../subjectDetailList/subjectDetailList?type=${this.data.curNav}&gradeId=${this.data.grade_id}&catId=${e.currentTarget.dataset.id}`
      })
    }
  },
  // 关闭弹窗
  maskClose () {
    this.setData({
      needBuy: false
    })
  },
  // 弹窗确认购买
  maskConfirm () {
    this.setData({
      needBuy: false
    })
    if (!app.gs()) {
      app.setToast(this, {title: '尚未登陆', content: '您需要登陆后才能购买'})
      setTimeout(() => {
        wx.reLaunch({
          url: '../login/login'
        })
      }, 1500)
      return
    }
    wx.navigateTo({
      url: `../buy/buy?gradeId=${this.data.grade_id}&id=${this.data.catId}`
    })
  },
  // 选择顶部tab栏
  chooseNav (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.curNav) return
    this.setData({
      curNav: e.currentTarget.dataset.index,
      goLeft: e.currentTarget.dataset.index * 25
    })
    this.getLists(e.currentTarget.dataset.index * 1 + 1)
  },
  // 获取顶部栏的对应数据
  getLists (type) {
    let that = this
    if ((type === 1 && this.data.listenList.length >= 1) || (type === 2 && this.data.talkList.length >= 1) || (type === 3 && this.data.readList.length >= 1) || (type === 4 && this.data.memoryList.length >= 1)) return
    app.wxrequest({
      url: useUrl.subjectenglishCategoryLists,
      data: {
        session_key: app.gs(),
        type
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          let value = res.data.data
          if (type === 1) {
            that.setData({
              listenList: value
            })
          } else if (type === 2) {
            that.setData({
              talkList: value
            })
          } else if (type === 3) {
            that.setData({
              readList: value
            })
          } else if (type === 4) {
            that.setData({
              memoryList: value
            })
          }
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    wx.setNavigationBarTitle({
      title: params.title
    })
    this.setData({
      grade_id: params.grade_id
    })
    this.getLists(1)
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
