var util = require('../../utils/util.js')
Page({
  data: {
    currentInput: '',
    questionId: '',
    ownerId:'',
    anoymous:'0',
  },
  onLoad: function (option) {
    console.log(option)
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
    let ownerid = wx.getStorageSync('ownerid')
    let qid = this.data.questionId
    let jsonData={
      'questionId':this.data.questionId,
      'anoymous':this.data.anoymous,
      'answerContent':this.data.currentInput,
      'ownerId': ownerid};
    let url = "answer/save"
    util.postData(url, jsonData).then(function (res) {
      console.log(res)
      if (res.data.code === 200) {
        wx.showToast({
          title: '回答成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(
          function(){
            wx.navigateBack({
              
            })
          },1200
        )
      } else if (res.data.code !== 201) {
        wx.showToast({
          title: '回答失败，请稍后再试',
          icon: 'fail',
          duration: 2000
        })
      }
    }).catch(function (e) { return Promise.reject(e); });
  },
})