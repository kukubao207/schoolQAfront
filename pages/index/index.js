//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    page: 1,
    feed: [],
    feed_length: 0
  },
  //跳转到问题页
  bindQueTap: function(e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id='+qid
    })
  },
  //跳转到回答页
  bindAnswerTap: function (e) {
    let aid = e.currentTarget.dataset.aid;
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../answer/answer?aid='+aid+'&qid='+qid
    })
  },
  //跳转到提问页
  bindAskTap: function(e){
    console.log(e);
    wx.navigateTo({
      url:'../writeQuestion/writeQuestion'
    })
  },
  onLoad: function () {
    this.setData({
      page:1
    })
    this.getData()
  },

  upper: function () {
    console.log("upper")
  },

  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      that.nextLoad();}, 1000);
    console.log("lower")
  },
  // //网络请求数据, 实现首页刷新
  // refresh0: function(){
  //   var index_api = '';
  //   util.getData(index_api)
  //       .then(function(data){
  //         console.log(data);
  //       });
  // },

  //使用本地 fake 数据实现刷新效果
  getData: function(){
    let that = this
    console.log(that.data.page)
    let url = "question/list/"+that.data.page+"/8"
    var result = util.getData(url).then(function (res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
        page: that.data.page
      });
      console.log(that.data.feed);
    }).catch(function (e) { return Promise.reject(e); });
  },
  onShow: function(){
    //this.getData()
  },
  nextLoad: function(){
    console.log(this.data.page)
    let newPage=this.data.page+1
    let url = 'question/list/'+newPage+'/8';
    let that = this
    util.getData(url).then(function(res){
      console.log(res)
      if(res.data.code===200){
        if(res.data.data.content.length!==0){
          that.setData({
            feed: that.data.feed.concat(res.data.data.content),
            feed_length: that.data.feed_length + res.data.data.content.length,
            page: newPage,
          });
        }else{
          console.log("已经没有更多问题了")
        }
      }else{
        wx.showToast({
          title: '抱歉，服务器忙',
        })
      }
    })
  }
})
