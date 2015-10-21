module AngularTs {
    'use strict';

    export var app: angular.IModule =
        angular.module('angularTs', ['AdalAngular','angularTs.adal','angularTs.core', 'angularTs.home', 'blocks.log', 'blocks.exception', 'blocks.router','angularTs.directives.officeUiSpinner']);
        
    app.service('powerBi', PowerBi.API.Service);
}
