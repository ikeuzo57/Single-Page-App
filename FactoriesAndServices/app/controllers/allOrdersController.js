(function() {
    
    var AllOrdersController = function ($scope, customersFactory) {
        $scope.orders= 'null';
        $scope.ordersTotal = 0.0;
        $scope.totalType;
        
        
        function init() {
            //Note: The success() function has been deprecated with Angular 1.5+ and then() is now
            //recommended as shown below.
           customersFactory.getOrders()
                .success(function(customers) {
                    $scope.orders = orders;
                    getOrdersTotal();
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
       

//               customersFactory.getOrders()
//                .then(function(response) {
//                    $scope.customers = response.data;
//                }, function(data, status, headers, config) {
//                    $log.log(data.error + ' ' + status);
//                });
        }
        
        function getOrdersTotal(){
            var total = 0;
            for (var i=0, len=$scope.orders.length;i<len;i++){
                total +=$scope.orders[i].total;
            }
            $scope.ordersTotal= total;
            $scope.totaltype = ($scope.ordersTotal >100) ? 'success' : 'danger';
        }
        
        init();
        
    };
    
  AllOrdersController.$inject = ['$scope', 'customersFactory'];

    angular.module('customersApp')
      .controller('AllOrdersController', AllOrdersController);
    
}());