<?php
@$dids = $_REQUEST['dids'] or die('dids required');
require('init.php');

$d=implode(',',$dids);

$sql = "DELETE FROM cart_detail WHERE did in ($d)";
$result = mysqli_query($conn,$sql);

if($result){
    $output['code']=1;
    $output['msg']='succ';
}else {
    $output['code']=2;
}
echo json_encode($output);