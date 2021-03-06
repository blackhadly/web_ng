$(function(){
  //获取cid
  var str=location.href;
  var cid=str.substr(str.lastIndexOf('=')+1);
  //发送请求
  $.ajax({
    type:'post',
    url:'php/course_detail.php',
    data:{cid:cid},
    success:function(d){
      //console.log(d);
      $('.course_img>img').attr('src',d.pic);
      $('.course_info>h2').text(d.title);
      var listHtml='<li>讲师：'+d.tname+'</li>'
        +'<li>课时：'+d.cLength+'</li>'
        +'<li>开课时间：'+d.startTime+'</li>'
        +'<li>上课地点：'+d.address+' <a href="#/address">查看各校区地址</a></li>';
      $('.course_info>ul').html(listHtml);
      $('#price').append(d.price);
      $('.details').html(d.details);
    }
  });

  //添加购物车
  $('#addCart').click(function(){
    if(sessionStorage.uid){//已登录
      $.ajax({
        type:'post',
        url:'php/cart_add.php',
        data:{uid:sessionStorage.uid,cid:cid},
        success:function(d){
          //console.log(d);
          if(d.code==1){
            //alert("添加成功");
            cartUpdate();
          }else{
            alert("购物车中已存在该课程");
          }
        }
      });
    }else{//未登录
      location.href="#/login";
    }
  });
});