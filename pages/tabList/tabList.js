
var app = getApp();
Page({
 
  data: {
   
    tabViewHeight: 45,
    custom_list_value:'未过期',
    windowWidth: 375,
    tabItemWidth:80,
    tabItemMinWidth:80,
    tab_left:0,
    tabText: ['全部类型', '折扣券', '代金券' ,'兑换券', '优惠券'],
    selectedIndex: 0,//tabView 选中的index 默认第一个
    items: ["item1", "item2", "item3", "item4", "item5", "item6","item7","item8", "item9"]
  },
  showToast: function (text) {
    app.func.showToast(this, text);
  },
  onItemClick:function(e){
      var index = e.currentTarget.dataset.index;
      if(index%2 == 0){
          this.showToast('toast');
      }else{
          app.func.showDialog(this,'提示',function(dialog){
              dialog.dismiss();
          },function(dialog){
              dialog.dismiss();
          });
      }
  },
  onCustomTabClick: function () {//点击选择是否过期按钮
    if (this.data.custom_list_show){
      this.setData({
        custom_list_show:false
      });
    }else{
      this.setData({
        custom_list_show: true
      });
    }
  },
  onCustomListItemClick:function(e){
    this.canLoadMore = true;
    this.currentSize = 0;
    var value = e.currentTarget.dataset.value;
    console.log('e:',e);
    var isUnexpired = true;
    if(value == '未过期'){
      isUnexpired = true;
    }else if(value == '已过期'){
      isUnexpired = false;
    }else{
      isUnexpired = null;//表示全部
    }
    this.setData({
      custom_list_value:value,
      custom_list_show: false,
      isUnexpired: isUnexpired      
    });
    
  },
  
  
  updateTabViewWidthOrScrollX(windowWidth,currentPage, isLoadFinish){
    
    var tabViewWidth = windowWidth * 0.77;
    var tabSize = this.data.tabText.length;
    var tabItemWidth = this.data.tabItemWidth;
    var tabItemMinWidth = this.data.tabItemMinWidth;
    if (isLoadFinish){//1.更新tab宽度
        if (tabSize> 0) {
          var curTabWidth = tabItemWidth * tabSize;//当前tab合计宽度
          if (curTabWidth < tabViewWidth) {//小于容器宽度
            tabItemMinWidth = tabViewWidth / tabSize;
            this.setData({
              tabItemMinWidth: tabItemMinWidth
            });
          }else{
            this.setData({
              tabItemMinWidth: 0
            });
          }
        }     
    }
    //2.更新当前选中tab位置
    var itemWidth = Math.max(this.data.tabItemMinWidth, this.data.tabItemWidth);
    var tab_left = this.data.tab_left;//至滚动像素 
    if (itemWidth * tabSize > tabViewWidth) {
      // 如果tab不是固定的 就要 检测tab是否被遮挡
      var show_item_num = Math.floor(tabViewWidth /itemWidth); // 一个界面完整显示的tabitem个数如显示3个 当前第4页
      var min_left_item = itemWidth*(currentPage - show_item_num + 1); // 最小在右边 等于1= 
      var max_left_item = itemWidth*currentPage; //  最大在左边  3 
      if (tab_left < min_left_item || tab_left > max_left_item) {
        // 如果被遮挡，则要移到当前元素居中位置
        //tab_left = ((max_left_item - min_left_item) / 2 + min_left_item)*itemWidth;
        tab_left = max_left_item - (tabViewWidth - itemWidth) / 2;
      }
    }
    this.setData({
      tab_left: tab_left
    });

  },
  // 页面切换的时候更新  tab位置 防止选中tab不可见
  updateTabView(currentPage,isLoadFinish) {
    if (this.data.windowWidth != 375){//说明之前已经获取了屏幕宽度
      this.updateTabViewWidthOrScrollX(this.data.windowWidth, currentPage, isLoadFinish);
      return;
    }
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        that.setData({
          windowWidth: windowWidth
        });
        that.updateTabViewWidthOrScrollX(windowWidth, currentPage, isLoadFinish);
      },
      fail(){
        that.updateTabViewWidthOrScrollX(that.data.windowWidth, currentPage, isLoadFinish);
      }
    });
  },
  //当页面切换选中的时候
  onPageSelectd: function (e) {
    var currentIndex = e.detail.current;

    console.log('current:' + currentIndex);
    var items = this.data.items;
    this.setData({
      selectedIndex: currentIndex,
      items: items
    });
    this.updateTabView(currentIndex, false);
       
  },
  //点击tabView切换page
  onTabClick: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log('index:', index);
    this.setData({
      selectedIndex: index
    });
  },
  onLoad: function () {
    var _this = this;
    //获取屏幕高度  
    wx.getSystemInfo({
      success: function (res) {
        //750rpx = 375px
        var tabViewHeight = res.windowHeight*90/750;
        _this.setData({
          windowWidth: res.windowWidth,
          tabViewHeight: tabViewHeight
        });             
      }
    });
    
  }
})