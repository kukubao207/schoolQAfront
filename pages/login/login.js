var app=getApp()
var util = require("../../utils/util.js")

Page({
  data: {
    icon_url:"../../images/ICON.png",
    userInfo:{}
  },
  checkSession(e) {
    console.log("check session")
    wx.checkSession({
      success: res => {
        wx.login({
          success: res =>{
            console.log(res)
            let jsonData = {
              code: res.code,
            }
            let url = "user/open";
            util.postData(url,jsonData).then(res => {
              console.log(res)
              wx.setStorage({
                key: 'openid',
                data: res.data.data.openid,
              })
              wx.setStorage({
                key: 'ownerid',
                data: res.data.data.id,
              })
            })
          }
        })
        console.log('before switch to index')
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
        let jsonData={
          'code':res.code,
          'userInfo': e.detail.userInfo
        }
        let url = "user/login"
        util.postData(url,jsonData).then(res=>{
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
        })
      }
    })
  },
  onLoad: function (options) {
    this.checkSession()
  },
})
