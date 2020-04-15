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

  public isConnected() {
    return this.httpClient.get(this.apiURL + '/', {responseType: 'text'});
  }

  public getStatus() {
    return this.httpClient.get(this.apiURL + '/status', {responseType: 'json'});
  }

  public getBib(name: string, entries: string) {
    return this.httpClient.get(this.apiURL + '/bib/' + name + '/' + entries, {responseType: 'text'});
  }

  public getCurrentAll() {
    return this.apiURL + '/static/allCurrent.svg';
  }

  public getBarCurrent() {
    return this.apiURL + '/static/horBar.svg.svg';
  }

  public getCurrentAvg() {
    return this.apiURL + '/static/halfDay.svg.svg';
  }

  public getTomorrow() {
    return this.apiURL + '/static/halfDay_24.svg.svg';
  }

  public getAverageByWeekdayAll() {
    return this.apiURL + '/static/avgByWeekday.svg';
  }

  public avgWkDayAllLastTwoWeeks() {
    return this.apiURL + '/static/avgLastTwo.svg.svg';
  }

  public getAvgByWkByBib(name: string) {
    return this.httpClient.get(this.apiURL + '/wkdayBib/' + name, {responseType: 'text'});
  }

  public lastYearAll() {
    return this.httpClient.get(this.apiURL + '/lastYearAll', {responseType: 'text'});
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


  public getJoke() {
    return this.httpClient.get('https://official-joke-api.appspot.com/random_joke', {responseType: 'json'});
  }


}
