import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {

  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  LogoutUser(id:number): Observable<any[]> {
    return this.http.post<any>(
      this.apiUrl + `User/Logout?userId=${id}`,{},
      this.sharedService.getHeaders()
    );
  }
}
