/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-07 10:22:12
 * @LastEditTime: 2021-01-07 12:58:09
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app/components/@lgs/plugins/lib.js
 */

const app = getApp();
app.__ksInstance = null;

class KsTools {
  static defaultKsTools() {
    if (!app.__ksInstance) {
      app.__ksInstance = new KsTools();
    }
    return app.__ksInstance;
  }
  getCurrentPage() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    return currentPage;
  }
}

const ksTools = KsTools.defaultKsTools();
export default ksTools;
