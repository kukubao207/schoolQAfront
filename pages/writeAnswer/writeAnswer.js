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
      questionId: option.qid
    })
  },
  switchChange(e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      anoymous:e.detail.value
    })
  },
})