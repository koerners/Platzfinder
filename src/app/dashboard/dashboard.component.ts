import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

class Bib {
  nameBib: string;
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
  svg: SafeHtml;
  public loadedBibs: any;
  public currentBibs = [];
  public lastUpdate: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    this.apiService.getStatus().subscribe((res: any) => {
      this.loadedBibs = res;
      this.lastUpdate = this.loadedBibs[0][4]
      var i;
      for (i = 0; i < this.loadedBibs.length; i++) {
        let bib = new Bib();
        bib.nameBib = this.loadedBibs[i][0];
        bib.belegt = this.loadedBibs[i][1];
        bib.frei = this.loadedBibs[i][2];
        bib.beschraenkt = this.loadedBibs[i][3];
        bib.warning = (bib.frei < 20);

        this.currentBibs[i] = bib;
      }


      console.log(this.currentBibs);
      })

    this.apiService.getCurrentAll().subscribe((res: any) => {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(res);
      })

    };


  ngOnInit() {

    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;


  }
}
