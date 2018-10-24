<?php
@$cid = $_REQUEST['cid'] or die('cid required');

require('init.php');
$sql = "SELECT * FROM course,teacher WHERE cid=$cid and course.teacherId=teacher.tid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
    $output = $row;
}
echo json_encode($output);