import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {NgxMapboxGLModule} from "ngx-mapbox-gl";

class Bib {
  nameBib: string;
  linkBib: string;
  belegt: number;
  frei: number;
  beschraenkt: number;
  warning: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {


  public isMobileLayout: boolean;
  svgCurrentAll: SafeHtml;
  public loadedBibs: any;
  public currentBibs = [];
  public lastUpdate: any;
  afterEight: boolean;
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
    this.afterEight = (hour >7);




    this.apiService.getStatus().subscribe((res: any) => {
      this.loadedBibs = res;
      this.lastUpdate = this.loadedBibs[0][0]
      var i;
      for (i = 0; i < this.loadedBibs.length; i++) {
        let bib = new Bib();
        bib.nameBib = this.loadedBibs[i][1];
        bib.linkBib = this.loadedBibs[i][2];
        bib.belegt = this.loadedBibs[i][3];
        bib.frei = this.loadedBibs[i][4];
        bib.beschraenkt = this.loadedBibs[i][5];
        bib.warning = (bib.frei < 20);

        this.currentBibs[i] = bib;
      }



    });


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
