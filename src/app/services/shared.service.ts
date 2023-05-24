import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  getHeaders() {
    return {
      headers: new HttpHeaders()
        // .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.getToken),
    };
  }
  get getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  get getFullname() {
    return (
      localStorage.getItem('fullName') || sessionStorage.getItem('fullName')
    );
  }
  get getUserId() {
    return localStorage.getItem('userid');
  }
  get getCity() {
    return localStorage.getItem('city') || sessionStorage.getItem('city');
  }
  get getUrl() {
    return environment.apiUrl;
  }

  get IsFoundIPAddress() {
    return localStorage.getItem('IsFoundIPAddress');
  }

  get getBranch() {
    const branch = JSON.parse(localStorage.getItem('branch'));
    return branch;
  }
  get getRole() {
    const role = JSON.parse(localStorage.getItem('role'));
    return role;
  }
  get getRegister() {
    const register = JSON.parse(localStorage.getItem('register'));
    return register;
  }
  get getPermissions() {
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    return permissions;
  }

  get checkIfSessionClose() {
    const session = localStorage.getItem('closeSession');
    return session;
  }
  get getCasherPermissions() {
    const isSelected =
      this.getPermissions[1]?.permissionSubCategories[2].permissionItems[0]
        .selected;
    return isSelected;
  }
  get getOpenCloseRegesterPermissions() {
    const isSelected =
      this.getPermissions[1]?.permissionSubCategories[2].permissionItems[0]
        .selected;
    return isSelected;
  }

  get getCollectPermissions() {
    const isSelected =
      this.getPermissions[1]?.permissionSubCategories[3].permissionItems[0]
        .selected;
    return isSelected;
  }

  get timeRegister() {
    const timeRegister = localStorage.getItem('timeRegister');
    return timeRegister;
  }
  // this.sharedService.getPermissions[1].permissionSubCategories[2].permissionItems[0].selected)
}
