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
  bindPersonalInfoTap: function() {
    wx.navigateTo({
      url: '../personalInfo/personalInfo'
    })
  },
  bindMyWatchPerson: function() {
    wx.navigateTo({
      url: '../myWatchPerson/myWatchPerson'
    })
  },

  bindMyWatchQuestion: function() {
    wx.navigateTo({
      url: '../myWatchQuestion/myWatchQuestion'
    })
  },

  onLoad: function () {
    let that=this
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
  },
  navigateToMyQuestion: () => {
    wx.navigateTo({
      url: '../myquestionlist/questionList',
    })
  },
  navigatetoMyAnswered() {
    wx.navigateTo({
      url: '../myanswerlist/answeredQuestionList'
    })
  }
})