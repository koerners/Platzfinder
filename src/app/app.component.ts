import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Platzfinder';

  public isMobileLayout: boolean;

  constructor(  private apiService: ApiService, private router: Router
  ) {
  }


  ngOnInit() {
    this.apiService.isConnected().subscribe((res: any) => {
        if (res != 'Connected') {
          this.router.navigate(['offline']);
        }
      },
        (error) => {
          this.router.navigate(['offline']);
     }
    );
    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;


  }

}
