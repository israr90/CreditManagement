import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared.service';
import { WorkOdersService } from '../services/workorders.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component';
import * as _ from 'underscore';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent {
  
  constructor(){

  } 
}
   
