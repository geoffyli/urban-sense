Component({
  data: {
    flag: false,
    text: "上传位置",
    name: "未选择位置",
    address: "None",
    latitude: null,
    longitude: null
  },
  /**
   * Component methods
   */
  methods: {
    chooseLoc() {
      if (this.data.flag) {
        this.setData({
          flag: false,
          text: "上传位置",
          name: "未选择位置",
          address: "None",
          latitude: null,
          longitude: null
        })
      } else {
        wx.chooseLocation({
          success: (res) => {
            this.setData({
              name: res.name,
              address: res.address,
              text: "取消上传",
              latitude: res.latitude,
              longitude: res.longitude,
              flag: true
            });
          },
          fail: () => { },
          complete: () => { }
        });
      }
      // Emit a custom event with the location data
      this.triggerEvent('locChanged', null);
    }
  }

});
