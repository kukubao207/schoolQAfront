//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["动态列表", "关注列表"],
    currentNavtab: "0",
    moments: [],
    moment_page: 1,
    moment_page_size: 6,
    follows: [],
    follow_page: 1,
    follow_page_size: 6,
    ownerId: '',
  },
  onLoad: function() {
    let ownerid = wx.getStorageSync('ownerid')
    this.setData({
      ownerId: ownerid,
      moments: [],
      moment_page: 1,
      follows: [],
      follow_page: 1
    });
    this.getMoments(1, 6);
    this.getFollows(1, 6);
  },

  getFollows: function(page, page_size) {
    let that = this;
    let ownerid = wx.getStorageSync('ownerid');
    util.getData('answer/' + ownerid + '/watchUserAnswerList/' + page + '/' + page_size).then(res => {
      if (res.data.code === 200) {
        that.setData({
          follows: that.data.follows.concat(res.data.data.content),
          follow_page: page + 1,
        })
      } else if (res.data.code !== 201) {
        wx.showToast({
          title: '获取数据失败！',
          icon: 'fail',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络请求失败!',
        icon: 'fail',
        duration: 2000
      })
    });
  },


  navigatorToQuestion: function(e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id=' + qid
    });
  },

  navigatorToComment: function(e) {
    let aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '../comment/comment?answerid=' + aid
    });
  },

  getMoments: function(page, page_size) {
    let that = this;
    let ownerid = wx.getStorageSync('ownerid');
    util.getData('answer/' + ownerid + '/commentList/' + page + '/' + page_size).then(res => {
      if (res.data.code === 200) {
        that.setData({
          moments: that.data.moments.concat(res.data.data.content),
          moment_page: page + 1,
        })
      } else if (res.data.code !== 201) {
        wx.showToast({
          title: '获取数据失败！',
          icon: 'fail',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络请求失败!',
        icon: 'fail',
        duration: 2000
      })
    });
  },
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  onPullDownRefresh: function() {
    let that = this
    if (that.data.currentNavtab == '0') {
      that.setData({
        moments: [],
        moment_page: 1,
        moment_page_size: 6,
      });
      that.getMoments(that.data.moment_page, that.data.moment_page_size);
    } else if (that.data.currentNavtab == '1') {
      that.setData({
        follows: [],
        follow_page: 1,
        follow_page_size: 6,
      })
      that.getFollows(that.data.follow_page, that.data.follow_page_size);
    }
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    let that = this;
    if (that.data.currentNavtab == '0') {
      that.getMoments(that.data.moment_page,that.data.moment_page_size);
    } else if (that.data.currentNavtab == '1') {
      that.getFollows(that.data.follow_page,that.data.follow_page_size);
    }
  }
})