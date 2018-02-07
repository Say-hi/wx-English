// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    number: '215464132'
  },
  getData () {
    let that = this
    app.wxrequest({
      url: useUrl.buySubjectenglishPage,
      data: {
        session_key: app.gs(),
        sg_id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  pay () {
    let that = this
    app.wxrequest({
      url: useUrl.buySubjectenglish,
      data: {
        session_key: app.gs(),
        sg_id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 402) {
          let obj = {
            success (res) {
              wx.showToast({
                title: '购买成功'
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          }
          Object.assign(obj, res.data.data)
          app.wxpay(obj)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  getRandom () {
    let number = ''
    for (let i = 0; i < 10; i++) {
      number += Math.floor((Math.random() * 10))
    }
    this.setData({
      number
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      id: options.gradeId
    })
    this.getData()
    this.getRandom()
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
