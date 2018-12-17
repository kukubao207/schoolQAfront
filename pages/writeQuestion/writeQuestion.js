// pages/writeQuestion/writeQuestion.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    title: "",
    content: "",
    ownerId: ""
  },
  onLoad: function(options) {
    let ownerid = wx.getStorageSync('ownerid')
    this.setData({
      ownerId: ownerid
    })
  },

  updateTitle: function(e) {
    let that = this;
    let title = e.detail.value
    that.setData({
      title: title
    });
  },

  updateDescription: function(e) {
    let that = this;
    let description = e.detail.value;
    that.setData({
      content: description
    });
  },

  submitNewQuestion() {
    let data = this.data;
    util.postData("question/save", data).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        wx.showToast({
          title: '发布问题成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(
          function() {
            wx.navigateBack({})
          }, 1200
        )
      } else if (res.data.code !== 201) {
        wx.showToast({
          title: '发布失败，请稍后再试',
          icon: 'fail',
          duration: 2000
        })
      }
    }).catch(function(e) {
      return Promise.reject(e);
    });
  }
})