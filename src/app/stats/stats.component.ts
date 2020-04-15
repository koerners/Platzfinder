import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {


  public isMobileLayout: boolean;
  svgCurrentAll: SafeHtml;
  zoomProperties: any;
  svgCurrentToday: any;
  svgCurrentOcc: any;
  avgWkDayAll: any;
  public avgFromStatic = true;
  public setup: string;
  public punchline: string;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    const d = new Date();
    const hour = d.getHours();



    this.svgCurrentToday = this.apiService.getCurrentAvg();

    this.svgCurrentOcc = this.apiService.getBarCurrent();

    this.svgCurrentAll = this.apiService.getCurrentAll()

    this.avgWkDayAll =this.apiService.avgWkDayAllLastTwoWeeks();





    this.apiService.getJoke().subscribe((res: any) => {
      this.setup = res.setup;
      this.punchline = res.punchline;

    });




  };




  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;


    if(this.isMobileLayout){
      this.zoomProperties= {backgroundColor: "white",  zoomControlScale: "3.1", overflow: "visible", 'double-tap-scale':"3.1", disableZoomControl: "never"};
    }else {
      this.zoomProperties= {backgroundColor: "white"};
    }

  }

  averageLineChanged(value:string){
    if (value == "1"){
      this.avgFromStatic = true;
      this.svgCurrentToday = this.apiService.getCurrentAvg();
    }else if (value == "2"){
      this.avgFromStatic = false;
      this.apiService.lastYearAll().subscribe((res: any) => {
        this.svgCurrentToday = this.sanitizer.bypassSecurityTrustHtml(res);
      });
    }
    else if (value == "3"){
      this.avgFromStatic = true;
      this.svgCurrentToday = this.apiService.getTomorrow();
    }
  }

  wochentagChanged(value:string){
    if (value == "1"){
      this.avgWkDayAll =this.apiService.avgWkDayAllLastTwoWeeks();


    }else if (value == "2"){
      this.avgWkDayAll =this.apiService.getAverageByWeekdayAll();


    }
  }
}
