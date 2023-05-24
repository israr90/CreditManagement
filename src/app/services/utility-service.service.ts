import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor(private toastr: ToastrService) { }
  isLogged(): Promise<boolean> {
      if (typeof (Storage) !== 'undefined') {
        if (sessionStorage.getItem('id')) {
          return Promise.resolve(true);
        }
        else
        {
          // this._router.navigateByUrl('/dashboard');
        }
      }
      return Promise.resolve(false);

    }
  showError(error: any) {
  var data=error.json();
  if(data.Data==null || data.Data==false)
  {
    this.toastr.warning('Server Response...',data.Error==null? 'Something wrong...':data.Error.MessageEn);
  }
  else
  {
    this.toastr.warning('Server Response...', data.Error.MessageEn);
  }
}
}
