import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    apiURL = 'https://api.skoerner.com:8080';
   //apiURL = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) {
  }


  public getStatus() {
    return this.httpClient.get(this.apiURL+'/status' , {responseType: 'json'});
  }
  public getBib(name: string, entries: number) {
    return this.httpClient.get(this.apiURL + '/bib/' + name + '/' + entries, {responseType: 'json'});
  }

  public getCurrentAll() {
    return this.httpClient.get(this.apiURL + '/allGraph', {responseType: 'text'});
  }



}

