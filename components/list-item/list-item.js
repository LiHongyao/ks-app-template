/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-23 15:46:32
 * @LastEditTime: 2021-01-23 15:51:06
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /dp-ksapp-2/components/list-item/list-item.js
 */

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object,
      default: {
        title: '',
        subTitle: '',
        peoples: 0,
        icon: ''
      }
    }
  },
});
