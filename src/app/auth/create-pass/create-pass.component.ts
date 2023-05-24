import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { PasswordValidator } from './services/password.validator';
import { ModalConfirmCreateComponent } from './modal-confirm-create/modal-confirm-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatPassService } from './services/creat-pass.service';
@Component({
  selector: 'app-create-pass',
  templateUrl: './create-pass.component.html',
  styleUrls: ['./create-pass.component.scss'],
})
export class CreatePassComponent {
  formActive: FormGroup;

  userId: any;
  mobile: any;
  errorMessage: any;
  IsshowPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private creatPassService: CreatPassService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}
  submitted = false;

  ngOnInit(): void {
    this.remveDataIsExist();
    this.getForm();

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.userId = params['userId'];
      this.mobile = params['mobile'];
      console.log(this.userId);
      // this.GetUserDetails();
    });

    setTimeout(() => {
      this.formActive.get('Mobile')?.patchValue('');
      this.formActive.get('Mobile')?.patchValue(this.mobile);
      this.formActive.get('Password')?.patchValue('');
      this.formActive.get('UserId')?.patchValue(this.userId);
    }, 1000);
  }

  getForm() {
    this.formActive = this.fb.group({
      UserId: 0,
      Mobile: [''],
      Password: ['', PasswordValidator.strong],
      PasswordConfirm: [''],
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formActive.controls;
  }

  CreatePassword() {
    this.submitted = true;

    if (this.formActive.invalid) {
      return window.scroll(0, 0);
    }

    // this.formGroup.get('UserId')?.patchValue(Number(this.userId));

    // this.formGroup
    //   .get('PasswordConfirm')
    //   ?.patchValue(this.formGroup.get('Password')?.value);

    const formData = new FormData();
    const uid = +this.userId;
    formData.append('UserId', this.userId);
    formData.append('Mobile', this.formActive.get('Mobile')?.value);
    formData.append('Password', this.formActive.get('Password')?.value);
    formData.append('PasswordConfirm', this.formActive.get('Password')?.value);

    console.log(formData);
    return this.creatPassService
      .CreatePassword(formData)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          // Your passwod successfully created, you can login to your account through markazia system now...
          const modalRef = this.modalService.open(ModalConfirmCreateComponent);
          modalRef.componentInstance.name = 'edit';
          console.log(response);
        } else {
          this.errorMessage = response.Errors || response.errors;
        }
      });
  }
  GetUserDetails() {
    this.creatPassService
      .GetUserDetails(this.userId)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          const userDetails = response.data;
          this.formActive.get('Mobile').patchValue(userDetails.mobile);
        }
      });
  }

  showPassword() {
    this.IsshowPassword = this.IsshowPassword == false ? true : false;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalConfirmCreateComponent);
    modalRef.componentInstance.name = 'edit';
  }

  remveDataIsExist() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    localStorage.removeItem('userid');
    localStorage.removeItem('branch');
    localStorage.removeItem('city');
    localStorage.removeItem('register');
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');

    // localStorage.removeItem('identity');
    // localStorage.removeItem('password');
    // localStorage.removeItem('rememberMe');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
  }
}
