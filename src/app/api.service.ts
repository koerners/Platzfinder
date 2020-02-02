import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
   apiURL = 'http://35.242.197.201:8080';
  // apiURL = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) {
  }


  public getAll() {
    return this.httpClient.get(this.apiURL , {responseType: 'json'});
  }
  public getBib(name: string, entries: number) {
    return this.httpClient.get(this.apiURL + '/bib/' + name + '/' + entries, {responseType: 'json'});
  }



}

