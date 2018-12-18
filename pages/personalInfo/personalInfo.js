// pages/personalInfo/personalInfo.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    curWord : 0,
    maxWord : 50,
    ownerId: 0,
    individual: '',
    openId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var oid = wx.getStorageSync('ownerid')
    var oid2 = wx.getStorageSync('openid')
    
    this.setData({
      ownerId: oid,
      openId: oid2
    });

    this.getUser();
  },

  modify: function (e) {

    console.log("individual=" + this.data.individual)
    let jsonData = {
      'individual': this.data.individual
    };

    let url = 'user/individual/' + this.data.openId
    util.postData(url, jsonData).then(function (res) {
      console.log("res=" + res)
      if (res.data.code === 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(
          function () {
          }, 1200
        )
      } else if (res.data.code !== 201) {
        wx.showToast({
          title: '修改失败，请稍后再试',
          icon: 'fail',
          duration: 2000
        })
      }
    }).catch(function (e) { return Promise.reject(e); });
  },

  getUser: function() {
    let that = this
    let url = "user/info/" + that.data.ownerId
    
    var user = util.getData(url).then(function(res){
      that.setData({
        userInfo: res.data.data
      });
    }).catch(function (e) { return Promise.reject(e); });
  },

  bindTextAreaBlur: function (e) {
    this.setData({
      individual: e.detail.value,
    })
  },

  limit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    if(length > this.data.maxWord) {
      return;
    }
    this.setData({
      curWord: length,
      individual: e.detail.value
    });
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
    this.getUser()
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