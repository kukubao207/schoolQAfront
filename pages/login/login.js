var app=getApp()
Page({
  data: {
    icon_url:"../../images/ICON.png",
    userInfo:{}
  },
  checkSession(e) {
    wx.checkSession({
      success: res => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: res => {
      }
    })
  },
  login(e) {
    console.log(e)
    wx.login({
      success: res => {
        wx.request({
          url: "https://"+app.globalData.productIp+'/user/login',
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          data: {
            code: res.code,
            userInfo: e.detail.userInfo
          },
          success: res => {
            wx.setStorage({
              key: 'openid',
              data: res.data.data.openid,
            })
            wx.setStorage({
              key: 'ownerid',
              data: res.data.data.id,
            })
            // wx.setStorageSync('openid', res.data.data.openid)
            // wx.setStorageSync('ownerid', res.data.data.id)
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
