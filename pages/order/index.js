import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
tabs: [{
    id: 0,
    value: "全部",
    isActive: true
  },
  {
    id: 1,
    value: "待付款",
    isActive: false
  },
  {
    id: 2,
    value: "待发货",
    isActive: false
  },
   {
     id: 3,
     value: "退款/退货",
     isActive: false
   }
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options){
    //页面栈最大10页
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1];
    console.log(currentPage.options);
    const {type}=currentPage.options;

    this.handleTitleByIndex(type - 1);
    this.getOrders(type);
  },

async  getOrders(type){
  const res = await request({url: "/my/orders/all",data:{type}});
  console.log(res);
},
handleTabsItemChange(e) {
  const {
    index
  } = e.detail;
  this.handleTitleByIndex(index);
  this.getOrders(index+1);
},
//根据索引激活
handleTitleByIndex(index){
let {
  tabs
} = this.data;
tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
this.setData({
  tabs
});

}
})