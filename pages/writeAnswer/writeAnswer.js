// pages/writeAnswer/writeAnswer.js
// textarea.js
Page({
  data: {
    height: 20,
    focus: false
  },
  bindButtonTap() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit(e) {
    console.log(e.detail.value.textarea)
  }
})