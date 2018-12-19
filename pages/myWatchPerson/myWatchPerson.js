// pages/myWatchPerson/myWatchPerson.js
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
    ownerId: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    var oid = wx.getStorageSync('ownerid')
    this.setData({
      ownerId: oid
    });
    this.getData();
  },
  getData: function() {
    let that = this
    let url = "user/" + that.data.ownerId + "/watchList/" + that.data.page + "/6"
    util.getData(url).then(function(res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
      });
    }).catch(function(e) {
      return Promise.reject(e);
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this
    wx.getStorageInfo({
      success: function(res) {
        let url = "user/" + res.data + "/watchList/1/6"
        util.getData(url).then(function (res) {
          that.setData({
            feed: res.data.data.content,
            feed_length: res.data.data.content.length,
          });
        });
        wx.stopPullDownRefresh()
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    let newPage = that.data.page + 1
    let url = "user/" + that.data.ownerId + "/watchList/" + newPage + "/6"
    util.getData(url).then(function (res) {
      if (res.data.code === 200) {
        if (res.data.data.content.length !== 0) {
          that.setData({
            feed: that.data.feed.concat(res.data.data.content),
            feed_length: that.data.feed_length + res.data.data.content.length,
            page: newPage
          });
        } else {
          console.log("已经没有更多的关注用户了")
        }
      }
    })
  },
})