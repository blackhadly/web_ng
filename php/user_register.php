<?php
@$uname = $_REQUEST['uname'] or die('uname required');
@$upwd = $_REQUEST['upwd'] or die('upwd required');
@$phone = $_REQUEST['phone'] or die('phone required');
require('init.php');
$output['uname']=$uname;
$sql = "INSERT INTO user (uname,phone,upwd) VALUES('$uname','$phone','$upwd')";
$result = mysqli_query($conn,$sql);
if($result){
    $output['code'] = 1;
    $output['uid'] = intval(mysqli_insert_id($conn));
}else {
    $output['code'] = 500;
}

echo json_encode($output);