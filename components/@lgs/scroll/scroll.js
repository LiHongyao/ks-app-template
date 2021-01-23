/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-23 20:04:07
 * @LastEditTime: 2021-01-24 01:30:22
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /dp-ksapp-2/components/@lgs/scroll/scroll.js
 */

 /**
  * # 属性
  * - height：scroll高度
  * 
  * # 事件
  * - scroll：滚动事件
  * - load：上拉加载更多事件
  * - refresh：下拉刷新事件
  * 
  * # 提示
  * 下拉刷新数据请求到之后需调用组件「refreshed」归位状态
  */

/** 记录手指滑动的距离 */
let TOUCH_X;
let TOUCH_Y;
// 阈值
let THRESHOLD = 100;

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    height: String /** scroll 高度 */,
  },
  data: {
    scrollTop: 0 /** 记录滚动距离 */,
    canRefresh: false /** 是否进入下拉刷新状态，必须在顶部时才触发 */,
    refreshHeight: 0 /** 下拉刷新控件高度 */,
    refreshText: "下拉刷新" /** 下拉刷新提示语 */,

    loadMoreStatus: -1, /** 上拉状态 0-上拉加载更多; 1-加载中; 2-加载完成; 3-没有更多了 */
  },
  lifetimes: {
    attached() {
      console.log('scroll height:', this.properties.height);
    },
  },
  methods: {
    loaded(hasMore) {
      this.setData({ loadMoreStatus: 2});
      setTimeout(() => {
        this.setData({ loadMoreStatus: hasMore ? 0 : 3});
      }, 500);
    },
    refreshed() {
      TOUCH_Y = 0;
      this.setData({
        refreshText: "下拉刷新",
        refreshHeight: 0,
        canRefresh: false,
        scrollTop: 0,
      });
    },
    onScroll({ detail: { scrollTop } }) {
      this.triggerEvent("scroll", { scrollTop });
      // 未进入下拉状态时，记录scorll-view滑动距离顶部的距离
      if (!this.data.canRefresh) {
        this.setData({ scrollTop });
      }
    },
    onLoad() {
      if([1, 2, 3].indexOf(this.data.loadMoreStatus) !== -1) return;
      this.setData({ loadMoreStatus: 1});
      this.triggerEvent("load");
    },
    onTouchStart(e) {
      // 记录开始触摸时的Y坐标
      TOUCH_X = e.touches[0].clientX;
      TOUCH_Y = e.touches[0].clientY;
    },
    onTouchMove(e) {
      // 计算滑动的距离
      let distance_X = e.touches[0].clientX - TOUCH_X;
      let distance = e.touches[0].clientY - TOUCH_Y;
      if (distance_X > distance) return;
      // 滑动到顶部且继续向上滑动时，走scorll-view滑动流程
      if (this.data.refreshHeight <= 0 && distance <= 0) {
        return;
      }
      // 滑动到顶部且继续下拉进入下拉状态
      if (this.data.scrollTop <= 0) {
        !this.data.canRefresh && this.setData({ canRefresh: true });
        // 临时记录刷新最控件的高度
        let tHeight = 0;
        if (distance > 0) {
          // 手指向下滑动
          if (this.data.refreshHeight >= THRESHOLD) {
            // 达到阈值，更新状态
            this.setData({ refreshText: "松开刷新" });
            tHeight =
              this.data.refreshHeight +
              distance / (this.data.refreshHeight - THRESHOLD); // 增大下拉阻尼感
          } else {
            this.setData({ refreshText: "下拉刷新" });
            // 手指移动未到阈值，按正常滑动增加高度
            tHeight = this.data.refreshHeight + distance;
          }
        } else {
          // 手指向上滑动
          tHeight = this.data.refreshHeight + distance;
          // 刷新状态view最小为0
          // if (tHeight <= 0) {
          //   tHeight = 0;
          // }
          if (this.data.refreshHeight >= THRESHOLD) {
            this.setData({ refreshText: "松开刷新" });
          } else {
            this.setData({ refreshText: "下拉刷新" });
          }
        }
        // 滑动完成设置刷新view高度
        this.setData({ refreshHeight: tHeight });
      }
      // 每次滑动事件后记录y坐标
      TOUCH_Y = e.touches[0].clientY;
    },
    onTouchEnd(e) {
      if (this.data.refreshHeight >= THRESHOLD) {
        // 手指离开时，如果阈值大于等于100，则触发刷新
        this.setData({
          refreshText: "正在刷新...",
          refreshHeight: 50,
        });
        this.triggerEvent("refresh");
        // 模拟耗时操作，2秒后恢复正常状态
        // setTimeout(() => {
        //   this.refreshed();
        // }, 2000);
      } else {
        // 未下拉到阈值，松开时归位
        this.refreshed();
      }
    },
  },
});
