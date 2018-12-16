const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  setDisabled(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain(e) {
    this.setData({
      plain: !this.data.plain
    })
  }, 
  setLoading(e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  onGotUserInfo(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  loginTap: function (){
    console.log("navigate to ../index/index")
    wx.navigateTo({
      url: '../index/index'
    })
  }
}

for (let i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function (e) {
      const key = type + 'Size'
      const changedData = {}
      changedData[key] =
        this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  }(types[i]))
}

Page(pageObject)
