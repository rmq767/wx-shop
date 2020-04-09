import {
  request
} from "../../request/request";

//Page Object
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList(),
      this.getCateList(),
      this.getFloorList()
  },
  async getSwiperList() {
    // request({
    //     url: '/home/swiperdata'
    //   })
    //   .then(res => {
    // this.setData({
    //   swiperList: res.data.message
    // })
    //   })
    const res = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      swiperList: res
    })
  },
  async getCateList() {
    // request({
    //     url: '/home/catitems'
    //   })
    //   .then(res => {
    //     this.setData({
    //       cateList: res.data.message
    //     })
    //   })
    const res = await request({
      url: '/home/catitems'
    })
    this.setData({
      cateList: res
    })
  },
  async getFloorList() {
    // request({
    //     url: '/home/floordata'
    //   })
    //   .then(res => {
    //     this.setData({
    //       floorList: res.data.message
    //     })
    //   })
    const res = await request({
      url: '/home/floordata'
    })
    this.setData({
      floorList: res
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});