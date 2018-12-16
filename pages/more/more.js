//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    ifGetUserInfo:true,
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../more/more'
    })
  },
  onLoad: function () {
    let that=this
    console.log('onLoadMore')
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo,
                ifGetUserInfo: false
              })
            }
          })
        }
      }
    })
  },
  loginTap: function () {
    wx.navigateTo({
      url: '../more/more'
    })

    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
      // that.setData({
      //   userInfo: userInfo
      // })
    // })
  }
})