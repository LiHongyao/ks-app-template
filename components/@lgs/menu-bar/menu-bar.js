/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-19 10:06:42
 * @LastEditTime: 2021-01-06 18:13:19
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /ks-app/components/@lgs/menu-bar/menu-bar.js
 */

Component({
  properties: {
    // 水平对齐方式
    mode: { 
      type: String,
      value: 'default'
    },
    customClass: String,
    selectedColor: {
      type: String,
      value: '#F82F5C'
    },
    backgroundColor: {
      type: String,
      value: '#FFFFFF'
    },
    active: {
      type: Number,
      default: 0,
      observers: function(value) {
        this.setData({
          currentIndex: value
        });
      }
    },
    menus: {
      type: Array,
      required: true
    }
  },
  lifetimes: {
    attached() {
      // this.initData();
      // this.setData({
      //   currentIndex: this.properties.active
      // });
    }
  },
  data: {
    currentIndex: 0,
    locations: []
  },
  methods: {
    initData() {
      const query = this.createSelectorQuery();
      const locations = [];
      let cursorHalf = 0;
      // 获取游标的尺寸信息
      query.select('.lg-menu-bar__cursor').boundingClientRect(function(res){
        console.log(res)
        cursorHalf = res.width / 2;
      });
      // 获取菜单项的尺寸信息
      query.selectAll('.lg-menu-bar__item').boundingClientRect(rects => {
        rects.forEach(rect => {
          const { left, width } = rect;
          locations.push(left + width / 2 - cursorHalf);
        });
        this.setData({
          locations
        })
      });
      query.exec(res => {
        console.log(res)
      });
    },
    onItemTap(event) {
      const index = event.target.dataset.index;
      if(this.data.currentIndex === index) return;
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('change', index);
    }
  }
})
