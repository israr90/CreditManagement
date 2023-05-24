import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root',
})
export class LogGuard implements CanActivate {
  isLog: boolean = false;
  constructor(private router: Router, private sharedService: SharedService) {
    console.log(this.sharedService.getToken ? true : false);
    this.isLog = this.sharedService.getToken ? true : false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;

    if (this.sharedService.getToken) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
