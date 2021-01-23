/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-23 16:37:35
 * @LastEditTime: 2021-01-24 01:25:26
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /dp-ksapp-2/pages/test/test.js
 */


Page({
  data: {
    height: 0,
    // 横幅
    banners: [
      {img: "https://img.meituan.net/csc/024a88e9874dc77a0a297a678987f0194936.png", jumpUrl: ""},
      {img: "https://img.meituan.net/csc/024a88e9874dc77a0a297a678987f0194936.png", jumpUrl: ""},
      {img: "https://img.meituan.net/csc/024a88e9874dc77a0a297a678987f0194936.png", jumpUrl: ""}
    ],
  },
  onReady: function () {
    this.appHeader = this.selectComponent("#app-header");
    this.scroll = this.selectComponent("#scroll");
  },
  onScroll({detail: { scrollTop }}) {
    this.appHeader.setOpacity(scrollTop);
  },
  onLoadMore() {
    console.log('__上拉加载更多__');
    setTimeout(() => {
      this.scroll.loaded(false)
    }, 2000);
  },
  onRefresh() {
    console.log('__刷新数据__');
    setTimeout(() => {
      this.scroll.refreshed();
    }, 2000);
  }
});



