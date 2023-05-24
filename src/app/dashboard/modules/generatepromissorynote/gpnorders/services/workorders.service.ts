import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class WorkOdersService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetRegisterDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Register/GetRegisterDetails?Id=${id}`,
      this.sharedService.getHeaders()
    );
  }

  //GetServicePNOrdersList
  GetServicePNOrdersList(PNOrderType: string,searchText: string,FromDate: string,ToDate: string,status:string,Branch:string,sort: number,pageNo: number) 
  {
    return this.http.get(
      this.apiUrl +
        `/PNOrders/GetPNOrders?PNOrderType=${PNOrderType}&Search=${searchText}&FromDate=${FromDate}&ToDate=${ToDate}&Status=${status}&Branch=${Branch}&sort=${sort}&PageNo=${pageNo}&PageSize=6`,
        this.sharedService.getHeaders()
     
    );
  }
 
  GetPNOrderDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `PNOrders/GetPNOrderDetails?orderId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  GetBookNotes(id: number,pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `PNOrders/GetPNOrderBookNotes?orderId=${id}&PageNo=${pageNo}&PageSize=3`,
      this.sharedService.getHeaders()
    );
  }
  GetPNOrderBookNotesDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `PNOrders/GetPNOrderBookNotesDetails?PNBookNoteId=${id}`,
      this.sharedService.getHeaders()
    );
  }
  GetRescheduledPNBook(id: number) {
    return this.http.get(
      this.apiUrl +
        `PNOrders/GetRescheduledPNBook?orderId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  GeneratePromissoryNotes(body: any) {
    return this.http.post(
      this.apiUrl +
        `PNOrders/GeneratePromissoryNotes`,body,
      this.sharedService.getHeaders()
    );
  }


  UpdatePNBookStatus(body: any) {
    return this.http.post(
      this.apiUrl + `PNOrders/UpdatePNBookStatus`,
      body,
      this.sharedService.getHeaders()
    );
  }

  ReschedulePromissoryNotes(body: any) {
    return this.http.post(
      this.apiUrl + `PNOrders/ReschedulePromissoryNotes`,
      body,
      this.sharedService.getHeaders()
    );
  }






  GetDirectPaymentSalesOrdersDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetDirectPaymentSalesOrdersDetails?directPaymentSalesOrderOpportunityNo=${id}`,
      this.sharedService.getHeaders()
    );
  }


  // createOrder 
  CreateWorkOrder(body: any) {
    return this.http.post(
      this.apiUrl + `SalesOrders/CreateWorkOrder`,
      body,
      this.sharedService.getHeaders()
    );
  }
  updateWorkOrder(body: any) {
    return this.http.post(
      this.apiUrl + `SalesOrders/UpdateWorkOrder`,
      body,
      this.sharedService.getHeaders()
    );
  }

  


 
 

 






  // Search=${searchText}&
  GetBranches() {
    return this.http.get(
      // this.apiUrl +`Branches/GetBranches?Status=2001&sort=2&PageNo=0&PageSize=100`,this.sharedService.getHeaders()
      this.serverName +`Branches/GetBranches?Status=2001&sort=2&PageNo=0&PageSize=100`,this.sharedService.getHeaders()
    );
  }

  getUsers(rolid: number) {
    return this.http.get(
      this.apiUrl +
        `User/GetUsers?sort=2&Status=2001&Invitation=2004&PageSize=1000&RoleId=${rolid}`,
      this.sharedService.getHeaders()
    );
  }
 public serverName="https://dx-admimistration.azurewebsites.net/POSAPI/api/";
  getLookupsById(id: any) {
    // return this.http.get(this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,this.sharedService.getHeaders());
    return this.http.get(this.serverName + 'Lookups/GetLookups?lookupTypeId=' + id,this.sharedService.getHeaders());
  }

  CollectionOrder(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/CollectionOrder',
      role,
      this.sharedService.getHeaders()
    );
  }
  NeedModify(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'SalesOrders/NeedModify',
      role,
      this.sharedService.getHeaders()
    );
  }
}
