//自定义toast
function showToast(page,text){
      if(page.data.show){
        return;
      }
      page.setData({
        show:true,
        toast:text
      });
      setTimeout(function(){
         page.setData({
            show:false
          });
      },2000);
  }
  module.exports = {
      showToast:showToast
  }