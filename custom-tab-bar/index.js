Component({
  data: {
      value:0,
      tabBar: [{
       url:'/pages/home/home',
        icon: 'home',
        label: '首页',
      },{
          url:'/pages/form/form',
          icon: 'form',
          label: '反馈',
        }, {
       url:'/pages/user/user',
        icon: 'user',
        label: '用户'
      }]
    },
  
      methods: {
        onChange(e) {
            //console.log(e)
          this.setData({ value: e.detail.value });
          wx.switchTab({
              url: this.data.tabBar[e.detail.value].url
           });
        },
        init() {
            const page = getCurrentPages().pop();
            this.setData({
           　  value: this.data.tabBar.findIndex(item => item.url === `/${page.route}`)
            });
           }
        },
})