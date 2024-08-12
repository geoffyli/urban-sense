Component({
  data: {
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
      },
    ],
  },
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      const { fileList } = this.data
      // Store the file content in the fileList and formData
      fileList.push({ ...file });
      this.setData({ fileList });
      console.log(fileList)
    },
  }
});