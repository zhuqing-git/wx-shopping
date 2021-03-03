//同时发送异步请求次数
let ajaxTimes=0;



export const request=(params)=>{
    // //判断url是否为私有路径
    // let header={};
    // if (params.url.include("/public/v1/"))
ajaxTimes++;
    //显示加载中 效果
wx.showLoading({
    title:"加载中",
    mask:true

})

    //定义公共url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete: function() {
                ajaxTimes--;
                if(ajaxTimes===0)
                {
                    wx.hideLoading();
                }
           
            }
                
            }
        )
    });
}