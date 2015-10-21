interface Window 
{
    receiveMessage(event: any): void;   
    fabric: any;
}

module AngularTs.Home {
    'use strict';

    var home = angular.module('angularTs.home');

    export class HomeController {
        static $inject = ['adalAuthenticationService','powerBi','powerBIResourceId'];

        public msg : string;
        public dashboards : PowerBi.API.IDashboard[] = [];
        public tiles: PowerBi.API.ITile[] = [];
        private accessToken: string;
        private height = 500;
        private width = 500;

        constructor(private adalAuthenticationService: any, private powerBi : PowerBi.API.IService, powerBIResourceId: string) {
           this.msg = 'Welcome to PowerBI Cors Sample';           
           
           powerBi.getDashboards().then((res: PowerBi.API.IDashboard[]) => {
               this.dashboards = res;
                console.log(res);
           },(err: any) => {console.log(err);});
           
           adalAuthenticationService.acquireToken(powerBIResourceId).then((res:any) => {
               this.accessToken = res;
            //    console.log(res);
           }, (err:any) => {
               console.error(err);
           });
       
           //How to navigate from a Power BI Tile to the dashboard
            // listen for message to receive tile click messages.
            $(window).on('message', this.receiveMessage);         
        }
        
        public selectDashboard(id : string)
        {
            this.powerBi.getTiles(id).then((res) => {
                console.log(res);
                this.tiles = res;
            }, console.error);
        }
        
        public insertTile(tile : PowerBi.API.ITile)
        {            
            var iframe  = this.getIframe();
            iframe.src = tile.embedUrl + "&width="+this.width+"&height="+this.height;
            iframe.onload = () => {
                if ("" === this.accessToken)
                    return;

                var h = this.height;
                var w = this.width; 

                // construct the push message structure
                var m = { action: "loadTile", accessToken: this.accessToken, height: h, width: w };
                var message = JSON.stringify(m);
                console.log(this.accessToken);
                // push the message.
                var iframe = this.getIframe();
                iframe.contentWindow.postMessage(message, "*");;
            }
        } 
        
        public receiveMessage(event: any) {
            var data = event.originalEvent.data;
               if (data) {
                   try {
                       var messageData = JSON.parse(data);
                       if (messageData.event === "tileClicked") {
                           //Get IFrame source and construct dashboard url
                           var iFrameSrc = (<HTMLIFrameElement>document.getElementById('embedIframe')).src;

                           //Split IFrame source to get dashboard id
                           var dashboardId = iFrameSrc.split("dashboardId=")[1].split("&")[0];

                           //Get PowerBI service url
                           var urlVal = iFrameSrc.split("/embed")[0] + "/dashboards/{0}";
                           var urlVal = urlVal.replace("{0}", dashboardId);

                           window.open(urlVal);
                       }
                   }
                   catch (e) {
                       // In a production app, handle exception
                   }
               }
           }
                  
        
        private getIframe()
        {
            return <HTMLIFrameElement>document.getElementById('embedIframe');
        }
    }

    home.controller('homeController', HomeController);
}
