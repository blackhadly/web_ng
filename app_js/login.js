$(function (){
  var uname,upwd;
  $("#uname").blur(unameCheck);
  $("#upwd").blur(upwdCheck);
  $("#login").click(function(){
    if(unameCheck()&&upwdCheck()){
      $.ajax({
        type:'post',
        url:'php/login.php',
        data:{uname:uname,upwd:upwd},
        success:function(data){
          if(data.code==1){
            sessionStorage.uid=data.uid;
            sessionStorage.uname=data.uname;
            history.go(-1);
          }
          else{
            $('#uname').parents('dl').find('.tips').show().text('用户名或密码错误');
          }
        }
      });
    }
  });
  // 用户名验证
  function unameCheck(){
    uname=$.trim($('#uname').val());
    if(!uname) {
      $('#uname').siblings("i").show();
      $('#uname').parents("dl").find('.tips').show().text('用户名不能为空');
      return false;
    }else{
      $("#uname").siblings('i').hide();
      $('#uname').parents('dl').find('.tips').hide();
      return true;
    }
  }
  // 密码验证
  function upwdCheck(){
    upwd=$.trim($('#upwd').val());
    if(!upwd){
      $('#upwd').siblings('i').show();
      $('#upwd').parents('dl').find('.tips').show().text('密码不能为空');
    }else{
      $('#upwd').siblings('i').hide();
      $('#upwd').parents('dl').find('.tips').hide();
      return true;
    }
  }
});
