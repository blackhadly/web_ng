<?php
@$uid = $_REQUEST['uid'] or die('uid required');
require('init.php');
$sql="DELETE FROM cart_detail WHERE cartId=(SELECT ctid FROM cart WHERE userId=$uid)";
$result = mysqli_query($conn,$sql);
if($result){
    $output['code']=1;
    $output['msg']='succ';
}else {
    $output['code']=2;
}
echo json_encode($output);