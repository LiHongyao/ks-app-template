/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-19 10:06:42
 * @LastEditTime: 2021-01-24 11:29:25
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /ks-app-template/components/@lgs/app-header/app-header.js
 */

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    // 是否显示左侧胶囊按钮
    showCapsule: {
      type: Boolean,
      value: false,
    },
    // 胶囊按钮风格：white / black
    capsuleStyle: {
      type: String,
      value: "black",
    },
    leftStyle: {
      type: String,
      value: "default",
    },
    // 标题
    title: {
      type: String,
      value: "默认标题",
    },
    // 标题栏风格：default / custom
    titleViewStyle: {
      type: String,
      value: "default",
    },
    // 前景色
    tintColor: {
      type: String,
      value: "#373737",
    },
    // 背景
    background: {
      type: String,
      value: "#eeeeee",
    },
    // 渐变导航
    gradientColor: {
      type: String,
      value: "",
    },
    // 显示主页按钮
    showHomeButton: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    height: 0, // 导航栏高度
    hasBack: false, // 是否展示返回按钮
    statusBarHeight: 0, // 状态栏高度
    titleBarHeight: 0, // 标题栏高度
    navigationBarWidth: 0, // 导航栏宽度
    navigationBarLeftGap: 0, // 导航栏左侧间距
    menuButtonHeight: 0, // 胶囊按钮高度
    opacity: 1, // 不透明度
    safeWidth: 0, // 安全区域宽度
    rootBackground: "", // 背景
    iconStyle: {
      // 图标风格
      border: "",
      backgroundColor: "",
    },
    refreshing: false,
  },

  lifetimes: {
    attached() {
      console.log("__加载导航栏__");
      this.init();
    },
  },

  methods: {
    init() {
      // 计算所需尺寸
      const { screenWidth, statusBarHeight } = ks.getSystemInfoSync();
      const {
        height,
        left,
        top,
        right,
      } = ks.getMenuButtonBoundingClientRect();
      const titleBarHeight = height + (top - statusBarHeight) * 2;
      const appHeaderHeight = statusBarHeight + titleBarHeight;
      const safeWidth = left - (screenWidth - right);
      // 计算样式
      const capsuleBorder =
        this.properties.capsuleStyle === "black"
          ? "1px solid rgba(0, 0, 0, .1)"
          : "1px solid rgba(255, 255, 255, .25)";
      const capsuleBackgroundColor =
        this.properties.capsuleStyle === "black"
          ? "rgba(255, 255, 255, .6)"
          : "rgba(0, 0, 0, .15)";
      const opacity = this.properties.gradientColor ? 0 : 1;

      // 是否显示返回按钮
      const hasBack = getCurrentPages().length !== 1;

      // 计算背景
      let bg = this.properties.background;
      let rootBackground;
      if (/^http/.test(bg)) {
        rootBackground = `url(${bg}) no-repeat center center / 100% 100%`;
      } else if (this.properties.gradientColor) {
        rootBackground = "transparent";
      } else {
        rootBackground = bg;
      }

      // 更新数据
      this.setData({
        height: appHeaderHeight,
        titleBarHeight,
        navigationBarWidth: left,
        statusBarHeight,
        safeWidth,
        navigationBarLeftGap: screenWidth - right,
        menuButtonHeight: height,
        hasBack,
        opacity,
        rootBackground,
        ["iconStyle.border"]: capsuleBorder,
        ["iconStyle.backgroundColor"]: capsuleBackgroundColor,
      });
    },
    // methods
    getHeight() {
      return this.data.height;
    },
    // events
    goBack() {
      ks.navigateBack({
        delta: 1,
      });
    },
    goHome() {
      ks.switchTab({
        url: "/pages/index/index",
      });
    },
    /**
     * 设置导航渐变，使用方法
     * 1. 首先在页面中引用组件时设置id，如app-header
     * 2. 其次在页面onReady声明周期函数中后去appHeader实例: this.appHeader = this.selectComponent("#app-header");
     * 3. 最后在页面onPageScroll监听函数中调用此方法即可实现渐变导航效果
     * @param {*} scrollTop
     */
    setOpacity(scrollTop) {
      // if (this.data.refreshing) return;
      let opacity = 0;
      if (scrollTop < 0) {
        const minTop = -30;
        opacity = scrollTop > minTop ? scrollTop / minTop : 1;
      } else {
        const maxTop = 200;
        opacity = scrollTop < maxTop ? scrollTop / maxTop : 1;
      }
      this.setData({ opacity });
    },
  },
});
