import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CmSetupService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetCmSetUp() {
    return this.http.get(
      this.apiUrl + `Setup/GetCMSetup`,
      this.sharedService.getHeaders()
    );
  }
  UpdateCmSetUp(body: any) {
    debugger
    return this.http.post(
      this.apiUrl + `Setup/UpdateSetup`,
      body,
      this.sharedService.getHeaders()
    );
  }


}
