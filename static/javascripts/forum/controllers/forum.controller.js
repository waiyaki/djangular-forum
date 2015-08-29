(function(){
    'use strict';

    angular.module('forum.forums.controllers')
        .controller('ForumController', ['Forum', '$routeParams', '$mdToast', '$location', function(
                Forum, $routeParams, $mdToast, $location){

            var vm = this;

            vm.threads = [];
            vm.forum = undefined;
            vm.threads_loaded = false;  // Show loading bar.

            vm.navigate = function(slug) {
                var url = '/threads/' + slug;
                $location.path(url);
            }

            function activate(){
                var slug = $routeParams.forum_slug;
                Forum.get(slug).then(function(success){
                    vm.forum = success.data;
                    Forum.threads(slug).then(function(success){
                        vm.threads = success.data;
                        vm.threads_loaded = true;
                    }, function(error){
                        $mdToast.showSimple('Unable to load threads.');
                        vm.threads_loaded = true;   // No threads to load, anyway :\
                    });
                }, function(error){
                    $mdToast.showSimple('Unable to load forum');
                    $location.path('/');
                });

            }

            activate();
        }]);
})();
