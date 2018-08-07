//天气中文显示
// const weatherMap = {
//   'sunny': '晴天',
//   'cloudy': '多云',
//   'overcast': '阴',
//   'lightrain': '小雨',
//   'heavyrain': '大雨',
//   'snow': '雪'
// }
const weatherMap = {
  '晴': 'sunny',
  '多云': 'cloudy',
  '阴': 'overcast',
  '小雨': 'lightrain',
  '大雨': 'heavyrain',
  '雪': 'snow'
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
    weatherBg: '',
    timeWeather: []
  },
  onLoad() {
    this.loadWeather(this)
    //小时天气
    this.setData({
      timeWeather: hourlyData.HeWeather6[0].hourly
    })

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
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: {
        location: "广州市",
        key: "2f6cd6ff7d9249c7b0afa2180612dd4d"
      },
      success: function (res) {
        const result = res.data.HeWeather6[0];
        if (result.status != "ok") {
          wx.showToast({
            title: '哎呀！网络开小差了',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return;
        }
        console.info(result);
        this1.setData({
          temp: result.now.tmp + "°",
          weatherText: result.now.cond_txt,
          weatherBg: '/images/' + weatherMap[result.now.cond_txt] + '-bg.png'
        });
        //设置导航栏颜色
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weatherMap[result.now.cond_txt]]
        })
      },
      complete: function() {
        callback && callback();
      }
    });
  }
})

const hourlyData = {
  "HeWeather6": [
    {
      "basic": {
        "cid": "CN101010100",
        "location": "北京",
        "parent_city": "北京",
        "admin_area": "北京",
        "cnty": "中国",
        "lat": "39.90498734",
        "lon": "116.40528870",
        "tz": "8.0"
      },
      "hourly": [
        {
          "cloud": "8",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "84",
          "pop": "0",
          "pres": "1018",
          "time": "1时",
          "tmp": "8",
          "wind_deg": "49",
          "wind_dir": "东北风",
          "wind_sc": "微风",
          "wind_spd": "2"
        },
        {
          "cloud": "8",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "81",
          "pop": "0",
          "pres": "1018",
          "time": "4时",
          "tmp": "8",
          "wind_deg": "29",
          "wind_dir": "东北风",
          "wind_sc": "微风",
          "wind_spd": "2"
        },
        {
          "cloud": "6",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "95",
          "pop": "0",
          "pres": "1019",
          "time": "7时",
          "tmp": "8",
          "wind_deg": "37",
          "wind_dir": "东北风",
          "wind_sc": "微风",
          "wind_spd": "2"
        },
        {
          "cloud": "2",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "75",
          "pop": "0",
          "pres": "1018",
          "time": "10时",
          "tmp": "14",
          "wind_deg": "108",
          "wind_dir": "东南风",
          "wind_sc": "微风",
          "wind_spd": "3"
        },
        {
          "cloud": "0",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "62",
          "pop": "0",
          "pres": "1016",
          "time": "13时",
          "tmp": "16",
          "wind_deg": "158",
          "wind_dir": "东南风",
          "wind_sc": "微风",
          "wind_spd": "6"
        },
        {
          "cloud": "0",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "73",
          "pop": "0",
          "pres": "1016",
          "time": "16时",
          "tmp": "15",
          "wind_deg": "162",
          "wind_dir": "东南风",
          "wind_sc": "微风",
          "wind_spd": "6"
        },
        {
          "cloud": "3",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "92",
          "pop": "0",
          "pres": "1018",
          "time": "19时",
          "tmp": "13",
          "wind_deg": "206",
          "wind_dir": "西南风",
          "wind_sc": "微风",
          "wind_spd": "4"
        },
        {
          "cloud": "19",
          "cond_code": "100",
          "cond_txt": "晴",
          "hum": "96",
          "pop": "0",
          "pres": "1019",
          "time": "22时",
          "tmp": "13",
          "wind_deg": "212",
          "wind_dir": "西南风",
          "wind_sc": "微风",
          "wind_spd": "1"
        }
      ],
      "status": "ok",
      "update": {
        "loc": "2017-10-26 23:09",
        "utc": "2017-10-26 15:09"
      }
    }
  ]
}