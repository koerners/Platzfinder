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
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  private isMobileLayout: boolean;
  svgCurrent: SafeHtml;
  title: any;
  bib: Bib;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    this.bib = new Bib();
    this.bib.open = false;



    this.route.params.subscribe(params => {
      this.title = params.bib;
      this.bib = new Bib();
      this.apiService.getBib(params.bib, "50").subscribe((res: any) => {
        this.svgCurrent = this.sanitizer.bypassSecurityTrustHtml(res);
      });



      this.apiService.getStatus().subscribe((res: any) => {
        let loadedBibs = res;
        var i;
        for (i = 0; i < loadedBibs.length; i++) {

          if (loadedBibs[i][0] === this.title) {
            this.bib.nameBib = loadedBibs[i][0];
            this.bib.belegt = loadedBibs[i][1];
            this.bib.frei = loadedBibs[i][2];
            this.bib.beschraenkt = loadedBibs[i][3];
            this.bib.warning = (this.bib.frei < 20);
            this.bib.open = true;
          }

        }
      });






    })

  }
  ngOnInit() {

    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;



  }
}
