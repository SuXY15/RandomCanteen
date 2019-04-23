//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    placeList: ['清华其他','清华大学','清华李兆基','北京大学'],
    placeSelected: '清华大学',
    canteenList: {
      '清华大学':[
        { name: '紫荆', prob: 1, info: '紫荆公寓区' }, 
        { name: '桃李', prob: 1, info: '紫荆公寓区' },
        { name: '清芬', prob: 1, info: '学堂路，停车灾区' },
        { name: '丁香', prob: 1, info: '学堂路，近紫荆公寓区' },
        { name: '万人', prob: 1, info: '西操北侧' },
        { name: '玉树', prob: 1, info: '东北门附近，紫荆11号楼东侧' },
        { name: '芝兰', prob: 1, info: '东北门附近，紫荆篮球场东侧' },
        { name: '澜园', prob: 1, info: '二校门南侧，照澜购物中心二楼' },
        { name: '寓园', prob: 1, info: '二校门西南，教职工宿舍区' },
        { name: '南园', prob: 1, info: '南门附近' },
        { name: '荷园', prob: 1, info: '熙春路上，工字厅附近' },
        { name: '家园', prob: 1, info: '清华附小南侧，校外可进' },
        { name: '北园', prob: 1, info: '清华附中附近，北门出门右转' },
        { name: '融园', prob: 1, info: '我也不知道在哪 = =' },
      ],
      '清华李兆基':[
        { name: '澜园', prob: 2, info: '二校门南侧，照澜购物中心二楼' },
        { name: '南园', prob: 2, info: '南门附近' },
        { name: '寓园', prob: 1, info: '二校门西南，教职工宿舍区' },
        { name: '清芬', prob: 1, info: '学堂路，停车灾区' },
      ],
      '清华其他': [
        { name: '紫荆地下', prob: 1, info: '紫荆公寓区' },
        { name: '桃李地下', prob: 1, info: '紫荆公寓区' },
        { name: '清青快餐', prob: 1, info: '学堂路，停车灾区' },
        { name: '清青小火锅', prob: 1, info: '东北门附近，紫荆篮球场东侧' },
        { name: '万人三楼', prob: 1, info: '西操北侧' },
        { name: '桃李三楼', prob: 1, info: '紫荆公寓区' },
        { name: '荷园二楼', prob: 1, info: '熙春路上，工字厅附近' },
        { name: '澜园二楼', prob: 1, info: '二校门南侧，照澜购物中心二楼' },
        { name: '玉树一楼', prob: 1, info: '东北门附近，紫荆11号楼东侧' },
        { name: '芝兰点餐', prob: 1, info: '东北门附近，紫荆篮球场东侧' },
        { name: '近春园', prob: 1, info: '近春园，校医院南侧' },
        { name: '熙春园', prob: 1, info: '熙春路上，工字厅附近' },
        { name: '甲所', prob: 1, info: '我也不知道咋进 = =' },
      ],
      '北京大学': [
        { name: '农园', prob: 1, info: 'none' },
        { name: '燕南', prob: 1, info: 'none' },
        { name: '学一', prob: 1, info: 'none' },
        { name: '学五', prob: 1, info: 'none' },
        { name: '勺园', prob: 1, info: 'none' },
        { name: '艺园', prob: 1, info: 'none' },
        { name: '松林', prob: 1, info: 'none' },
        { name: '畅春园', prob: 1, info: 'none' },
        { name: '小白房', prob: 1, info: 'none' },
        ]
    },
    canteens: [],
    selectedCanteen: {name:"待定"},
    ratioRange: [0.0,5.0],
    userInfo: {}
  },
  //事件处理函数
  onLoad: function () {
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
    this.onReset();
  },

  // 选择区域
  onPlaceChange: function (e) {
    var selectedPlace = this.data.placeList[e.detail.value];
    this.setData({
      placeSelected: selectedPlace,
      canteens: this.data.canteenList[selectedPlace],
      selectedCanteen: { name: "待定" }
    });
  },

  // 随机食堂
  onStartSelect: function () {
    var totalCount = 0, selectedIndex = 0;
    var tempCanteens = this.data.canteens;
    tempCanteens.forEach(
      function (item) {
          totalCount += item.prob;
      }
    );
    if (totalCount == 0) {
      this.setData({
        selectedCanteen: { name: "待定" }
      });
      return;
    }
    var randChoice = Math.random() * totalCount;
    for (let i = 0, len = tempCanteens.length; i < len; i++) {
      randChoice -= tempCanteens[i].prob;
      if (randChoice <= 0) {
        selectedIndex = i;
        break;
      }
    }
    this.setData({
      selectedCanteen: tempCanteens[selectedIndex]
    });
    if(tempCanteens[selectedIndex].info!='none'){
      wx.showToast({
        title: tempCanteens[selectedIndex].info,
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 重置食堂
  onReset: function (e) {
    let currentCanteens = Object.create(this.data.canteenList[this.data.placeSelected]);
    currentCanteens.forEach(function (item) {
      item.prob = 1;
    });
    this.setData({
      canteens: this.data.canteenList[this.data.placeSelected],
      selectedCanteen: { name: "待定" }
    });
  },

  // 更改倍率
  onProbChange: function (e) {
    var name = e.target.dataset.canteen;
    var tempCanteens = this.data.canteens;
    tempCanteens.forEach(function (item) {
      if (item.name == name) {
        item.prob = e.detail.value;
      }
    });
    this.setData({
      canteens: tempCanteens
    });
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '食堂选择困难症福利～',
      path: '/pages/index/index',
      success: function () { }
    }
  },
})