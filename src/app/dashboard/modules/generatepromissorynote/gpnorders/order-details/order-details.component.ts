import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../services/shared.service';
import { ModalMessageComponent } from '../../../../../shared/components/modal-message/modal-message.component';
import { WorkOdersService } from '../services/workorders.service';
import { HeaderService } from 'src/app/services/header.service';

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit 
{
  IsshowImage:boolean=false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faDonwload=faDownload

  constructor(
    private collectService: WorkOdersService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private modalService: NgbModal,
    public headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Promissory Notes > Order View > Details');
    
    
    
  }
 
  Back(){
    this.router.navigateByUrl('/pnorders/view/2');
  }
 
  showImage(){

  }
}
