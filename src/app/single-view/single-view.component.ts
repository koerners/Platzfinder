import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

class Bib {
  nameBib: string;
  belegt: number;
  frei: number;
  beschraenkt: number;
  warning: boolean;
  open: boolean;
}

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css'],
})
export class SingleViewComponent implements OnInit {
   isMobileLayout: boolean;
  svgCurrent: SafeHtml;
  title: any;
  bib: Bib;
  public lastUpdate: any;
  zoomProperties: any;
  avgByWkday: any;
  lastWeek: any;
  public xkcdLink: HTMLImageElement;
  public xkcdTitle: any;



  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    this.bib = new Bib();
    this.bib.open = false;

    const d = new Date();
    const hour = d.getHours();


    this.route.params.subscribe(params => {
      this.title = params.bib;
      this.bib = new Bib();
      this.apiService.getBib(params.bib, "50").subscribe((res: any) => {
        this.svgCurrent = this.sanitizer.bypassSecurityTrustHtml(res);
      });



      this.apiService.wkdayBibLastTwoWeeks(this.title).subscribe((res: any) => {
        this.avgByWkday = this.sanitizer.bypassSecurityTrustHtml(res);
      });

      this.apiService.getXkcd().subscribe((res: any) => {
          this.xkcdLink = res.img;
          this.xkcdTitle= res.title;

      });

      this.apiService.getStatus().subscribe((res: any) => {
        let loadedBibs = res;
        var i;
        this.lastUpdate = loadedBibs[0][0]

        for (i = 0; i < loadedBibs.length; i++) {

          if (loadedBibs[i][2] === this.title) {
            this.bib.nameBib = loadedBibs[i][1];
            this.bib.belegt = loadedBibs[i][3];
            this.bib.frei = loadedBibs[i][4];
            this.bib.beschraenkt = loadedBibs[i][5];
            this.bib.warning = (this.bib.frei < 20);
            if (hour > 7 ) this.bib.open = true;
          }

        }
      });

      this.apiService.bibInfo(params.bib).subscribe((res: any) => {
        this.bib.nameBib = res;
      });




    })

  }
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
      this.apiService.getBib(this.title, "50").subscribe((res: any) => {
        this.svgCurrent = this.sanitizer.bypassSecurityTrustHtml(res);
      });

    }else if (value == "2"){
      this.apiService.getBib(this.title, "100").subscribe((res: any) => {
        this.svgCurrent = this.sanitizer.bypassSecurityTrustHtml(res);
      });

    }else if (value == "3"){
      this.apiService.lastYearBib(this.title).subscribe((res: any) => {
        this.svgCurrent = this.sanitizer.bypassSecurityTrustHtml(res);
      });

    }
  }
  weekdayChanged(value:string){
    if (value == "1"){

      this.apiService.wkdayBibLastTwoWeeks(this.title).subscribe((res: any) => {
        this.avgByWkday = this.sanitizer.bypassSecurityTrustHtml(res);
      });

    }else if (value == "2"){
      this.apiService.getAvgByWkByBib(this.title).subscribe((res: any) => {
        this.avgByWkday = this.sanitizer.bypassSecurityTrustHtml(res);
      });

    }
  }
}
