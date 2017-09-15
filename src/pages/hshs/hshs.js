// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curNav: 2,
    curNavP: 0,
    showLists: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'cat',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dragon',
        id: 123
      }
    ],
    cardLists: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog1',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog2',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog3',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog4',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog5',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog6',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog7',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog8',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dog9',
        id: 123
      }
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
    navList: ['语言', '语言', '语言', '语言', '语言', '语言', '语言'],
    navList2: ['语言', '语言', '语言', '语言', '语言', '语言'],
    bottomLists: [
      {
        src: '../../images/login-bg.png',
        t: 'dog',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'cat',
        id: 123
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        t: 'dragon',
        id: 123
      }
    ]
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
    this.data.showLists.unshift(this.data.cardLists[e.currentTarget.dataset.index])
    this.setData({
      showLists: this.data.showLists.splice(0, 3)
    })
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
