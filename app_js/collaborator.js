$(function(){
  //发送一个请求，获取所有的老师数据
  $.ajax({
    type:'post',
    url:'php/collaborator_select.php',
    success:function(result){
      console.log(result);
      var htmlStr='';
      for(var i=0;i<result.length;i++){
        htmlStr+='<li class="clearfloat">'
          +'<img src="'+result[i].tpic+'" alt=""/>'
          +'<div>'
          +'<h3>'+result[i].tname+'<span>'+result[i].maincourse+'</span></h3>'
          +'<dl>'
          +'<dt>工作经历：</dt>'
          +'<dd>'+result[i].experience+'</dd>'
          +'</dl>'
          +'<dl>'
          +'<dt>授课风格：</dt>'
          +'<dd>'+result[i].style+'</dd>'
          +'</dl>'
          +'</div>'
          +'</li>';
      }
      $('.teacher_list>ul').html(htmlStr);
    }
  });
});




