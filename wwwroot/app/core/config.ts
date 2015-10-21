module AngularTs.Core {
    'use strict';

    var core = angular.module('angularTs.core');

    var config = {
        appErrorPrefix: '[angularTs Error] ',
        appTitle: 'angularTs'
    };

    core.value('config', config);
}
