/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-06 20:46:53
 * @LastEditTime: 2021-01-24 11:22:58
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /ks-app-template/components/@lgs/loading/loading.js
 */

Component({
  properties: {
    showTips: {
      type: Boolean,
      value: true
    },
    tips: {
      type: String,
      value: '数据加载中...'
    },
    top: {
      type: Number,
      value: 100
    },
    icon: {
      type: String,
      value: './images/logo.png'
    },
  }
})
