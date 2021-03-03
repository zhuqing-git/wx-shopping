//引用 用来发送请求得方法 一定要把路径补全
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航 数组
    catesList:[],
    //楼层
    floorList:[]

  },
  onLoad: function (options) {
    var self = this
    
     self.getSwiperList();
     self.getCateList();
    self. getFloorList();
   

  }
  ,

     //获取轮播图数据
     getSwiperList(){
      request({url:"/home/swiperdata"}).then(result=>{
        this.setData({swiperList:result})
      })
    },
 //获取分类导航数据
    getCateList(){
      request({url:"/home/catitems"}).then(result=>{
        this.setData({catesList:result})
      })
    },
    //获取楼层数据
    getFloorList(){
      request({url:"/home/floordata"}).then(result=>{
        this.setData({floorList:result})
      })
    }

})