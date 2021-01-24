/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-23 17:29:55
 * @LastEditTime: 2021-01-24 19:33:37
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app-template/tools/index.js
 */

class Tools {
  /**
   * 计算高度
   * @param {*} context
   * @param {*} sel
   */
  getHeight(context, sel) {
    return new Promise((resolve) => {
      const { windowHeight } = ks.getSystemInfoSync();
      const query = context.createSelectorQuery();
      query
        .select(sel)
        .boundingClientRect((rect) => {
          console.log(rect);
          resolve(windowHeight - rect.top);
        })
        .exec();
    });
  }
  getWindowHeight() {
    return ks.getSystemInfoSync().windowHeight;
  }
}

const __default = new Tools();
export default __default;
