var app=getApp()
Page({
  data: {
    icon_url:"../../images/icon9.jpeg",
    userInfo:{}
  },
  checkSession(e) {
    wx.checkSession({
      success: res => {
        console.log("success to session")
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: res => {
      }
    })
  },
  login(e) {
    wx.login({
      success: res => {
        wx.request({
          url: "http://"+app.globalData.productIp+":"+app.globalData.productPort + '/user/login',
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          data: {
            code: res.code,
            userInfo: e.detail.userInfo
          },
          success: res => {
            console.log(res.data)
            wx.setStorageSync('openid', res.data.data.openid)
            wx.setStorageSync('ownerid', res.data.data.id)
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkSession()
  },
})
