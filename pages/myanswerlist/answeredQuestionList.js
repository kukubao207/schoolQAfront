// pages/myanswerlist/answeredQuestionList.js
const pageName = 'answerList'
import * as util from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList: [],
    page: 1, 
    pageSize: 8,
    loading: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnsweredQuestions()
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
    if (!this.data.loading) {
      let page = 1;
      this.setData({ page: page })
      this.getAnsweredQuestions(page, this.data.pageSize, wx.hideLoading)
      wx.showLoading({
        title: '正在刷新...',
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loading) {
      let page = this.data.page + 1;
      this.getAnsweredQuestions(page, this.data.pageSize, wx.hideLoading)
      wx.showLoading({
        title: '正在加载...',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  getAnsweredQuestions(page, pageSize, unshownRefresh) {
    page = page || this.data.page
    pageSize = pageSize || this.data.pageSize
    util.getOwnerId().then(ownerid => {
      this.setData({ loading: true })
      let url = `user/${ownerid}/answerList/${page}/${pageSize}`
      util.getData(url).then(({data}) => {
        console.log(data)
        let { code } = data
        if (200 != code) {
          
        } else {
          console.log(data.data)
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
        if (unshownRefresh) {
          unshownRefresh()
        }
      })
      .catch(err => {
        console.log(err)
        if (unshownRefresh) {
          unshownRefresh()
        }
        let { info } = data
        if (info) {
          console.log(info)
        }

        this.setData({ loading: false })
        wx.stopPullDownRefresh()
      })
    })
    .catch(err => {
      console.log(err)
      if (unshownRefresh) {
        unshownRefresh()
      }

      this.setData({ loading: false })
      wx.stopPullDownRefresh()
    })
  }
})