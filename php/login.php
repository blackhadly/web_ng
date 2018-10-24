<?php
require ("init.php");
@$uname=$_REQUEST['uname'] or die('uname required');
@$upwd=$_REQUEST['upwd'] or die('upwd required');
$sql="SELECT uid,uname,phone FROM user WHERE (uname='$uname' AND upwd='$upwd') OR (phone='$uname' AND upwd='$upwd')";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){//登录成功
    $output['code']=1;
    $output['uid']=intval($row['uid']);
    $output['uname']=$row['uname'];
    $output['phone']=$row['phone'];
}else{//登录失败
    $output['code']=400;
}
echo json_encode($output);