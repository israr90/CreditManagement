import { Component, Inject, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PagerService } from './pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  EventsCount!: number;
  RssCount!: number;
  csvSettings = {
    fieldSeparator: '   ',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: false
  };
  public pageSizeArr: string[] = [];
  @Output() public pageNumber: number = 1;
  @Output() public pageSize: number = 10;
  @Output() GetSources = new EventEmitter<string>()
  GlobalPageIndex: number;
  private allItems!: any[];
  pager: any = {};
  pagedItems!: any[];
  ddlPageSize: any = 10;
  uploadComplete() {
    this.GetSources.emit();
  }
  pagingClickBtn(btnIndex:any) {
    if (btnIndex > 0 && this.GlobalPageIndex != btnIndex) {
      this.GlobalPageIndex = btnIndex;
      this.pageNumber = btnIndex;
      this.alert = this.pageNumber.toString();
      //alert(this.pageNumber);
      this.uploadComplete();
    }
  }
  PageSizeClick() {
    this.pageSize = this.ddlPageSize;
    this.uploadComplete();
  }
  public alert = "No Value Alert";
  constructor(public http: HttpClient, private _router: Router, private pagerService: PagerService,) {
    this.GlobalPageIndex = 0;
    this.ddlPageSize = 10;
  }
  ngOnInit() {
    this.pageNumber = 0;
    this.pageSize = 10;

  }
  public setPage(page: number, getData: boolean) {
    if (page < 1 || (page > this.pager.totalPages && page > this.EventsCount)) {
      this.pager = this.pagerService.getPager(0);
      this.alert = "0";
      return;
    }
    this.pageNumber = page;
    //Double check Sources List count
    if (this.EventsCount) {
      if (this.EventsCount > 0) {
        //this.EventsCount = this.eventObj[0].count;
        this.pager = this.pagerService.getPager(this.EventsCount, page, this.ddlPageSize);
      }
    }
    //this.SourcesList
    if (this.EventsCount) {
      this.alert = this.EventsCount.toString();
    }
    else {
      this.alert = "No Events Count";
    }
  }
}
