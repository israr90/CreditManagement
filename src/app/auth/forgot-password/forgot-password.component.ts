import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  authForm: FormGroup;
  isCheckMail: boolean;
  submitted: boolean = false;
  errorMessage: string;
  myEmail: string;
  starEmail: string;
  isLoading: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.getFormData();
  }

  getFormData() {
    this.authForm = this.fb.group({
      email: [''],
    });
  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }
  submit() {
    this.submitted = true;
    this.isLoading = true;
    this.isResendActive = false;

    this.errorMessage = '';
    console.log(this.submitted);
    if (this.authForm.invalid) {
      this.isLoading = false;
      return window.scroll(0, 0);
    }
    this.authService
      .ForgetPassword({}, this.authForm.value.email)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          this.isLoading = false;

          this.myEmail = this.authForm.value.email;
          this.isCheckMail = true;

          let email = this.authForm.value.email;
          let firstChar = email.substring(0, 1);
          let domain = email.substring(
            email.indexOf('@') + 1,
            email.indexOf('.')
          );
          let dot = email.substring(email.indexOf('.'));
          let lastChar = email.substring(
            email.indexOf('@') - 1,
            email.indexOf('@')
          );
          let dFirstChar = domain.substring(0, 1);
          let dLastChar = domain.slice(-1);

          this.starEmail =
            firstChar +
            '*****' +
            lastChar +
            '@' +
            dFirstChar +
            '*****' +
            dLastChar +
            dot;
          console.log(this.starEmail);

          this.TickTock();
        } else {
          this.isLoading = false;
          this.errorMessage = response.Errors[0].ErrorMessageEn;

          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }
  public seconds60: number = 60;
  public tickTock: any;
  isResendActive: boolean;
  TickTock() {
    this.isResendActive = false;

    this.seconds60 = 60;
    this.tickTock = setInterval(() => {
      this.seconds60 = this.seconds60 - 1;
      // this.seconds.nativeElement.innerText = this.seconds60;
      if (this.seconds60 == 0) {
        clearInterval(this.tickTock);
        this.isResendActive = true;
      }
    }, 1000);
  }
}
