import { Component } from '@angular/core';
import { WorkOdersService } from '../../services/workorders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/app/services/header.service';
import * as _ from 'underscore';
import { ModalConfirmCreateComponent } from 'src/app/auth/create-pass/modal-confirm-create/modal-confirm-create.component';

@Component({
  selector: 'app-book-notes',
  templateUrl: './book-notes.component.html',
  styleUrls: ['./book-notes.component.scss']
})
export class BookNotesComponent {

  OrderID:number;
  CustomerName:string='';

  constructor(
    private services: WorkOdersService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private modalService: NgbModal,
    public headerService: HeaderService,
  ){

  }
  ngOnInit(): void {
    this.OrderID = this.route.snapshot.params['id'];
   // this.pnBookID = localStorage.getItem("pnBookID");
   
    // this.detaisId = 62;
    if (this.OrderID) {
      this.GetBookNotes();
    }
  }

  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  BookNotes:any;
  totalRecordCount: number;
  pageSize:number=6;
  GetBookNotes(){
      return this.services
        .GetBookNotes(this.OrderID, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          debugger;
          this.CustomerName= localStorage.getItem("CustomerName");
          this.BookNotes = response.data.data;
          this.totalRecordCount = response.data.totalRecordCount;
          // this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecordCount / 6);
          this.pages = _.range(this.pagin);
        
        }
      });
  }
  pnBookNotedId:number;
  BookNoteDetails:any;
  // content:any;
  // GetPNOrderBookNotesDetails(content, id){
  //   return this.services
  //   .GetPNOrderBookNotesDetails(this.pnBookNotedId)
  // .subscribe((response: any) => {
  //   if (response) {
  //     debugger;
  //     //this.CustomerName= localStorage.getItem("CustomerName");
  //     this.BookNoteDetails = response.data;
  //     this.modalService.open(content, { centered: true, size: 'lg' });    
  //   }
  // });
  // }
  openModal(content, id) {
    debugger
    this.pnBookNotedId=id;
    this.BookNoteDetails = {};
    this.services.GetPNOrderBookNotesDetails(this.pnBookNotedId).subscribe((response: any) => {
      if (response) {
      this.BookNoteDetails = {};
      this.BookNoteDetails = response.data;
      this.modalService.open(content, { centered: true, size: 'lg' });    
      
      }
    })
  
  
  }
  print(){
    window.open(this.BookNoteDetails.pNpdfFile, '_blank');
  
  }
  setPage(page: number) {
    this.pageNo = page;
    this.GetBookNotes();
  }
  ShowDetails(item:any){
    this.router.navigateByUrl('/pnorders/details/'+item.pnBookNoteId);

  }
isLogShow:boolean=true;
  HideLog(){
    this.isLogShow=!this.isLogShow;
  }
}
