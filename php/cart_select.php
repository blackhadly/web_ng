<?php
@$uid = $_REQUEST['uid'] or die('uid required');
require('init.php');
$output['uid'] = $uid;
$sql = "SELECT cid,title,pic,price,did FROM course,cart_detail WHERE cart_detail.courseId=course.cid AND cid IN (SELECT courseId FROM cart_detail WHERE cartId=(SELECT ctid FROM cart WHERE userId=$uid)) AND cart_detail.cartId=(SELECT ctid FROM cart WHERE userId=$uid)";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($output);