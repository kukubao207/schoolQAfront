//answer.js 回答详情页
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    answerInfo: {},
    qusetionInfo: {},
    isWatched: false,
  },
  onLoad: function (option) {
    this.getQuestionInfo(option.qid)
    this.getAnswerInfo(option.aid)
  },
  //拉取回答数据 和 当前用户是否关注这个答主的数据
  getAnswerInfo: function(aid) {
    let that = this
    let url = "answer/" + aid
    util.getData(url).then(function (res) {
      that.setData({
        answerInfo: res.data.data,
      });
      let openid = wx.getStorageSync("openid")
      let url = "user/" + openid + "/watched/user/" +res.data.data.ownerId
      util.getData(url).then(function (res) {
        that.setData({
          isWatched: res.data.data,
        })
      })
    }).catch(function (e) { return Promise.reject(e); });
  },
  //拉取问题数据
  getQuestionInfo: function (qid) {
    let that = this
    let url = "question/questionInfo/" + qid
    util.getData(url).then(function (res) {
      that.setData({
        questionInfo: res.data.data,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  //关注答主
  watchUser: function (e) {
    let that = this
    let openid = wx.getStorageSync("openid")
    let url = "/user/" + openid + "/watch/user/" + e.currentTarget.dataset.ownerid
    util.postData(url,{}).then(function(res){
      that.setData({
        isWatched:true
      })
      if(res.data.code===201){
        wx.showToast({
          title: '已经关注过啦',
        })
      }
    })
  },
  //取关答主
  unWatchUser: function (e) {
    let that = this
    let openid = wx.getStorageSync("openid")
    let url = "/user/" + openid + "/unwatch/user/" + e.currentTarget.dataset.ownerid
    util.postData(url, {}).then(function (res) {
      if(res.data.code===201) {
        wx.showToast({
          title: '已经取关注过啦',
        })
      }
      that.setData({
        isWatched: false
      })
    })
  },
  //跳转到该回答的评论页
  comment: function(e) {
    let answerid = e.currentTarget.dataset.answerid;
    let url = "/pages/comment/comment?answerid="+answerid;
    wx.navigateTo({
      url: url,
    })
  },
  //从评论页返回时重新拉取最新
  onShow: function(){
    this.getQuestionInfo(this.data.questionInfo.id)
    this.getAnswerInfo(this.data.answerInfo.id)
  }
})
