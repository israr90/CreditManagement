import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
   public serverName="https://dx-admimistration.azurewebsites.net/POSAPI/";

 // public serverName = environment.apiUrl2;

  token: string = '';
  constructor(private http: HttpClient, public sharedService: SharedService) {
    this.token = sessionStorage.getItem('token') || '';
  }

  login(detail: any) 
  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName + 'Login', detail, {
      headers: headers,
    });
  }
  GetLookupsById(id: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', this.token);

    return this.http.get(
      this.serverName + 'api/Lookups/GetLookups?lookupTypeId=' + id,
      { headers: headers }
    );
  }
  GetUsers() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', this.token);

    return this.http.get(this.serverName + 'api/User/GetUsers', {
      headers: headers,
    });
  }
  GetBranchesById(id: any, sort: any, Search: any, pageSize: any, pageNo: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set(
      'Authorization',
      sessionStorage.getItem('token') || ''
    );
    return this.http.get(
      this.serverName +
        'api/Branches/GetBranches?BranchTypeId=' +
        id +
        '&sort=' +
        sort +
        '&Search=' +
        Search +
        '&PageNo=' +
        pageNo +
        '&PageSize=' +
        pageSize,
      { headers: headers }
    );
  }
  AddBranch(details: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set(
      'Authorization',
      sessionStorage.getItem('token') || ''
    );
    return this.http.post(this.serverName + 'api/Branches/AddBranch', details, {
      headers: headers,
    });
  }
}
