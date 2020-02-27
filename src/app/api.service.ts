import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'https://api2.platzfinder.com';
  // apiURL = 'http://localhost:8080';

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

  public getAverageByWeekdayAll() {
    return this.httpClient.get(this.apiURL + '/avgWkDayAll', {responseType: 'text'});
  }

  public avgWkDayAllLastTwoWeeks() {
    return this.httpClient.get(this.apiURL + '/avgWkDayAllLastTwoWeeks', {responseType: 'text'});
  }

  public getAvgByWkByBib(name: string) {
    return this.httpClient.get(this.apiURL + '/wkdayBib/' + name, {responseType: 'text'});
  }

  public lastYearAll() {
    return this.httpClient.get(this.apiURL + '/lastYearAll' ,{responseType: 'text'});
  }

  public lastYearBib(name: string) {
    return this.httpClient.get(this.apiURL + '/lastYearBib/' + name, {responseType: 'text'});
  }

  public wkdayBibLastTwoWeeks(name: string) {
    return this.httpClient.get(this.apiURL + '/wkdayBibLastTwoWeeks/' + name, {responseType: 'text'});
  }

  public bibInfo(name: string) {
    return this.httpClient.get(this.apiURL + '/bibInfo/' + name, {responseType: 'text'});
  }

  public getXkcd() {
    return this.httpClient.get('https://xkcd.now.sh/?comic=latest', {responseType: 'json'});
  }

}

