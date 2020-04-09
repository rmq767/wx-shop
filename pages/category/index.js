import {
  request
} from "../../request/request";
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates()
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  // 或去分类数据
  async getCates() {
    const res = await request({
      url: '/categories'
    })
    this.Cates = res
    // 本地存储
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
    // request({
    //     url: '/categories'
    //   })
    //   .then(res => {
    // this.Cates = res.data.message
    // // 本地存储
    // wx.setStorageSync('cates', {
    //   time: Date.now(),
    //   data: this.Cates
    // });
    // let leftMenuList = this.Cates.map(v => v.cat_name)
    // let rightContent = this.Cates[0].children
    // this.setData({
    //   leftMenuList,
    //   rightContent
    // })
    //   })
  },
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})