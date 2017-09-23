// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['小学', '初中', '高中', '大学'],
    array2: ['xxx机构1', 'xxx机构2', 'xxx机构3', 'xxx机构4'],
    showText: '获取验证码'
  },
  // 用户输入
  inputValue (e) {
    // let that = this
    app.inputValue(e, this)
  },
  // 获取验证码
  getNumber () {
    this.setData({
      numberDisabled: true
    })
    let time = 60
    let that = this
    let timer = setInterval( () => {
      if (time <= 0) {
        clearInterval(timer)
        that.setData({
          numberDisabled: false,
          showText: '重新获取验证码'
        })
        return
      }
      that.setData({
        showText: --time + 's'
      })
    }, 1000)
    // todo
  },
  // picker 选择切换
  bindPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.currentTarget.dataset.type === 'a1') {
      this.setData({
        index: e.detail.value
      })
    } else {
      this.setData({
        index2: e.detail.value
      })
    }
  },
  // 下一步
  goNext () {
    let { name, mobile, pwd, pwd2, code } = this.data
    if (pwd !== pwd2) {
      return wx.showToast({
        image: '../../images/jiong.png',
        title: '两次输入的密码不一致'
      })
    }
    if ((!name || name.length == 0 ) && (!mobile  || mobile.length != 11) && (!pwd || pwd.length == 0) && !code || (code.length == 0) ) {
      return wx.showToast({
        image: '../../images/jiong.png',
        title: '请补全信息'
      })
    }
    app.wxrequest({
      url: useUrl.login,
      data: {
        name,
        mobile,
        pwd,
        code
      },
      success (res) {
        wx.hideLoading()
        if(res.data.code === 200) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            image: '../../images/jiong.png',
            title: res.data.message
          })
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
