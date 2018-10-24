<?php
require('init.php');
@$pageNum = $_REQUEST['pageNum'] or $pageNum = 1;
@$type = $_REQUEST['type'] or $type = 0;
$output['pageNum'] = intval($pageNum);
$output['type'] = intval($type);
$output['pageSize'] = 3;
if($type==0){
    $sql = "SELECT COUNT(*) FROM course";
}else{
    $sql = "SELECT COUNT(*) FROM course WHERE typeId=$type";
}
$result = mysqli_query($conn,$sql);
$output['totalRecord'] = intval( mysqli_fetch_row($result)[0] );
$output['pageCount'] = ceil($output['totalRecord']/$output['pageSize']);

$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];
if($type==0){
    $sql = "SELECT * FROM course,type,teacher WHERE course.typeId=type.tpid and course.teacherId=teacher.tid ORDER BY cid DESC LIMIT $start,$count";
}else{
    $sql = "SELECT * FROM course,type,teacher WHERE course.typeId=type.tpid and course.teacherId=teacher.tid and typeId=$type ORDER BY cid DESC LIMIT $start,$count";
}
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($output);