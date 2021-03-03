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
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  //经常用到比load节省性能
  onShow() {
    //获取缓存中地址
    const address = wx.getStorageSync('address');
    //获取缓存中购物车
    const cart = wx.getStorageSync('cart') || [];
    //every遍历 如果是空数组，那么返回true 性能优化
    //const allChexked=cart.length?cart.every(v=>v.checkd):false;

    this.setData({
      address
    });
    this.setCart(cart);


  },

  //button点击事件(注意对权限的管理bug)
  async handleChooseAddress() {
    try {
      //有bug 一直默认授权
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];

      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;

      wx.setStorageSync('address', address)

    } catch (error) {
      console.log(error);

    }
  },

  //商品的选中
  bindItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);

  },
  //设置购物车状态同时 重新计算 底部数据 并填充到data和保存
  setCart(cart) {

    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {

        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;

    //赋值
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
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
  //商品数量的编辑
  async handleItemNumEdit(e) {

    const {
      operation,
      id
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      //弹窗提示
      const res = await showModal({
        content: "您是否要删除？"
      });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);

      }

    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }


  },
  //商品结算
async handlePay(){
    const {address,totalNum}=this.data;
    if(!address.userName)
    {
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    if (totalNum===0) {
      await showToast({title: "您还没有选择商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
      success: function(res){
        // success
      }
      
    })
  }

})