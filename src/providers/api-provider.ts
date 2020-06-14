import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider{
    server: string = 'http://localhost/apiMoney/';

    constructor(private http : HttpClient){

    }


    Api(dados: any, api: string){

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          };
       
            let url = this.server + api ;
           return this.http.post(url, JSON.stringify(dados), httpOptions)
            .map(res => res);
       
    
  }

}