<?php
require('init.php');
@$phone=$_REQUEST['phone'] or die('phone required');
$sql = "SELECT uid FROM user WHERE phone='$phone'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
    $output['code'] = 1;
    $output['msg'] = 'exist';
}else {
    $output['code'] = 2;
    $output['msg'] = 'non-exist';
}

echo json_encode($output);