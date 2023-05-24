import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { SharedService } from '../services/shared.service';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
  sidebarExpanded = true;
  Pagetitle: any = {};

  constructor(
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private router: Router,
    public datePipe: DatePipe
  ) {}
  navList: any = [];
  titleOfPage: any = '';
  sideNavStatus: boolean = true;
  ngOnInit(): void {

  
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event['url'] == '/' && this.sharedService.getRole?.roleId == 33) {
          this.router.navigate(['/workorders']);
        } 
      });

    if (this.sharedService.getRole?.roleId == 33) {
      if (this.router.url == '/') {
        this.router.navigate(['/workorders']);
      }
    }

    console.log();
  }
  onSelectMenu(index: number) {
    this.navList.forEach((element: { IsActive: boolean }) => {
      element.IsActive = false;
    });
    for (let i = 0; i < this.navList.length; i++) {
      if (i == index) {
        this.navList[i].IsActive = true;
      }
    }
  }
}
