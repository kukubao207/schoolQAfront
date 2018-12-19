// pages/comment/comment.js 评论页
var util = require("../../utils/util.js")
Page({
  data: {
    answerid:'',
    commentList:'',
    commentContent:'',
  },
  onLoad: function (options) {
    this.setData({
      answerid:options.answerid
    })
    this.getCommentData();
  },
  //拉取评论数据
  getCommentData : function () {
    let that = this
    let url = "answer/"+this.data.answerid+"/comments"
    util.getData(url).then(function(res){
      if(res.data.code==200){
        that.setData({
          commentList:res.data.data
        })
      }else if(res.data.code==400){
      }
    })
  },
  //把用户在输入框写的评论实时记录到commentContent中
  updateComment: function (e) {
    let that = this;
    let comment = e.detail.value;
    that.setData({
      commentContent: comment
    });
  },
  //用户点击评论后触发
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