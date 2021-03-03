import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    scrollTop:0
  },
  //接口的返回数据
  Cates: [],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.先判断本地有无数据
    //{time:Data.nuw(),data:[...]}
    // 2.没有数据则发送请求
    // 3.有本地数据则加载数据

    const Cates = wx.getStorageSync('cates')
    if (!Cates) { 
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates();
      } else {
        //console.log("可以使用旧的数据");
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[currentIndex].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  //获取分类数据
  async getCates() {
    // request({
    //     url: "/categories"
    //   })
    //   .then(res => {
    //     this.Cates = res.data.message;

    //     wx.setStorageSync('cates', {
    //       time: Date.now(),
    //       data: this.Cates
    //     })
    //     //构造左侧得大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);

    //     //构造右侧得商品数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })

    //   })

    //使用es7的async
    const res=await request({url:"/categories"});
    this.Cates = res;

        wx.setStorageSync('cates', {
          time: Date.now(),
          data: this.Cates
        })
        //构造左侧得大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);

        //构造右侧得商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })

   
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    // 1.获取被点击标题索引
    // 2.给data中的currentIndex赋值
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,rightContent,scrollTop:0
    })
    //重新设置scroll-view距离顶部
  }

})