import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: [],
    isCollect:false

  },
  //商品对象
  GoodsInfo: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (option) {
let pages=getCurrentPages();
let currentPage=pages[pages.length-1];
let options=currentPage.options;

    const {
      goods_id
    } = options;

    this.getGoodsDetail(goods_id);

    
  },
  //获取商品详情信息
  async getGoodsDetail(goods_id) {

    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.GoodsInfo = goodsObj;

    //获取缓存中的收藏数组
    let collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
  
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        //兼容处理 webp=>jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics


      }, isCollect
    })
  },
  //点击轮播图事件
  handlePrevewImage(e) {
    const current = e.currentTarget.dataset.url;
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  //点击购物车事件
  handleCartAdd(e) {
    //获取缓存中的购物车数组            转化格式
    let cart = wx.getStorageSync('cart') || [];
    //判断对象是否存在于数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      //已经有该商品，增加数量
      cart[index].num++;

    }
    //把购物车重新缓存
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //true 防止用户疯狂点击按钮  1.5后才能点
      mask: true
    })
  },
//商品收藏事件
  handleCollect() {
    let isCollect=false;
let collect = wx.getStorageSync('collect')||[];
let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
if(index!==-1)
{
  collect.splice(index,1);
  isCollect=false;
  wx.showToast({
    title:'取消成功',
    mask:true,
    icon:'success'
  })
}
else
{
collect.push(this.GoodsInfo);
isCollect=true;
wx.showToast({
  title: '收藏成功',
  mask: true,
  icon: 'success'
})
}
wx.setStorageSync('collect', collect);
this.setData({
isCollect
})
  }


})