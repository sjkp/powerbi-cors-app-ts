module AngularTs.PowerBIClient {
    'use strict';

    var home = angular.module('angularTs.powerbiclient');

    export class PowerBIClientController {
        static $inject = ['adalAuthenticationService','powerBi','powerBIResourceId'];

        public msg : string;
        public reports : PowerBi.API.IReport[] = [];
        
        private accessToken: string;

        constructor(private adalAuthenticationService: any, private powerBi : PowerBi.API.IService, powerBIResourceId: string) {
           this.msg = 'Welcome to PowerBI Cors Sample';           
           
           powerBi.getReports().then((res: PowerBi.API.IReport[]) => {
               this.reports = res;
                console.log(res);
           },(err: any) => {console.log(err);});
           
           adalAuthenticationService.acquireToken(powerBIResourceId).then((res:any) => {
               this.accessToken = res;
                //    console.log(res);


           }, (err:any) => {
               console.error(err);
           });
      
        }
        
        public selectReport(id: string) {
            var embedConfiguration = {
                type: 'report',
                accessToken: this.accessToken,
                id: id,
                embedUrl: 'https://app.powerbi.com/reportEmbed'
            };
            var $reportContainer = $('#reportContainer');
            var report = window.powerbi.embed($reportContainer.get(0), embedConfiguration);

        }

        
  
        
     
    }

    home.controller('powerbiClientController', PowerBIClientController);
}
