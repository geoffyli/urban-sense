Component({
  data: {
    fileList: [],
  },
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      // Upload the file to the back-end
      wx.uploadFile({
        filePath: file.url,
        name: 'file',
        url: 'http://localhost:8080/api/file/uploadFiles',
        header: {
          "Content-Type": "multipart/form-data",
          'token': wx.getStorageSync('authToken'),
          'userId': wx.getStorageSync('userId')
        },
        success: (res) => {
          const { fileList = [] } = this.data
          // Store the file content in the fileList and formData
          fileList.push({ ...file });
          this.setData({ fileList });
        }
      })

    },
  }
});