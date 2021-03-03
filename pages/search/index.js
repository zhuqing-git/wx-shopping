// pages/search/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    //按钮显示
    isfocus: false,
    inpValue:""

  },
  TimeId: -1,
  //input事件
  handleInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
this.setData({
  goods:[],
  isfocus:false
})
      return;
    }
    this.setData({
      isfocus: true
    })
    // 利用定时器实现防抖
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);

  },
  //发送请求获取搜索建议的数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    console.log(res);
    this.setData({
      goods: res
    });
  },
  //按钮功能
  handleCancel(){
this.setData({
  inpValue:"",
  isfocus:false,
  goods:[]
})
  }
})