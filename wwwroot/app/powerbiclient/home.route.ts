module AngularTs.PowerBIClient {
    'use strict';

    var powerbiclient = angular.module('angularTs.powerbiclient');

    powerbiclient.run(appRun);

    function appRun(routerHelper : Blocks.Router.IRouterHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'powerbiclient',
                config: {
                    url: '/powerbiclient',
                    templateUrl: 'app/powerbiclient/home.html',
                    title: 'PowerBI Client',
                    controller: 'powerbiClientController',
                    controllerAs: 'vm',
                     requireADLogin: true
                }
            }
        ];
    }
}
