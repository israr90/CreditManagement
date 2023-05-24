import { SharedService } from '../../../services/shared.service';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/services/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Input() titleOfPage: string = '';
  faBars = faBars;
  faArrowLeft = faArrowLeft;
  faBell = faBell;
  faArrowRight = faArrowRight;
  menuStatus: boolean = true;
  iscollapse: boolean = false;
  marginleft: number = 50;
  fullName: any;
  Pagetitle: any = {};
  showTitle: boolean = true;
  pagename: string;
  isShowDrop: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    public sharedService: SharedService
  ) {
    this.headerService.title.subscribe((title) => {
      this.titleOfPage = title;
      // this.showTitle = true;

      // this.headerService.setTitle(this.titleOfPage);
      // console.log('title', this.titleOfPage);
      // setTimeout(() => {
      //   this.titleOfPage = title;
      // }, 1000);
    });

    this.pagename = this.router.url;

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Handle Navigation Start
      }

      if (event instanceof NavigationEnd) {
        // Handle Navigation End
        this.pagename = '';
      }
    });
  }

  firstName: string;
  lastName: string;
  ngOnInit(): void {
    // console.log(this.sharedService.getRole?.roleId);

    this.fullName = localStorage.getItem('fullName');
    const fullname = this.fullName?.split(' ');
    // console.log(this.fullName?.split(' '));

    this.firstName = fullname[0];
    this.lastName = fullname[1];
    // console.log('url', this.router);
    // console.log('url', this.router.url);

    // this.pagename = this.router.url;
  }

  mainPage() {
    
  }
  SideNavToggle() {
    debugger;
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
    this.iscollapse = this.iscollapse == false ? true : false;
    this.marginleft = this.marginleft == 50 ? 0 : 50;
    if (window.innerWidth < 600) {
      this.iscollapse = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    console.log(window.innerWidth);
    if (window.innerWidth < 600) {
      this.iscollapse = true;
      this.marginleft = 0;
      this.menuStatus = false;
      this.sideNavToggled.emit(false);
      this.showTitle = false;
    } else {
      this.iscollapse = false;
      this.marginleft = 50;
      this.menuStatus = true;
      this.showTitle = true;
      this.sideNavToggled.emit(true);
    }
  }
  logout() {
    sessionStorage.removeItem('fullName');
    this.router.navigateByUrl('/login');
  }
}
