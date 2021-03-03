// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  //经常用到比load节省性能
  onShow() {
    //获取缓存中地址
    const address = wx.getStorageSync('address');
    //获取缓存中购物车
    let cart = wx.getStorageSync('cart') || [];
    //every遍历 如果是空数组，那么返回true 性能优化
    //const allChexked=cart.length?cart.every(v=>v.checkd):false;

    //过滤后的购物车数组
     cart=cart.filter(v=>v.checked);

    

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
     
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    
    });

   

    //赋值
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
    
    },

    //商品的全选
    handleItemAllCheck() {
        let {
          cart,
          allChecked
        } = this.data;
        allChecked = !allChecked;
        //循环改商品状态
        cart.forEach(v => v.checked = allChecked)
        this.setCart(cart);


  },

  //支付
  handleOrderPay(){
    showToast({title:"未开通支付功能"});
    //删除商品
    let newCart=wx.getStorageSync('cart');
    newCart=newCart.filter(v=>!v.checked);
    wx.setStorageSync('cart', newCart);
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
     
    })

  }
  
  

})