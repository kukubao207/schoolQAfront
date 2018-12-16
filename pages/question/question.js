//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    qid:'',
    questionInfo:{},
    answerList:[],
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
  },
  tapName: function(event){
    console.log(event)
  },

  getQuestionInfo: function () {
    let that = this
    let url = "question/questionInfo/" + that.data.qid
    var result = util.getData(url).then(function (res) {
      that.setData({
        questionInfo: res.data.data,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  getAnswerList:function (){
    let that =this
    let url = "question/"+that.data.qid+"/answers/1/8"
    var result = util.getData(url).then(function (res) {
      that.setData({
        answerList: res.data.data.content,
      });
      console.log(that.data.answerList);
    }).catch(function (e) { return Promise.reject(e); });
  },
  watchThisQuestion:function(){
    let qid = this.data.qid
     wx.getStorage({
      key: 'openid',
      success: function(res) {
        let openId = res.data
        let url = "user/" + openId + "/watch/question/" + qid
        console.log(url)
      },
      fail: function(res) {
        console.log(res)
      },
    })
  }
})
