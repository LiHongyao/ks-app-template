/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-07 12:33:35
 * @LastEditTime: 2021-01-07 13:43:22
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app/components/@lgs/plugins/modules/toast.js
 */

/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-19 10:06:42
 * @LastEditTime: 2021-01-07 12:23:50
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app/components/@lgs/toast/toast.js
 */

import ksTools from "../lib";

let __lgTimer = null;
const toast = {
  info: function (message, duration = 1.5) {
    const currentPage = ksTools.getCurrentPage();
    currentPage.setData({
      "lg.toast.visible": true,
      "lg.toast.message": message,
    });
    clearTimeout(__lgTimer);
    __lgTimer = setTimeout(() => {
      toast.destroy();
    }, duration * 1000);
  },
  loading: function(message) {
    const currentPage = ksTools.getCurrentPage();
    currentPage.setData({
      "lg.toast.visible": true,
      "lg.toast.loading": true,
      "lg.toast.message": message || '',
    });
  },
  destroy: function() {
    clearTimeout(__lgTimer);
    const currentPage = ksTools.getCurrentPage();
    currentPage.setData({
      "lg.toast.visible": false,
      "lg.toast.loading": false,
      "lg.toast.message": '',
    });
  }
};

export default toast;
