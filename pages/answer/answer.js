//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    answerInfo: {},
    qusetionInfo: {},
    isWatched: false,
  },
  
  onLoad: function (option) {
    console.log('onLoad')
    console.log(option)
    this.getQuestionInfo(option.qid)
    this.getAnswerInfo(option.aid)
  },
  getAnswerInfo: function(aid) {
    let that = this
    let url = "answer/" + aid
    util.getData(url).then(function (res) {
      that.setData({
        answerInfo: res.data.data,
      });
      console.log(that.data.answerInfo)
      let openid = wx.getStorageSync("openid")
      let url = "user/" + openid + "/watched/user/" +res.data.data.ownerId
      console.log(url)
      util.getData(url).then(function (res) {
        that.setData({
          isWatched: res.data.data,
        })
        console.log(that.data.isWatched)
      })
    }).catch(function (e) { return Promise.reject(e); });
  },
  getQuestionInfo: function (qid) {
    let that = this
    let url = "question/questionInfo/" + qid
    util.getData(url).then(function (res) {
      that.setData({
        questionInfo: res.data.data,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  watchUser: function (e) {
    console.log(e)
    let that = this
    let openid = wx.getStorageSync("openid")
    let url = "/user/" + openid + "/watch/user/" + e.currentTarget.dataset.ownerid
    util.postData(url,{}).then(function(res){
      console.log(res)
      if(res.data.data.code===200){
        that.setData({
          isWatched:true
        })
      }else if(res.data.data.code===201){
        wx.showToast({
          title: '已经关注过啦',
        })
      }
    })
  },
  unWatchUser: function (e) {
    console.log(e)
    let that = this
    let openid = wx.getStorageSync("openid")
    let url = "/user/" + openid + "/unwatch/user/" + e.currentTarget.dataset.ownerid
    util.postData(url, {}).then(function (res) {
      console.log(res)
      if (res.data.data.code === 200) {
        that.setData({
          isWatched: false
        })
      } else if(res.data.data.code===201) {
        wx.showToast({
          title: '已经取关注过啦',
        })
      }
    })
  },

})
