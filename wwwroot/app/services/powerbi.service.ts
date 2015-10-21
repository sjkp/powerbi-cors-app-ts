module PowerBi.API {	
	
	export interface IGroup 
	{
		id: string,
		name: string
	}
	
	export interface ITile {
		id: string,
		embedUrl: string,
		title: string
	}
	
	export interface IDashboard
	{
		
	}
	
	export interface IService 
	{
		/**
		 * getGroups return a promise for the list of power bi groups
		 */
		getGroups() : ng.IPromise<any>;
		getDashboards() : ng.IPromise<any>;
		getTiles(dashboardId : string) : ng.IPromise<any>;
		getDatasets() : ng.IPromise<ITile[]>;
	}
	
	export class Response<T> {
		public value : T[];
	}
	
	const endpoint = "https://api.powerbi.com/beta/myorg"; //Cors only enabled on beta
	export class Service implements IService {
		static $inject = ['$http', '$q'];
		constructor(private http: ng.IHttpService, private q : ng.IQService) 
		{
			
		}
		
		public getGroups() {
			return this.doCall('groups');
		}
		
		public getDashboards() {
			return this.doCall('dashboards');
		}
		
		public getTiles(dashboardId: string)
		{
			return this.doCall('dashboards/'+dashboardId+'/tiles');
		}
		
		public getDatasets()
		{
			return this.doCall('datasets');
		}
		
		private doCall<T>(query : string)
		{
			var defer = this.q.defer();
			 this.http.get(endpoint+'/'+query).success((res: Response<T>) => {
				 defer.resolve(res.value);
			 }).error((err) => {
				 defer.reject(err);
			 })
			
			return defer.promise;
		}
	}
}