import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {GoogleChartComponent} from 'angular-google-charts';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private isMobileLayout: boolean;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {


    this.apiService.getAll().subscribe((res: any) => {
      for (const prop in res) {
        const datetime = this.parseDate(res[prop][1], res[prop][2]);
        this.data.push(
          // tslint:disable-next-line:radix
          [datetime, parseInt(res[prop][4])],
        );
      }
      this.loading = false;
    });

  }





  // @ts-ignore
  @ViewChild('chart')
  chart: GoogleChartComponent;

  title = '';
  type = 'Line';
  data = [];
  columnNames = ['', 'Auslastung in %'];
  options = {
    legend: {position: 'bottom', maxLines: 3},
    animation: {startup: 'true'},
    chartArea: {width: '100%', height: '80%'},

  };
  width = 900;
  height = 400;
  suche = '';
  loading = true;

  parseDate(day, time) {
    const parts = day.match(/(\d+)/g);
    const part2 = time.split(':');
    return new Date(parts[2], parts[1] - 1, parts[0], part2[0], part2[1]);
  }

  ngOnInit() {

    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;

    if(this.isMobileLayout){
      this.width = 375;
    }


  }
}
