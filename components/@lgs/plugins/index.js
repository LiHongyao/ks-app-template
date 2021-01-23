/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-07 12:31:04
 * @LastEditTime: 2021-01-07 13:23:44
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app/components/@lgs/plugins/index.js
 */

import toast from "./modules/toast";

function register(app) {
  Object.assign(app, {
    toast
  });
}

export default {
  register
};
