/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-24 19:46:07
 * @LastEditTime: 2021-01-24 19:50:27
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app-template/api/request.js
 */

// 服务器域名 - 开发环境
const HOST = "";
// 服务器域名 - 生产环境
// const HOST = "";

// request
const request = (options, loadingTips) => {
  // handle options
  const { data, method } = options;
  if (data && /POST/i.test(method)) {
    options.data = JSON.stringify(data);
  }
  options.url = HOST + options.url;
  options.method = options.method || "GET";
  options.header = {
    "Content-Type": "application/json",
    token: ks.getStorageSync("token"),
  };
  // loading
  loadingTips &&
    ks.showLoading({
      title: loadingTips,
      mask: true,
    });
  // request
  return new Promise((resolve, reject) => {
    ks.request({
      ...options,
      timeout: 20000,
      dataType: "json",
      success(res) {
        if (res.statusCode === 200) {
          const { status, msg } = res.data;
          if (status === 200 || status === 201) {
            resolve(res.data);
          } else {
            ks.showToast({
              title: msg,
              icon: "none",
            });
          }
        } else {
          ks.showToast({
            title: "服务器异常，稍后再试！",
            icon: "none",
          });
          console.log("「接口请求异常：」", res);
        }
      },
      fail(err) {
        console.log("「接口请求异常：」", err);
      },
      complete() {
        loadingTips && ks.hideLoading();
      },
    });
  });
};
export default request;
