// pages/myquestionlist/questionList.js
const pageName = 'questionList'
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 8,
    myQuestions: [],
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMyQuestions()
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
      this.setData({page: 1})
      this.loadMyQuestions(null, wx.hideLoading)
      wx.showLoading({
        title: '正在刷新...',
        mask: true,
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loading) {
      this.setData({page: this.data.page + 1})
      this.loadMyQuestions(this.data.page, wx.hideLoading)
      wx.showLoading({
        title: '正在刷新...',
        mask: true,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  loadMyQuestions: function(page, unShowLoading) {
    page = page || this.data.page
    util.getOwnerId().then(ownerid => {
      console.log(ownerid)
      this.setData({ loading: true })
      let url = `user/${ownerid}/${pageName}/${this.data.page}/${this.data.pageSize}`
      util.getData(url).then(({ data }) => {
        console.log(data)
        this.setData({ loading: false })
        if (200 != data.code) {
          wx.showToast({
            title: data.info,
            icon: 'none ',
            duration: 1500,
          })
          return
        }

        if (unShowLoading) {
          unShowLoading()
        }

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
        console.log(err)
        this.setData({ loading: false })
        wx.stopPullDownRefresh()
        if (unShowLoading) {
          unShowLoading()
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})