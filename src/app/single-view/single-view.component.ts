import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import {SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  private isMobileLayout: boolean;
  svg: SafeHtml;
  title: any;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;



  }
}
