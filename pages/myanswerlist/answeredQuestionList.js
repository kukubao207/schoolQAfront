// pages/myanswerlist/answeredQuestionList.js
const pageName = 'answerList'
import * as util from '../../utils/util'
const app = getApp()
Page({
  data: {
    answerList: [],
    page: 1, 
    pageSize: 1000,
    loading: false,
  },
  onLoad: function (options) {
    this.getAnsweredQuestions()
  },

  onPullDownRefresh: function () {
    if (!this.data.loading) {
      let page = 1;
      this.setData({ page: page })
      this.getAnsweredQuestions(page, this.data.pageSize, wx.hideLoading)
    }
  },

  onReachBottom: function () {
    if (!this.data.loading) {
      let page = this.data.page + 1;
      this.getAnsweredQuestions(page, this.data.pageSize, wx.hideLoading)
    }
  },
  getAnsweredQuestions(page, pageSize, unshownRefresh) {
    page = page || this.data.page
    pageSize = pageSize || this.data.pageSize
    util.getOwnerId().then(ownerid => {
      this.setData({ loading: true })
      let url = `user/${ownerid}/answerList/${page}/${pageSize}`
      util.getData(url).then(({data}) => {
        (data)
        let { code } = data
        if (200 != code) {
          
        } else {
          if (1 >= page) {
            this.setData({ answerList: data.data.content })
          } else {
            if (!data.data.empty) {
              answers = data.data.content
              answerList = this.data.answerList
              questions.map(question => {
                answerList.push(answers)
              })
              this.setData({ answerList: answerList })
            } else {
              this.setData({ page: this.data.page - 1 })
            }
          }
        }
        this.setData({ loading: false })
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        this.setData({ loading: false })
        wx.stopPullDownRefresh()
      })
    })
    .catch(err => {
      this.setData({ loading: false })
      wx.stopPullDownRefresh()
    })
  },
  onQuestionTap(e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id=' + qid
    })
  }
})