import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}
  GetUserMenu(body: any) {
    return this.http.get(
      this.apiUrl + `Cashier/GetUserMenu`,
      this.sharedService.getHeaders()
    );
  }
  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }
  getLookupsStatus() {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=2&parentId=1',
      this.sharedService.getHeaders()
    );
  }


  GetUserDetails(id: number) {
    return this.http.get(
      this.apiUrl + `User/GetUSERDetails?userId=${id}`,
      this.sharedService.getHeaders()
    );
  }
  EditUser(body: any) {
    return this.http.post(
      this.apiUrl + `User/EditUser`,
      body,
      this.sharedService.getHeaders()
    );
  }
}
