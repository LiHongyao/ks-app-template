/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-23 17:29:55
 * @LastEditTime: 2021-01-23 17:49:10
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /dp-ksapp-2/tools/index.js
 */

/**
 * 计算高度
 * @param {*} context
 * @param {*} sel
 */
export function getHeight(context, sel) {
  return new Promise((resolve) => {
    const { windowHeight } = ks.getSystemInfoSync();
    const query = context.createSelectorQuery();
    query
      .select(sel)
      .boundingClientRect((rect) => {
        console.log(rect)
        resolve(windowHeight - rect.top);
      })
      .exec();
  });
}
