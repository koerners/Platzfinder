import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    apiURL = 'https://api.skoerner.com:4343';
   //apiURL = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) {
  }


  public getStatus() {
    return this.httpClient.get(this.apiURL+'/status' , {responseType: 'json'});
  }
  public getBib(name: string, entries: string) {
    return this.httpClient.get(this.apiURL + '/bib/' + name + '/' + entries, {responseType: 'text'});
  }

  public getCurrentAll() {
    return this.httpClient.get(this.apiURL + '/allGraph', {responseType: 'text'});
  }

  public getBarCurrent() {
    return this.httpClient.get(this.apiURL + '/currentBar', {responseType: 'text'});
  }
  public getCurrentAvg() {
    return this.httpClient.get(this.apiURL + '/currentAvg', {responseType: 'text'});
  }


}

