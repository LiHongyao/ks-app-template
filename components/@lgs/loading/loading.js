/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-06 20:46:53
 * @LastEditTime: 2021-01-06 21:00:17
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /ks-app/components/@lgs/loading/loading.js
 */

Component({
  properties: {
    showTips: String,
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
