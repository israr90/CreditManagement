import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../services/shared.service';
@Injectable({
  providedIn: 'root',
})
export class CreatPassService {
  apiUrl = this.sharedService.getUrl;

  constructor(private http: HttpClient, public sharedService: SharedService) {}

  CreatePassword(body: any) {
    return this.http.post(
      this.apiUrl + `User/CreatePassword`,
      body,
      // this.sharedService.getHeaders()
    );
  }
  GetUserDetails(id: number) {
    return this.http.get(
      this.apiUrl + `User/GetUSERDetails?userId=${id}`
      // this.sharedService.getHeaders()
    );
  }
}
