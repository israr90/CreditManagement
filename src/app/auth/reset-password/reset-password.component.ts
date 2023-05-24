import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { UtilityServiceService } from 'src/app/services/utility-service.service';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { HeaderService } from '../../services/header.service';
import { ConnectionService, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalResetComponent } from './modal-reset/modal-reset.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  formData: FormGroup;
  submitted: boolean;
  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  IsshowPassword: boolean = false;

  errorMessage: any;
  userId: any;
  isLinkExpire: boolean;
  // status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();
  status = 'ONLINE';
  isConnected = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public headerService: HeaderService,
    private connectionService: ConnectionService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getData();
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.TestEmailLinkExpiration();
    });
  }

  getData() {
    this.formData = this.fb.group({
      userId: [''],
      password: [''],
      passwordConfirm: [''],
    });
  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.formData.controls;
  }

  TestEmailLinkExpiration() {
    this.authService
      .TestEmailLinkExpiration({}, this.userId)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.isLinkExpire = false;
          console.log(response);
        } else {
          this.isLinkExpire = true;
        }
      });
  }

  submit() {
    this.submitted = true;
    this.errorMessage = '';
    this.formData.get('userId').setValue(this.userId);
    this.formData
      .get('passwordConfirm')
      .setValue(this.formData.get('password').value);

    if (this.formData.invalid) {
      return window.scroll(0, 0);
    }

    this.authService
      .ResetPassword(this.formData.value)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          const modalRef = this.modalService.open(ModalResetComponent);
          modalRef.componentInstance.name = 'edit';
        } else {
          this.errorMessage = response.Errors[0].ErrorMessageEn;
        }
      });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalResetComponent);
    modalRef.componentInstance.name = 'edit';
  }

  showPassword() {
    this.IsshowPassword = this.IsshowPassword == false ? true : false;
  }
}
