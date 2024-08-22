Component({
  data: {
    flag: false,   // True: Loc selected
    theme: "", 
    btnText: "上传位置",
    desc: "未选择位置",
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
          btnText: "上传位置",
          theme: "",
          desc: "未选择位置",
          address: "None",
          latitude: null,
          longitude: null
        })
      } else {
        wx.chooseLocation({
          success: (res) => {
            this.setData({
              desc: res.name == ""? "地图选点": res.name,
              address: res.address,
              btnText: "取消上传",
              theme: "danger",
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
