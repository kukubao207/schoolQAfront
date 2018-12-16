// pages/writeAnswer/writeAnswer.js
// textarea.js
Page({
  data: {
    currentInput: '',
    questionId: '',
    ownerId:'',
    anoymous:'',
  },
  getInput: function (e) {
    this.setData({
      currentInput: e.detail.value
    })
  },
  answer: function(e) {
    
  },
  onLoad:function(option){
    console.log(option)
    this.setData({
      qid: option.qid
    })
  }
})