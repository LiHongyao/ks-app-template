/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-06 12:44:59
 * @LastEditTime: 2021-01-21 15:04:50
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app/components/@lgs/search/search.js
 */

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    clearPath: {
      type: String,
      value: "./images/icon_clear.png",
    },
    iconPath: {
      type: String /** 外部传入时只支持网络图片 */,
      value: "./images/icon_search.png",
    },
    allowClear: {
      type: Boolean,
      value: true,
    },
    color: {
      type: String,
      value: "#333333",
    },
    placeholder: String,
    placeholderStyle: {
      type: String,
      value: "color:#A8A8A8; font-size:26rpx;",
    },
  },
  data: {
    value: "",
  },
  methods: {
    onConfirm(e) {
      this.triggerEvent("confirm", e.detail.value);
    },
    onInput(e) {
      this.setData({
        value: e.detail.value,
      });
    },
    onClear() {
      this.setData({
        value: "",
      });
    },
  },
});
