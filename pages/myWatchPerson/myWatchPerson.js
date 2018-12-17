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
  onLoad: function (options) {
    let that = this

    var oid = wx.getStorageSync('ownerid')
    this.setData({
      ownerId: oid
    });
    console.log(that.data.ownerId)
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getData: function() {
    let that = this
    console.log("page=" + that.data.page)
    let url = "user/" + that.data.ownerId + "/watchList/" + that.data.page + "/8"
    // let url = that.data.ownerId + "/watchList/" + that.data.page + "/8"
    var tmp = util.getData(url).then(function(res) {
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length
      });
      console.log(that.data.feed)
      console.log(that.data.feed_length)
    }).catch (function(e) { return Promise.reject(e); });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
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