//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    qid:'',
    questionInfo:{},
    answerList:[],
    isWatched:false,
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  onLoad: function (option) {
    //第一步，获取questionId
    this.setData({
      qid:option.id
    })
    //第二步，加载问题详细数据questionInfo
    this.getQuestionInfo();
    //第三步，加载问题的回答列表answerList
    this.getAnswerList();
    //第四步，加载是否已关注该问题
    this.getWatchStatus();
  },
  writeAnswer:function(){
    let qid = this.data.qid;
    wx.navigateTo({
      url: '/pages/writeAnswer/writeAnswer?qid='+qid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getQuestionInfo: function () {
    let that = this
    let url = "question/questionInfo/" + that.data.qid
    util.getData(url).then(function (res) {
      console.log(res)
      that.setData({
        questionInfo: res.data.data,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  getAnswerList:function (){
    let that =this
    let url = "question/"+that.data.qid+"/answers/1/100"
    util.getData(url).then(function (res) {
      that.setData({
        answerList: res.data.data.content,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  watchThisQuestion:function(){
    let qid = this.data.qid
    let that = this
     wx.getStorage({
      key: 'openid',
      success: function(res) {
        let openId = res.data
        let url = "user/" + openId + "/watch/question/" + qid
        let data={}
        util.postData(url,data).then(function(res){
          if(res.data.code===200){
            wx.showToast({
              title: '关注成功',
              icon: 'success',
              duration: 2000
            })
          }else if(res.data.code===201){
            wx.showToast({
              title: '已经关注过啦',
              icon: 'success',
              duration: 2000
            })
          }
          that.setData({
            isWatched:true
          })
        })
      },
      fail: function(res) {
      },
    })
  },
  unWatchThisQuestion: function () {
    let qid = this.data.qid
    let that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        let openId = res.data
        let url = "user/" + openId + "/unwatch/question/" + qid
        util.postData(url, {}).then(function (res) {
          if (res.data.code === 200) {
            wx.showToast({
              title: '取关成功',
              icon: 'success',
              duration: 2000
            })
          } else if (res.data.code === 201) {
            wx.showToast({
              title: '已经取关过啦',
              icon: 'success',
              duration: 2000
            })
          }
          that.setData({
            isWatched: false
          })
        })
      },
      fail: function (res) {
      },
    })
  },
  getWatchStatus: function(){
    let that = this
    let openid=wx.getStorageSync("openid")
    let url = "user/"+openid+"/watched/question/"+this.data.qid
    util.getData(url).then(function(res){
      that.setData({
        isWatched:res.data.data
      })
    })
  },
  onShow: function(){
    //第二步，加载问题详细数据questionInfo
    this.getQuestionInfo();
    //第三步，加载问题的回答列表answerList
    this.getAnswerList();
  },

  tapAnswer: function(e){
    let that = this
    let aid = e.currentTarget.dataset.aid;
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../answer/answer?aid=' + aid + '&qid=' + qid
    })
  },
  onPullDownRefresh: function(e){
    //第二步，加载问题详细数据questionInfo
    this.getQuestionInfo();
    //第三步，加载问题的回答列表answerList
    this.getAnswerList();
    wx.stopPullDownRefresh();
  }
})
