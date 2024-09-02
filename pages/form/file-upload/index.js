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
          const responseData = JSON.parse(res.data);
          console.log(res.data)
          console.log(responseData)
          const filePath = responseData.data;
          console.log("In uploader: filePath from API: " + filePath)
          // Store the file content in the fileList and formData
          const { fileList = [] } = this.data;
          file['filePath'] = filePath;
          fileList.push({ ...file });
          this.setData({ fileList });
          console.log("In uploader: fileList: ")
          console.log(fileList)
        }
      })
    },
  }
});