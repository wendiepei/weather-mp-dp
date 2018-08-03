//天气中文显示
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
//导航栏颜色
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    temp: '',
    weatherText: '',
    weatherBg: ''
  },
  onLoad() {
    this.loadWeather(this)
  },
  onPullDownRefresh() {//下拉刷新
    this.loadWeather(this, function() {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 获取天气数据
   */
  loadWeather: function (this1, callback) {
    //请求天气API
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now?city=广州市',
      success: function (res) {
        console.info(res.data);
        if (res.data.code != 200) {
          //不成功 弹出提示
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return;
        }
        const result = res.data.result;
        console.info(result);
        this1.setData({
          temp: result.now.temp + "°",
          weatherText: weatherMap[result.now.weather],
          weatherBg: '/images/' + result.now.weather + '-bg.png'
        });
        //设置导航栏颜色
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[result.now.weather]
        })
      },
      complete: function() {
        callback && callback();
      }
    });
  }
})
