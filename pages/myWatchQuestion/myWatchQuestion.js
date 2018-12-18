// pages/myWatchQuestion/myWatchQuestion.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    feed: [],
    feed_length: 0,
    ownerid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page: 1
    })
    this.getData()
  },

  upper: function() {
    console.log("upper")
  },

  lower: function(e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
    console.log("lower")
  },

  getData: function() {
    let that = this
    
    var tmp = wx.getStorageSync('ownerid')
    that.setData({
      ownerid: tmp
    })
    console.log("ownerid=" + that.data.ownerid)

    let url = "user/" + that.data.ownerid + "/watchQuestionList/" + that.data.page + "/8"
    util.getData(url).then(function (res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
        page: that.data.page
      });
      console.log(that.data.feed);
    }).catch(function (e) { return Promise.reject(e); });
  },

  bindQueTap: function (e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id=' + qid
    })
  },

  nextLoad: function () {
    let that = this

    console.log(that.data.page)
    let newPage = that.data.page + 1
    let url = "user/" + that.data.ownerid + "/watchQuestionList/" + newPage + "/8"
    util.getData(url).then(function (res) {
      console.log(res)
      if (res.data.code === 200) {
        if (res.data.data.content.length !== 0) {
          that.setData({
            feed: that.data.feed.concat(res.data.data.content),
            feed_length: that.data.feed_length + res.data.data.content.length,
            page: newPage,
          });
        } else {
          console.log("已经没有更多的关注问题了")
        }
      } else {
        wx.showToast({
          title: '抱歉，服务器忙',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})