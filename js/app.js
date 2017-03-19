(function(angular) {
  'use strict';

  /**
   * MyTodoMvc Module
   *
   * 应用程序的主要的模块
   */
  var myApp = angular.module('MyTodoMvc', []);

  // 注册一个主要的控制器
  myApp.controller('MainController', ['$scope','$location', function($scope,$location) {

    // 文本框需要一个模型
    $scope.text = '';

    // 任务列表也需要一个
    // 每一个任务的结构 { id: 1, text: '学习', completed: true }
    $scope.todos = [{
      id: 1,
      text: '学习',
      completed: false
    }, {
      id: 2,
      text: '睡觉',
      completed: false
    }, {
      id: 3,
      text: '打豆豆',
      completed: true
    }, ];

    // 自动获取ID的函数
    function getID(){
      var id = Math.random();
      for(var i = 0 ; i < $scope.todos.length ; i ++){
        if(id == $scope.todos[i].id){
          getID();
          break;
        }
      }
      return id;
    }
    // 添加todo
    $scope.add = function() {
      $scope.todos.push({
      	// 自动增长？
        id: getID(),
        // 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
        text: $scope.text,
        completed: false
      });
      // 清空文本框
      $scope.text = '';
    };

    // 删除todo
    $scope.remove = function(id){
      for(var i = 0 ; i < $scope.todos.length ; i ++){
        if(id == $scope.todos[i].id){
          $scope.todos.splice(i,1);
        }
      }
    }

    // 清空已完成
    $scope.clearCompleted = function(){
      var result = [];
      for(var i = 0 ; i < $scope.todos.length ; i ++){
        if($scope.todos[i].completed == false){
          result.push($scope.todos[i]);
        }
      }
      console.log(result);
      $scope.todos = result;
    }

    // 是否有已完成的
    $scope.existCompleted = function(){
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i].completed) {
          return true;
        }
      }
      return false;
    }

    // 当前的编辑元素
    $scope.currentEditingId = -1;
    $scope.editing = function(id){
      $scope.currentEditingId = id;
    }
    $scope.save = function(){
      $scope.currentEditingId = -1;
    }

    // 切换全部状态
    var now = true;
    $scope.toggleAll = function(){
      for(var i = 0 ; i < $scope.todos.length ; i ++){
        $scope.todos[i].completed = now;
      }
      now = !now;
    }

    // 过滤器显示
    $scope.selector = {};
    $scope.$location = $location;
    // console.log(path);
    $scope.$watch('$location.path()',function(now,old){
      switch(now){
        case '/active':
        $scope.selector = {completed : false};
        break;
        case '/completed':
        $scope.selector = {completed : true};
        break;
        default :
        $scope.selector = {};
      }
    })
  }]);
})(angular);
