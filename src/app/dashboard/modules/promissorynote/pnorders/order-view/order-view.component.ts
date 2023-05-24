import { Component } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { WorkOdersService } from '../services/workorders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent {
  IsshowImage:boolean=false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faDonwload=faFileDownload;
  orderId:number;
  today: string;
  constructor(
    private services: WorkOdersService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private modalService: NgbModal,
    public headerService: HeaderService,
  ) {

    const now = new Date();
    this.today = now.toISOString().substr(0, 10); // Get the date in YYYY-MM-DD format
  }

  ngOnInit(): void {
    this.headerService.setTitle('Promissory Notes > Order > View');
    this.orderId = this.route.snapshot.params['id'];
    this.GetPNOrderDetails();
    
  }
 
  PNorders:any;
  GetPNOrderDetails() {

    return this.services.GetPNOrderDetails(
this.orderId)
    .subscribe((response: any) => {
      if (response) {
        debugger;
        this.PNorders = response.data;

       
         // this.GetPNOrderBookNotes(this.PNorders.book.pnBookID)
      }
    });
}



  Back(){
    this.router.navigateByUrl('/pnorders');
  }
 
  showImage(){

  }
  ShowDetails(){
    this.router.navigateByUrl('/pnorders/details/2');
  }}
