$(function () {
    if (sessionStorage.uid) {
      var userHtml = `<a href="user/user.html"><em class="icon-user"></em>个人中心<em class="icon-triangle"></em></a>
                        <div class="user_dropdown">
                        <p><span>${sessionStorage.uname}</span>，您好~<br>您在平台共购买了<span>x</span>门课程。</p>
                        <div class="userlink_1 clearfloat">
                        <a href="">我购买的课程</a>
                        <a href="">我的收藏</a>
                        </div>
                        <div class="userlink_2 clearfloat">
                        <a href="#/user/1">进入个人中心</a>
                        <a href="" class="user_quit">退出登陆</a>
                        </div>
                        </div>`;
      $('.n_user').html(userHtml);
    //个人中心下拉菜单
      $('.n_user').mousemove(function () {
        $(".user_dropdown").stop().slideDown(100);
      }).mouseout(function () {
        $(".user_dropdown").stop().slideUp(100);
      });
      //退出登录
      $('.user_quit').click(function(){
        sessionStorage.clear();
		history.go(-1);
      });
    }
});
