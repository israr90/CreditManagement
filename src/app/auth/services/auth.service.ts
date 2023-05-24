import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../services/shared.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = this.sharedService.getUrl;

  constructor(private http: HttpClient, public sharedService: SharedService) {}

  ResetPassword(body: any) {
    return this.http.post(this.apiUrl + `User/ResetPassword`, body);
  }

  TestEmailLinkExpiration(body: any, userId: string) {
    return this.http.post(
      this.apiUrl + `User/TestEmailLinkExpiration?userId=${userId}`,
      body
    );
  }

  ForgetPassword(body: any, email: string) {
    return this.http.post(
      this.apiUrl + `User/SendResetPasswordLink?email=${email}`,
      body
    );
  }

  GetUserDetails(id: number) {
    return this.http.get(
      this.apiUrl + `User/GetUSERDetails?userId=${id}`
      // this.sharedService.getHeaders()
    );
  }
}
