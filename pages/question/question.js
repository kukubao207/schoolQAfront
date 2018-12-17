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
    console.log('page question onLoad')
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
  tapName: function(event){
    console.log(event)
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
      that.setData({
        questionInfo: res.data.data,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  getAnswerList:function (){
    let that =this
    let url = "question/"+that.data.qid+"/answers/1/8"
    util.getData(url).then(function (res) {
      that.setData({
        answerList: res.data.data.content,
      });
      console.log(that.data.answerList);
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
        console.log(res)
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
        console.log(res)
      },
    })
  },
  getWatchStatus: function(){
    let that = this
    let openid=wx.getStorageSync("openid")
    let url = "user/"+openid+"/watched/question/"+this.data.qid
    util.getData(url).then(function(res){
      console.log(res);
      that.setData({
        isWatched:res.data.data
      })
      consolo.log(that.data.isWatched)
    })
  },
  onShow: function(){
    console.log('page question onShow')
    //第二步，加载问题详细数据questionInfo
    this.getQuestionInfo();
    //第三步，加载问题的回答列表answerList
    this.getAnswerList();
  }
})
