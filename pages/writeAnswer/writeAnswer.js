var util = require('../../utils/util.js')
Page({
  data: {
    currentInput: '',
    questionId: '',
    ownerId:'',
    anoymous:'0',
  },
  onLoad: function (option) {
    this.setData({
      questionId: option.qid,
    })
  },
  getInput: function (e) {
    this.setData({
      currentInput: e.detail.value
    })
  },
  switchChange(e) {
    if(e.detail.value){
      this.setData({
        anoymous: 1
      })
    }else{
      this.setData({
        anoymous: 0
      })
    }
  },
  answer: function(e) {
    let that = this
    util.getOwnerId().then(ownerid => {
      let qid = that.data.questionId
      let jsonData = {
        'questionId': that.data.questionId,
        'anonymous': that.data.anoymous,
        'answerContent': that.data.currentInput,
        'ownerId': ownerid
      };
      let url = "answer/save"
      util.postData(url, jsonData).then(function (res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '回答成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(
            function () {
              wx.navigateBack({

              })
            }, 1200
          )
        } else if (res.data.code !== 201) {
          wx.showToast({
            title: '回答失败，请稍后再试',
            icon: 'fail',
            duration: 2000
          })
        }
      });
    })
  },
})