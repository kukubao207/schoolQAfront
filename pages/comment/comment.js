// pages/comment/comment.js
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    answerid:'',
    commentList:'',
    commentContent:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      answerid:options.answerid
    })
    this.getCommentData();
  },

  getCommentData : function () {
    let that = this
    let url = "answer/"+this.data.answerid+"/comments"
    util.getData(url).then(function(res){
      console.log(res)
      if(res.data.code==200){
        that.setData({
          commentList:res.data.data
        })
      }else if(res.data.code==400){
        console.log('对于这个问题当前没有任何评论')
      }
    })
  },
  updateComment: function (e) {
    let that = this;
    let comment = e.detail.value;
    that.setData({
      commentContent: comment
    });
  },
  comment: function(e) {
    let that = this;
    let url = "comment/save";
    let ownerid = wx.getStorageSync("ownerid")
    let jsonData = {
      'commentContent':this.data.commentContent,
      'ownerId':ownerid,
      'answerId':this.data.answerid,
      'anoymous':0
    }
    util.postData(url,jsonData).then(function(res){
      console.log(res);
      wx.showToast({
        title: '评论成功',
      })
      that.getCommentData();
      that.setData({
        commentContent: ''
      })
    })
  }
})