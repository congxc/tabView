//app.js
var toast = require('/toast.js');
var dialog = require('/dialog.js');//提示确认对话框

App({
  onLaunch: function () {
   
  },
  isDebug:false
  ,
  onShow:function(){
    console.log('App Show');
  },
  onHide:function(){
    console.log('Ap onHide');
  },
  //错误信息
  onError: function (msg) {
      console.log("onError:"+ msg);
  } ,
  //注册操作接口方法
  func:{
    showToast:toast.showToast,
    showDialog:dialog.showDialog
  }
})