Component({
  data: {
    categoryText: '',
    categoryValue: [],
    categories: [
      // { label: '基础设施', value: '基础设施' },
      // { label: '住房与社区', value: '住房与社区' },
      // { label: '环境保护', value: '环境保护' },
      // { label: '公共服务', value: '公共服务' },
      // { label: '文化与娱乐', value: '文化与娱乐' },
    ],
    pickedValue: null
  },

  lifetimes: {
    attached() {
      // Fetch categories when the component is attached
      this.fetchCategories();
    }
  },

  methods: {
    fetchCategories() {
      wx.request({
        url: 'http://localhost:8080/api/classification/getAll',
        method: 'GET',
        header: {
          'token': wx.getStorageSync('authToken'),
          'userId': wx.getStorageSync('userId')
        },
        success: (res) => {
          if (res.statusCode === 200) {
            // Extract classification names and transform them into { label, value } format
            const categories = res.data.data.map(category => ({
              label: category.classificationName,
              value: category.classificationName
            }));
            // Update the categories data
            this.setData({ categories });
          } else {
            wx.showToast({
              title: 'Failed to load categories',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          wx.showToast({
            title: 'Network error',
            icon: 'none'
          });
        }
      });
    },

    onColumnChange(e) {
    },

    onPickerChange(e) {
      const { key } = e.currentTarget.dataset;
      const { value } = e.detail;

      this.setData({
        pickedValue: value[0],
        [`${key}Visible`]: false,
        [`${key}Value`]: value,
        [`${key}Text`]: value.join(' ')
      })
    },

    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('Picker canceled:');
    },

    onCategoryPicker() {
      this.setData({ categoryVisible: true });
    },
  },
});
