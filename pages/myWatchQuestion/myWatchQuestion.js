// pages/myWatchQuestion/myWatchQuestion.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    page: 1,
    feed: [],
    feed_length: 0,
    ownerid: 0
  },
  onLoad: function (options) {
    this.setData({
      page: 1
    })
    this.getData()
  },
  getData: function() {
    let that = this
    var tmp = wx.getStorageSync('ownerid')
    that.setData({
      ownerid: tmp
    })
    let url = "user/" + that.data.ownerid + "/watchQuestionList/" + that.data.page + "/1000"
    util.getData(url).then(function (res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
        page: that.data.page
      });
    }).catch(function (e) { return Promise.reject(e); });
  },
  bindQueTap: function (e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id=' + qid
    })
  },
})