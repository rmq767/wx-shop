// pages/goods_list/index.js
import {
  request
} from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      }, {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pageSize: 10
  },
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList()
  },
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.queryParams
    })
    const total = res.total
    this.totalPages = Math.ceil(total / this.queryParams.pageSize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 请求成功关闭下拉刷新
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    const {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有数据了',
      });
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh() {
    this.queryParams.pagenum = 1;
    this.setData({
      goodsList: []
    });
    this.getGoodsList();
  }
})