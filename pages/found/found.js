/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-24 01:48:55
 * @LastEditTime: 2021-01-24 19:18:04
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app-template/pages/found/found.js
 */

Page({
  data: {
    list: null,
  },
  onReady() {
    this.scroll = this.selectComponent("#scroll");
    setTimeout(() => {
      this.setData({ list: [] });
    }, 2000);
  },
  onRefresh() {
    console.log('__下拉刷新__');
    setTimeout(() => {
      this.scroll.refreshed();
    }, 2000);
  }
});
