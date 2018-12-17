//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    answerInfo: {},
    qusetionInfo: {}
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
    }).catch(function (e) { return Promise.reject(e); });
  },
  getQuestionInfo: function (qid) {
    let that = this
    let url = "question/questionInfo/" + qid
    util.getData(url).then(function (res) {
      that.setData({
        questionInfo: res.data.data,
      });
      console.log(that.data.questionInfo)
    }).catch(function (e) { return Promise.reject(e); });
  },
  tapName: function (event) {
    console.log(event)
  },
})
