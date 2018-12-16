//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    page: 1,
    feed: [],
    feed_length: 0
  },
  //事件处理函数
  bindItemTap: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function(e) {
    console.log(e)
    let qid = e.currentTarget.dataset.qid;
    app.requestDetailId = qid
    console.log(qid)
    wx.navigateTo({
      url: '../question/question?id='+qid
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
  },

  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },

  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },


  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  getData: function(){
    let that = this
    console.log(that.data.page)
    let url = "http://localhost:8102/question/list/"+that.data.page+"/8"
    var result = util.getData(url).then(function (res) {
      console.log("------------");
      console.log(res.data.data.content);
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length
      });
      console.log(that.data.feed);
    }).catch(function (e) { return Promise.reject(e); });
  },

  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getData();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  }
})
