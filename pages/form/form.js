// pages/form/form.js
Page({

  /**
   * Page initial data
   */
  data: {
    problemDesc: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    this.getTabBar().init();
    this.updateLocationDesc();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  onLocChanged() {
    this.updateLocationDesc()
  },

  updateLocationDesc() {
    this.setData({
      locMsg: this.selectComponent("#locationButton").data['desc']
    })
  },

  updateProblemDescValue(e) {
    this.setData({
      problemDesc: e.detail.value
    })
  },

  extractFilename(url) {
    // Use the lastIndexOf method to find the last '/' character in the URL
    const lastSlashIndex = url.lastIndexOf('/');
    
    // Extract the substring starting right after the last '/' character
    const filename = url.substring(lastSlashIndex + 1);
    
    return filename;
  },

  submitFeedback() {

    // const fileList = this.selectComponent(".file-upload").data['fileList'];
    const fileList = this.selectComponent(".file-upload").data['fileList']
    const videoFiles = fileList.filter(media => media.type === 'video');
    const videoFileNames = videoFiles.map(media => this.extractFilename(media.url));
    const imageFiles = fileList.filter(media => media.type === 'image');
    const imageFileNames = imageFiles.map(media => this.extractFilename(media.url));
    const filePaths = fileList.map(media => media.url);

    // Convert the IssueDto data to JSON string
    const issueDto = {
      platformId: 1,
      classification: this.selectComponent(".category-picker").data['pickedValue'],
      description: this.data.problemDesc,
      locationDescription: this.selectComponent(".loc-btn").data['address'],
      longitude: this.selectComponent(".loc-btn").data['longitude'],
      latitude: this.selectComponent(".loc-btn").data['latitude'],
      photoFileNames: imageFileNames,
      videoFileNames: videoFileNames
    };

    wx.request({
      url: 'http://localhost:8080/api/issue/save',
      data: JSON.stringify(issueDto),
      method: 'POST',
      header:{
        'token': wx.getStorageSync('authToken'),
        'userId': wx.getStorageSync('userId')
      }
    })

  }

})