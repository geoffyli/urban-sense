Component({
  data: {
    fileList: [],
  },
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      const { fileList } = this.data
      // Store the file content in the fileList and formData
      fileList.push({ ...file });
      this.setData({ fileList });
    },
  }
});