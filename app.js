//app.js
App({
  onLaunch: function () {
    //小程序加载时需要检查session
    this.checkSession()
  },
  checkSession() {
    wx.checkSession({
      success: res => {
        console.log("success to session")
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: res => {
        console.log("fail to session")
        wx.navigateTo({
          url: '/pages/login/login',
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {
            console.log(res)
          },
          complete: function(res) {},
        })
      }
    })
  },
  globalData:{
    userInfo:null,
    productIp:"118.31.34.71",
    productPort:"9997",
    devIp:"localhost",
    devPort:"8102",
  }
})