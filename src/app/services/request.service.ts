import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
	private domain = "https://eddie-ctangarife.c9users.io/api/";
  constructor( private http:Http) { }

  public post(url: string, params:string){
      url = this.domain + url;
        let headers:any;
        let param:any;
        let options:any;

            headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' });
            param = this.serialized(params);
            options = new RequestOptions({ headers: headers, method: "post" });
       
        
        return this.http.post(url, param, options)
            .map((res: Response) =>{
            let body = res.json();

            if(body.status_code==0){
              return Observable.throw('Error en la url');
            }        
                return body || { };
            })
            .catch(this.handleError);
  }//fin del post


 /*  public put(url: string, params:string){
        url = this.domain + url;
        let headers:any;
        let param:any;
        let options:any;

        console.warn(url);

            headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' });
            param = this.serialized(params);
            options = new RequestOptions({ headers: headers, method: "post" });
       
        
        return this.http.put(url, param, options)
            .map((res: Response) =>{
              let body = res.json();
              if(body.status_code==0){
                return Observable.throw('Error en la url');
              }        
                return body || { };
            })
            .catch(this.handleError);
  }//fin del post*/

  public put(url:string, id:number, data:any) {
       
        url = this.domain + url;
        let headers:any;
        let options:any;

        headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' });
        data = this.serialized(data);
        options = new RequestOptions({ headers: headers, method: "put" });
        url+= "/"+id;
        console.log(url,"la url")
        
        return this.http.put(url, data, options)
            .map(this.extractData)            
            .catch(this.handleError);
    }

  public delete(url:string) {  
        url = this.domain + url;
        let headers:any;
        let options:any;  

        console.warn(url);
        
       return this.http.delete(url).map(this.extractData)            
            //.catch(this.handleError);
    }


   public get( url:string, parameters?:any, accion?:any ){
        let result = (accion) ? "?accion="+accion : "";		
        url = this.domain + url;
        let headers:any;
        let options:any;
        
       return this.http.get(url, {params:parameters})
       		
            .map(this.extractData)            
            //.catch(this.handleError);
    }

   private extractData(res: Response) {
   	//console.error("ssss");
   		//console.warn(Response)
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
    	console.error("handleError");
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Promise.reject(errMsg);
    }

  public update(){
  	console.warn("información del post");
  }


  private serialized(obj:any){
        let result = [];
        for (let property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    }
}
