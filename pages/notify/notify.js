//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["动态列表", "关注列表"],
    currentNavtab: "0"
  },
  onLoad: function () {

  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})
