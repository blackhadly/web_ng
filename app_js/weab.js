var app = angular.module('webApp', ['ng', 'ngRoute', 'ngSanitize']);
app.config(
  function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'tpl/main.html',
		controller: 'mainCtrl'
      })
      .when('/address', {
        templateUrl: 'tpl/address.html',
		controller: 'addressCtrl'
      })
      .when('/cart', {
        templateUrl: 'tpl/cart.html',
        controller: 'cartCtrl'
      })
      .when('/collaborator', {
        templateUrl: 'tpl/collaborator.html',
		controller: 'collaboratorCtrl'
      })
      .when('/login', {
        templateUrl: 'tpl/login.html',
		controller: 'loginCtrl'
      })
      .when('/course_detail/:cid', {
        templateUrl: 'tpl/course_detail.html',
        controller: 'detailCtrl'
      })
      .when('/course', {
        templateUrl: 'tpl/course.html',
        controller: 'courseCtrl'
      })
      .when('/course/:tid', {
        templateUrl: 'tpl/course.html',
        controller: 'courseCtrl'
      })
      .when('/register', {
        templateUrl: 'tpl/register.html',
		controller: 'registerCtrl'
      })
      .when('/user/:pid', {
        templateUrl: 'user/user.html',
        controller: 'userCtrl'
      })
      .when('/personal/:pid', {
        templateUrl: 'user/personal.html',
        controller: 'userCtrl'
      })
      .when('/mycourse/:pid', {
        templateUrl: 'user/mycourse.html',
        controller: 'userCtrl'
      })
      .when('/favorite/:pid', {
        templateUrl: 'user/favorite.html',
        controller: 'userCtrl'
      })
      .when('/changepwd/:pid', {
        templateUrl: 'user/changepwd.html',
        controller: 'userCtrl'
      })
      .otherwise('main');
  }
);
app.controller('parentCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
  $scope.getCourseData = function (n, t) {
    $http.get('php/course.php?type=' +
      t + '&pageNum=' + n).success(function (result) {
      $scope.courseData = result;

      //需要一个记载所有页码的数组，页面上显示
      $scope.pageArray = [];
      for (var i = 0; i < result.pageCount; i++) {
        $scope.pageArray[i] = i + 1;
      }

      console.log(result);
    });
  };
  //更新购物车
  $scope.updateCart = function () {
    if (sessionStorage.uid)
      $http.get('php/cart_select.php?uid='
        + sessionStorage.uid).success(function (result) {
        //记载下来
        $scope.did = [];
        $scope.cart = result.data;
        $scope.cartCount = result.data.length;
        if ($scope.cartCount == 0) {
          $scope.kong = true
        } else {
          $scope.kong = false
        }
        $scope.sumPrice = 0;
        for (var i = 0; i < result.data.length; i++) {
          $scope.sumPrice += parseFloat(result.data[i].price);
          $scope.did[i] = result.data[i].did;
        }
      });
	  console.log($scope);
  };
  $scope.delete = function (i) {
    $http.get('php/cart_delete.php?did=' + $scope.did[i])
      .success(function (d) {
        if (d.code == 1) {
          $scope.updateCart();
        }
      });
  };
  $scope.reserve=function () {
    console.log("ss");
    $scope.updateCart();
  };
}]);


app.controller('courseCtrl', ['$scope', '$http', '$routeParams','$rootScope',
  function ($scope, $http, $routeParams,$rootScope) {
	if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	$rootScope.isLogin = false;
  }
	  $scope.updateCart();
    //获取所有的课程类型数据
    $http.get('php/type_select.php').success(function (result) {
      console.log(result);
      //在数组的最前面，插入一条“不限”
      result.unshift({tpid: "0", tpname: "不限"});
      $scope.typeData = result;
    });

    //获取当前的课程类型的 id 的值
    $scope.currentType = $routeParams.tid || 0;

    //获取该类型下所有的课程数据:初始化加载的时候,翻页的时候
    $scope.getCourseData(1, $scope.currentType);

  }]);
app.controller('detailCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$location',
  function ($scope, $http, $routeParams, $rootScope, $location) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
    $scope.updateCart();
    //获取传递过来的参数，查询服务器端课程的数据
    $http.get('php/course_detail.php?cid=' + $routeParams.cid)
      .success(function (result) {
        $scope.course = result;
      });

    //定义加入购物车的功能
    $scope.addCart = function () {
      if (!sessionStorage.uid) {
        $location.path('/login');
      }
      else {
        $http.get('php/cart_add.php?uid='
          + sessionStorage.uid + '&cid=' + $routeParams.cid)
          .success(function (result) {
            if (result.code == 1) {
              alert('add success!');
              $scope.updateCart();
            }
          });
      }
    };
  }]);
app.controller('userCtrl', ['$scope','$routeParams','$rootScope', function ($scope,$routeParams,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
	$scope.updateCart();
  $scope.personType = $routeParams.pid;
}]);
app.controller('mainCtrl', ['$scope','$rootScope',function ($scope,$rootScope) {
  $scope.updateCart();
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
  console.log($scope.isLogin);
}]);
app.controller('cartCtrl', ['$scope','$http','$rootScope', function ($scope,$http,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
  $scope.updateCart();
  $scope.delmore=function(){
  var checkE=document.getElementsByClassName('cart_checkbox');
    $scope.dids=[];
  for(var i=0;i < checkE.length;i++){
    if(checkE[i].checked){
      $scope.dids[i]=checkE[i].parentElement.parentElement.getAttribute('data-did');
    };
   }
   // var url ="php/cart_delete_more.php";
   //   var postCfg = {
   //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
   //     transformRequest: function (data) {
   //       return $.param(data);
   //     }
   //   };
    $http({
      method:'post',
      url:'php/cart_delete_more.php',
      data:{dids:$scope.did},
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      transformRequest:function(data) {
        return $.param(data);
      }
    }).success(
      function (result) {
        console.log(result);
        if (result.code == 1) {
          alert('add success!');
          $scope.updateCart();
        }
      }
    );
  };
  $scope.clear=function(){
    $scope.clear=function(){
      $http({
        method:'post',
        url:'php/cart_clear.php',
        data:{uid:sessionStorage.uid},
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        transformRequest:function(obj) {
          var str = [];
          for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
      }).success(
        function (result) {
          console.log(result);
          if (result.code == 1) {
            alert('add success!');
            $scope.updateCart();
          }
        }
      );
    }
  }
}]);
app.controller('addressCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
	$scope.updateCart();
}]);
app.controller('addressCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
	$scope.updateCart();
}]);
app.controller('collaboratorCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
	$scope.updateCart();
}]);
app.controller('loginCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
	$scope.updateCart();
}]);
app.controller('registerCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
  if (sessionStorage.uid) {
    $rootScope.isLogin = true;
  }
  else{
	  $rootScope.isLogin = false;
  }
	$scope.updateCart();
}]);