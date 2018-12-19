//index.js 主页
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    page: 1,
    feed: [],
    feed_length: 0,
    search_content:'',
    search_status: 0,
  },
  onLoad: function () {
    this.getData()
  },
  //跳转到问题页
  bindQueTap: function(e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id='+qid
    })
  },
  //跳转到提问页
  bindAskTap: function(e){
    wx.navigateTo({
      url:'../writeQuestion/writeQuestion'
    })
  },
  //刷新数据
  getData: function(){
    let that = this
    let url = "question/list/"+that.data.page+"/8"
    var result = util.getData(url).then(function (res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  //顶部下拉获取最新数据
  onPullDownRefresh: function(){
    let that = this
    let url = "question/list/1/8"
    var result = util.getData(url).then(function (res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
        page: 1,
        search_status: 0 
      });
      wx.stopPullDownRefresh()
    });
  },
  //滑动到底时，加载下一页的数据
  onReachBottom: function(){
    if(this.data.search_status==0){
    var that = this;
    var pagenum = this.data.page + 1; //获取当前页数并+1
    let url = 'question/list/' + pagenum + '/8';
    util.getData(url).then(function (res) {
      if (res.data.code === 200) {
        if (res.data.data.content.length !== 0) {
          that.setData({
            feed: that.data.feed.concat(res.data.data.content),
            feed_length: that.data.feed_length + res.data.data.content.length,
            page: pagenum,
          });
        } else {
          console.log("已经没有更多问题了")
        }
      }
    })
    }
  },
  search:function(e){
    let that = this
    let url = "question/search/1/1000"
    let jsonData = { "content": e.detail.value}
    util.postData(url,jsonData).then(res=>{
      console.log(res)
      that.setData({
        feed:res.data.data.content,
        search_status:1
      })
    })
  }
})
