//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
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
    console.log('onLoad')
    //第一步，获取questionId
    let qid=option.id
    this.setData({
      qid:option.id
    })
    console.log(qid);
    //第二步，加载问题详细数据questionInfo
    this.getQuestionInfo();
    //第三步，加载问题的回答列表answerList
    this.getAnswerList();
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  tapName: function(event){
    console.log(event)
  },

  getQuestionInfo: function () {
    let that = this
    let url = "http://"+app.globalData.productIp+":"+app.globalData.productPort+"/question/questionInfo/" + that.data.qid
    var result = util.getData(url).then(function (res) {
      that.setData({
        questionInfo: res.data.data,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  getAnswerList:function (){
    let that =this
    let url = "http://"+app.globalData.productIp+":"+app.globalData.productPort+"/question/"+that.data.qid+"/answers/1/8"
    var result = util.getData(url).then(function (res) {
      that.setData({
        answerList: res.data.data.content,
      });
      console.log(that.data.answerList);
    }).catch(function (e) { return Promise.reject(e); });
  }
  
})
