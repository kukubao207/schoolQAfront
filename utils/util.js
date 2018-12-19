var app = getApp()

//get请求
function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: "http://"+app.globalData.productIp+":"+app.globalData.productPort+"/"+url,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

//post请求
function postData(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: "http://" + app.globalData.productIp + ":" + app.globalData.productPort + "/" + url,
      method: "POST",
      data: data,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

//获取当前登录用户的ownerid
const getOwnerId = () => {
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: 'ownerid',
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
module.exports.getData = getData;
module.exports.postData = postData;
module.exports.getOwnerId = getOwnerId