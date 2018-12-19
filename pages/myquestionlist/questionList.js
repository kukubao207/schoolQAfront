// pages/myquestionlist/questionList.js
const pageName = 'questionList'
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    page: 1,
    pageSize: 1000,
    myQuestions: [],
    loading: false,
  },
  onLoad: function (options) {
    this.loadMyQuestions()
  },
  onQuestionTap(e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id=' + qid
    })
  },
  onPullDownRefresh: function () {
    if (!this.data.loading) {
      this.setData({page: 1})
      this.loadMyQuestions(null, wx.hideLoading)
      wx.showLoading({
        title: '正在刷新...',
        mask: true,
      })
    }
  },
  onReachBottom: function () {
    if (!this.data.loading) {
      this.setData({page: this.data.page + 1})
      this.loadMyQuestions(this.data.page)
    }
  },
  loadMyQuestions: function(page) {
    page = page || this.data.page
    util.getOwnerId().then(ownerid => {
      this.setData({ loading: true })
      let url = `user/${ownerid}/${pageName}/${this.data.page}/${this.data.pageSize}`
      util.getData(url).then(({ data }) => {
        this.setData({ loading: false })
        wx.stopPullDownRefresh()

        // 挂载数据
        if (1 >= page) {
          this.setData({myQuestions: data.data.content})
        } else {
          if (!data.data.empty) {
            let questions = this.data.myQuestions
            data.data.content.map(question => {
              questions.push(question)
            })
            this.setData({ myQuestions: questions })
          } else {
            this.setData({ page: this.data.page - 1})
          }
        }
      }).catch((err) => {
        this.setData({ loading: false })
        wx.stopPullDownRefresh()
        if (unShowLoading) {
          unShowLoading()
        }
      })
    })
    .catch(err => {
    })
  }
})