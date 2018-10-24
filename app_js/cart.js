
//全选&全不选
$('.checkbox_all').click(function(){
  if($(this).is(':checked')){//被选中
    $('.cart_checkbox').prop("checked",true);
  }else{//未被选中
    $('.cart_checkbox').prop("checked",false);
  }
});
$('.cartcon_list').on('click','.cart_checkbox',function(){
  if($(this).is(':checked')){//被选中
    var numN=$('.cart_checkbox').size();//总数
    var numC=$('.cart_checkbox:checked').size();//被选中的数量
    if(numN==numC){
      $('.checkbox_all').prop("checked",true);
    }
  }else{//未被选中
    $('.checkbox_all').prop("checked",false);
  }
});