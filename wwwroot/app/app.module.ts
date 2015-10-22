module AngularTs {
    'use strict';

    export var app: angular.IModule =
        angular.module('angularTs', ['AdalAngular','angularTs.adal','angularTs.core', 'angularTs.home', 'blocks.log', 'blocks.exception', 'blocks.router']);
        
    app.service('powerBi', PowerBi.API.Service);
}
