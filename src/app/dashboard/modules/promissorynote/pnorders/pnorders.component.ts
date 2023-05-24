import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WorkOdersService } from './services/workorders.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pn-order',
  templateUrl: './Pnorders.component.html',
  styleUrls: ['./Pnorders.component.scss'],
})
export class PnOrdersComponent implements OnInit {
  branches!: any[];
  totalRecords!: number;
  totalPages!: number;
  errorMessage: any;
  totalAllRecordsCount: number;
  searchText: string = '';
  lookups:any;
  branchId: string = '';
  opportunityNo:string='';
  sort: number = 1;
  branchTypes: any = [];
  bId: number;
  Id:number;
  typeName: string = 'Showroom Branches';
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  select: number;
  roleId: number;
  // serviceAdvisorId: string = '';
  // salesConsultantId: string = '';
  // OpportunityId: string='';
  statusId: string='';
  selectedDate:string='';
  @Output() titleOfPage = new EventEmitter<string>();

  isService: boolean = true;
  isRevenus: boolean;
  collectionOrderNum: number;
  DateForm:FormGroup;
  constructor(
    private WorkOdersService: WorkOdersService,
    private router: Router,
    public headerService: HeaderService,
    public sharedService: SharedService,
    private modalService: NgbModal,public datepipe: DatePipe,
    config: NgbModalConfig,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.headerService.setTitle('Promissory Notes Orders List');
    this.getlookup();
    this.GetBranches();

     this.GetPNOrdersList();

  }
  onDateChanged(selectedDateValue: string) {
    if (selectedDateValue) {
      debugger;
      let dateObj = { fromDate: '', toDate: '' };
      let formValues;
      if (selectedDateValue) {

        this.FromDate = this.datepipe.transform(selectedDateValue[0], 'yyyy-MM-dd');
         this.ToDate= this.datepipe.transform(selectedDateValue[1], 'yyyy-MM-dd');
         this.loadDataWithCheck();

      }
      // const dateParts = selectedDateValue.split(' - ');
      // const fromDate = this.datepipe.transform(dateParts[0], 'yyyy-MM-dd');
      // const toDate = this.datepipe.transform(dateParts[1], 'yyyy-MM-dd');
      // Use fromDate and toDate as required
    }
  }
  resetDate(){
    this.selectedDate='';
    this.FromDate='';
    this.ToDate='';
    this.loadDataWithCheck();
  }
  // NexPage() {

  //  this.router.navigateByUrl('/pnorders/view/2');

  // }

  // tabIndex: number = 0;
  // isForAll: boolean = false;
  // registers: any;
  // collectionOrder: any;
  totalRecordsCount: number;
  // ServicesWorkOrders: any;
  // DirectPaymentSalesOrders: any;
  // collects: any;
  PNorders:any;
  PNOrderType:string='';
  FromDate:string='';
  ToDate:string='';

  Branch:string='';
  getlookup() {
    return this.WorkOdersService.getLookupsById(19).subscribe((response: any) => {
      if (response) {
        this.lookups = response.data;
      }
    });
  }
  GetBranches() {
    return this.WorkOdersService.GetBranches().subscribe((response: any) => {
        if (response) {
          debugger
          this.branches = response.data;
        }
      });
  }
  GetPNOrdersList() {

      return this.WorkOdersService
      .GetServicePNOrdersList(
        this.PNOrderType,
        this.searchText,
        this.FromDate,
        this.ToDate,
        this.statusId,
        this.Branch,
        this.sort,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          debugger;
          this.PNorders = response.data.data;
          this.totalRecordsCount = response.data.totalAllRecordsCount;
          this.totalAllRecordsCount = response.data.totalRecordCount;
          this.totalRecords = response.data.totalPageCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
        }
      });
  }
  removeSearch() {
    this.searchText = '';
    this.pageNo = 0;
    this.sort = 1;
   this.loadDataWithCheck();
  }
  View(item:any)
  {
    localStorage.setItem("CustomerName",item.customer.customerName)

    this.router.navigateByUrl('/pnorders/view/'+item.orderId);

  }
  sortByTax(){

  }

  sortByPrice()
  {

  }
  chooseBranch(item: any, i)
  {}
 
  clearUser(){

  }
  removeSearchVin()
  {

  }
  filterByUserId(e) {


  }

  // users: any;
  // getUsers() {
  //   console.log('his.users');
  //   return this.WorkOdersService
  //     .getUsers(this.roleId)
  //     .subscribe((response: any) => {
  //       if (response) {
  //         this.users = response.data;
  //       }
  //     });
  // }





  search(event: any) {

    // console.log(event?.target.value);
    const text = event.target.value;
    // console.log(text.length);
    if (text.length >= 3) {
      debugger;
      this.searchText = text;
      this.pageNo = 0;
      this.loadDataWithCheck();
    }
    if (text.length == 0) {
      this.loadDataWithCheck();
    }
  }
  searchParts(event: any) {
    debugger
    console.log(event?.target.value);
    const text = event.target.value;
    console.log(text.length);
    if (text.length >= 3) {
      this.pageNo = 0;
     this.loadDataWithCheck();
    }
    if (text.length == 0) {
      this.loadDataWithCheck();
    }
  }
  removeSearchPart() {

    this.pageNo = 0;
    this.sort = 1;
    this.loadDataWithCheck();
  }

  sortByOrder() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }

    this.loadDataWithCheck();
  }
  sortByBranch() {
    if (this.sort == 4) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.loadDataWithCheck();
  }
  sortByStatus() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.loadDataWithCheck();
  }

  sortByDate() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.loadDataWithCheck();
  }



  setPage(page: number) {
    this.pageNo = page;
    this.loadDataWithCheck();
  }

  filterByBranchId(e){
    debugger;
    console.log(e);
    this.branchId=e.branchId;
    this.Branch=e.branchId;
    this.pageNo = 0;
    this.loadDataWithCheck();

  }
  collectUserId: number;
  filterByStatusId(e){
    debugger;
    console.log(e);
    this.statusId=e.id;
    this.pageNo = 0;
    this.loadDataWithCheck();

  }
  loadDataWithCheck() {
    this.GetPNOrdersList();
  }
  Reset(){
    this.statusId='';
    this.bId=null;
    this.Branch='';
    this.branchId='';
    this.searchText='';
    this.selectedDate='';
    this.FromDate='';
    this.ToDate='';
    this.loadDataWithCheck();

  }

  clearStatus($event) {
 
    this.statusId='';
    this.loadDataWithCheck();

  }
  clearBranch($event) {
    debugger;
    this.Branch='';
    this.loadDataWithCheck();

  }
}
