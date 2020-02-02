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


    this.route.params.subscribe(params => {

      switch (params.bib) {
        case '1':
          this.data = [];
          this.loading = true;
          this.suche = 'AllgemeinerLesesaal(Zentralbibliothek)';
          this.title = 'Allgemeiner Lesesaal (ZB)';
          break;

        case '2':
          this.loading = true;

          this.data = [];
          this.suche = 'FBPhilologicum';
          this.title = 'Philologicum';
          break;

        case '3':
          this.loading = true;

          this.data = [];
          this.suche = 'FBHistoricum';
          this.title = 'Historicum';
          break;

      }

      this.apiService.getBib(this.suche, 100).subscribe((res: any) => {
        for ( const prop in res ) {
          const datetime = this.parseDate(res[prop][1], res[prop][2]);
          this.data.push(
            // tslint:disable-next-line:radix
            [datetime, parseInt(res[prop][4])],
          );
        }

        this.loading = false;

      });


    });

  }

  // @ts-ignore
  @ViewChild('chart')
  chart: GoogleChartComponent;

  title = '';
  type = 'AreaChart';
  data = [];
  columnNames = ['', 'Auslastung in %'];
  options = {
    legend: {position: 'bottom', maxLines: 3},
    animation: {startup: 'true'},

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
