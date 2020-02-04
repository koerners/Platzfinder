import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {GoogleChartComponent} from 'angular-google-charts';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private isMobileLayout: boolean;
  svg: SafeHtml;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    this.apiService.getStatus().subscribe((res: any) => {
      console.log(res);
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
