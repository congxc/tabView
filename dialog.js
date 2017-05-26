//自定义提示确认对话框
function showDialog(page,text,onConfirm,onCancel){
     
      if(page.data.dialog_show){
        return;
      }
      page.setData({
        dialog_show:true,
        dialog_content:text
      });
      page.onCancel=function(e){
        //   page.setData({
        //     dialog_show:false,
        //   });
          onCancel(this);
      },
    page.onConfirm=function(e){
        // page.setData({
        //   dialog_show:false,
        // });
        onConfirm(this);
    }
    page.onClose = function(e){
       page.setData({
          dialog_show:false,
        });
    },
    page.dismiss=function(e){
        page.setData({
            dialog_show:false,
        });
    }
  }
  //自定义二维码对话框

function showQrcode(page, title, date,isCard,isBlue) {

    if (page.data.qrcode_show) {
      return;
    }
    page.setData({
      qrcode_show: true,
      dialog_title: title,
      dialog_date:date,
      isCard: isCard,
      isBlue:isBlue
    });
    page.onColse = function (e) {
      page.setData({
        qrcode_show: false,
      });
    }
  }
  module.exports = {
      showDialog:showDialog,
      showQrcode: showQrcode
  }