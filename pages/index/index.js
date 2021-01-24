/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-23 16:37:35
 * @LastEditTime: 2021-01-24 19:38:23
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /ks-app-template/pages/index/index.js
 */


import Tools from '../../tools/index';

let curPage = 1;
let allPage = 5;
Page({
  data: {
    height: 0,
    // 横幅
    banners: [
      {img: "https://img.meituan.net/csc/024a88e9874dc77a0a297a678987f0194936.png", jumpUrl: ""},
      {img: "https://img.meituan.net/csc/024a88e9874dc77a0a297a678987f0194936.png", jumpUrl: ""},
      {img: "https://img.meituan.net/csc/024a88e9874dc77a0a297a678987f0194936.png", jumpUrl: ""}
    ],
    list: null
  },
  onReady: function () {
    this.scroll = this.selectComponent("#scroll");
    this.appHeader = this.selectComponent("#app-header");
    this.setData({
      height: Tools.getWindowHeight() - this.appHeader.getHeight() + 'px'
    });
    // 加载数据
    this.loadData();
  },
  // methods
  loadData(isRefresh) {
    setTimeout(() => {
      let list = this.data.list;
      let data;
      if(list && !isRefresh) {
        data = [...list, ...(new Array(10).fill(1))]
      }else {
        data = new Array(10).fill(1);
      }
      ++curPage;
      if(isRefresh) {
        this.scroll.refreshed();
      }else {
        this.scroll.loaded(curPage < 5);
      }
      
      this.setData({ list: data})
    }, 2000);
  },
  // events
  onLoadMore() {
    console.log('__上拉加载更多__');
    this.loadData(false);
  },
  onRefresh() {
    console.log('__刷新数据__');
    this.loadData(true);
  }
});



