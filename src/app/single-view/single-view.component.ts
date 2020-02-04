import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleChartComponent} from 'angular-google-charts';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  private isMobileLayout: boolean;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;



  }
}
