// pages/user/login-btn/index.js
Component({

  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    wxLogin() {
      wx.getUserInfo({
        desc: '登陆的数据',
        success(user){
          wx.login({
            success: (res) => {
              if (res.code) {
                // Request backend service
                wx.request({
                  method: "POST",
                  url: "http://localhost:8080/api/user/login",
                  data: {
                    code: res.code
                  },
                  success: function (res){
                    if (res.statusCode === 200) {
                      const token = res.data.data.token;
                      const userId = res.data.data.id;
                      wx.setStorageSync('authToken', token);
                      wx.setStorageSync('userId', userId);
                      wx.showToast({
                        title: 'Login successful',
                        icon: 'success'
                      });
                      // Redirect or perform additional actions
                    } else {
                      wx.showToast({
                        title: res.data.errorMessage || 'Login failed',
                        icon: 'none'
                      });
                    }
                  }               
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            },
          })
        }
      })
    }
  }
})