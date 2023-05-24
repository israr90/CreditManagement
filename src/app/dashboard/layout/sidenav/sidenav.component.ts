import {Component,EventEmitter,HostListener,Input,OnInit,Output} from '@angular/core';
import { Router } from '@angular/router';
import { ModalLogoutComponent } from './modal-logout/modal-logout.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutService } from './logout.service';
import { GeneralService } from '../../../services/general.service';

import { SharedService } from '../../../services/shared.service';
import { DatePipe } from '@angular/common';
import { ModalCloseSessionComponent } from '../modal-close-session/modal-close-session.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [DatePipe],
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = true;

  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() titleOfPage = new EventEmitter<string>();
  timeRegister: string;
  navList: any = [];
  advisorNavList = [];

  registerSessionCreatedAt: any;
  constructor(
    public router: Router,
    public sharedService: SharedService,
    private modalService: NgbModal,
    private logoutService: LogoutService,
    public GeneralService: GeneralService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.sharedService.getRole?.roleId == 1) {
    //   this.GetUserMenu();
     }

  

     this.navList.push(
      {
        Title: 'Dashboard',
        IsActive: false,
        Icon: 'assets/images/dashboard.png',
        Icon2: 'assets/images/navicon/dash.png',
        url: '/dashboard',
        title: 'Dashboard',
        type: 36,
      },
      {
        Title: 'Promissory Notes',
        IsActive: false,
        Icon: 'assets/images/promissoryNotes.png',
        Icon2: 'assets/images/navicon/pn.png',
        url: '/pnorders',
        title: 'Promissory Notes',
        type: 36,
      },
      {
        Title: 'Promissory Notes Orders > Generate Promissory Notes ',
        IsActive: false,
        Icon: 'assets/images/prossimoryNotesorder.png',
        Icon2: 'assets/images/navicon/pno.png',
        url: '/gpnorders',
        title: 'Promissory Notes Orders',
        type: 36,
      },
      {
        Title: 'Credit Accounts',
        IsActive: false,
        Icon: 'assets/images/creditaccount.png',
        Icon2: 'assets/images/navicon/ca.png',
        url: '/creditaccounts',
        title: 'Credit Accounts',
        type: 36,
      },
      {
        Title: 'CM Setup',
        IsActive: false,
        Icon: 'assets/images/cm.png',
        Icon2: 'assets/images/cm.png',
        url: '/cmsetup',
        title: 'Credit Management Setup',
        type: 36,
      }
   
    );
  }
  onSelectMenu(index: number) {
    this.checkScreenSize();
    this.navList.forEach((element: { IsActive: boolean }) => {
      element.IsActive = false;
    });
    for (let i = 0; i < this.navList.length; i++) {
      if (i == index) {
        this.navList[i].IsActive = true;
        this.titleOfPage.emit(this.navList[i].title);
      }
    }
    localStorage.removeItem('collectionOrderNum');
    localStorage.removeItem('collectBranchId');
    localStorage.removeItem('collectUserId');
    localStorage.removeItem('collectSearchText');
    localStorage.removeItem('collectVin');
  }

  onSelectMenuCashier(i) {
    // this.checkScreenSize();
    // this.navList.forEach((element: { IsActive: boolean }) => {
    //   element.IsActive = false;
    // });

    // this.navList[i].IsActive = true;
    console.log(i);
    this.titleOfPage.emit(this.advisorNavList[i].title);

    localStorage.removeItem('collectionOrderNum');
    localStorage.removeItem('collectBranchId');
    localStorage.removeItem('collectUserId');
    localStorage.removeItem('collectSearchText');
    localStorage.removeItem('collectVin');
    // this.openAutoClose();
    // this.GetUserMenu();
  }
  checkScreenSize() {
    if (window.innerWidth < 600) {
      this.sideNavToggled.emit(false);
      this.sideNavStatus = false;
    }
  }
  dateSession: string;
  sessionEndMinut: any;
  openAutoCloseWarning() {
    // console.log('openAutoClose');

    this.dateSession = this.datePipe.transform(
      this.registerSessionCreatedAt,
      'MMMM d, y'
    );
    // Fri Mar 17 2023 22:36:23 GMT+0200 (Eastern European Standard Time)

    var dateEndSession = new Date(this.dateSession + ' ' + this.endSession);
    // var dateEndSession = new Date('Fri Mar 17 2023 23:55:23');

    var dateCurrunt = new Date();
    // console.log(dateCurrunt);
    let sessionEndMillesecnd =
      dateEndSession.getTime() - dateCurrunt.getTime() - 900000;
    // console.log('sessionEndMillesecnd', sessionEndMillesecnd);

    this.sessionEndMinut =
      dateEndSession.getMinutes() - dateCurrunt.getMinutes();
    // console.log('sessionEndMinut', this.sessionEndMinut);

    if (sessionEndMillesecnd > 0) {
      setTimeout(() => {
        const modalRef = this.modalService.open(ModalCloseSessionComponent);
        modalRef.componentInstance.type = 1;
        modalRef.componentInstance.minute = this.sessionEndMinut;
      }, sessionEndMillesecnd);
    }
  }

  openAutoClose() {
    // console.log('openAutoClose');

    this.dateSession = this.datePipe.transform(
      this.registerSessionCreatedAt,
      'MMMM d, y'
    );

    var dateEndSession = new Date(this.dateSession + ' ' + this.endSession);

    var dateCurrunt = new Date();

    let sessionEndMillesecnd = dateEndSession.getTime() - dateCurrunt.getTime();
    // console.log('sessionEndMillesecnd', sessionEndMillesecnd);

    if (sessionEndMillesecnd > 0) {
      setTimeout(() => {
        const modalRef = this.modalService.open(ModalCloseSessionComponent);
        modalRef.componentInstance.type = 2;
      }, sessionEndMillesecnd);
    }
  }

  logout() {
    const modalRef = this.modalService.open(ModalLogoutComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
      console.log('result', result);
      this.modalService.dismissAll();
      this.LogoutUser();
      localStorage.removeItem('fullName');
      localStorage.removeItem('role');
      localStorage.removeItem('userid');
      localStorage.removeItem('branch');
      localStorage.removeItem('city');
      localStorage.removeItem('register');
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');

      localStorage.removeItem('collectionOrderNum');
      localStorage.removeItem('collectBranchId');
      localStorage.removeItem('collectUserId');
      localStorage.removeItem('collectSearchText');
      localStorage.removeItem('collectVin');

      localStorage.removeItem('closeSession');

      // localStorage.removeItem('identity');
      // localStorage.removeItem('password');
      // localStorage.removeItem('rememberMe');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');

      this.router.navigate(['/login']);
    });

    // this.sharedService.getToken = '';\
  }
  LogoutUser() {
    return this.logoutService
      .LogoutUser(+this.sharedService.getUserId)
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          // this.roles = response.data.permissions;
        }
      });
  }
  canOpenRegister: boolean;
  opendSession: any;
  openreg: boolean;
  closereg: boolean;
  clollectreg: boolean;
  
  canCloseRegisterSession: boolean;
  

  cashierMenu: any;
  registerSession: any;
  endSession: any;
  oppendAt: any;
  isIpAddres: boolean;
  hasOppendSession: boolean;
  GetUserMenu() {
    return this.GeneralService.GetUserMenu({}).subscribe((response: any) => {
      if (response.isSuccess == true) {
        this.cashierMenu = response.data[0].cashier;
        this.registerSession = response.data[0].registerSession;
        this.registerSessionCreatedAt = this.registerSession.oppendAt;
        this.endSession = this.registerSession.allowedToTime;
        this.hasOppendSession = this.registerSession.hasOppendSession;
        this.isIpAddres = true;
        console.log(this.endSession);

        if (this.hasOppendSession == true) {
          console.log('open close');
          setTimeout(() => {
            this.openAutoCloseWarning();
          }, 2000);

          setTimeout(() => {
            this.openAutoClose();
          }, 2000);
        }

        this.advisorNavList = [];
        this.advisorNavList.push(
        
          {
            Title: 'Service Work Orders',
            IsActive: false,
            IsSelect: true,
            Icon: 'assets/images/navicon/collect.png',
            Icon2: 'assets/images/navicon/collect2.png',
            url: '/workorders',
            title: 'workorders',
            type: 1,
            canClick: this.cashierMenu[2].collect.canClick,
            canView: this.cashierMenu[2].collect.canView,
            // canClick: true,
            // canView: true,
          },
         
         
        );
      
        localStorage.removeItem('IsFoundIPAddress');

        // if (this.sharedService.checkIfSessionClose) {
        //   this.router.navigate(['/close-register']);
        // } else {
        if (this.cashierMenu[0].openSession.canClick == true) {
          this.router.navigate(['/opening-register']);
        } else if (this.cashierMenu[2].collect.canClick == true) {
          this.router.navigate(['/collect']);
        } else if (this.cashierMenu[1].closeSession.canClick == true) {
          this.router.navigate(['/close-register']);
        } else if (this.cashierMenu[3].pretty.canClick == true) {
          this.router.navigate(['/petty-cash']);
        }
        // }

        if (this.sharedService.getRole?.roleId == 1) {
          if (
            // this.cashierMenu[0].openSession.canClick == false
            this.cashierMenu[0].openSession.canView == false &&
            this.cashierMenu[1].closeSession.canView == false &&
            this.cashierMenu[2].collect.canView == false &&
            this.cashierMenu[3].pretty.canView == false
          ) {
            // this.router.navigate(['/petty-cash']);
            this.isIpAddres = false;

            localStorage.setItem('IsFoundIPAddress', '1');
            console.log('no ip address');
          } else {
            localStorage.removeItem('IsFoundIPAddress');
          }
        }
      }
    });
  }
}
