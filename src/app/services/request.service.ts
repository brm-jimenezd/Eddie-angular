import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/*import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';*/


@Injectable({
  providedIn: 'root'
})
export class RequestService {
	private domain = "http://localhost:8888/rest/"
  constructor( private http:HttpClient) { }

  public post(url: string, params:string){
  	url = this.domain+url;
  	

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' });
    let param =  this.serialized(params);
    let options = new RequestOptions({ headers: headers, method: "post" });
     	
    console.warn(param);
     return this.http.post(url, param)
            .subscribe((data) =>{
            	console.warn(data);
            	return data;
            });
           // .catch(this.handleError);
  }//fin del post

  public get(){
  	//get all or get one
  	console.warn("información del post");
  }

  public update(){
  	console.warn("información del post");
  }

  public delete(){
  	console.warn("información del post");
  }

   private serialized(obj:any){
        let result = [];
        for (let property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    }
}
