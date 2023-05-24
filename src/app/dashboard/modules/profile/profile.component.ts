import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../../services/general.service';
import { HeaderService } from '../../../services/header.service';
import { SharedService } from '../../../services/shared.service';
import { ModalMessageComponent } from '../../../shared/components/modal-message/modal-message.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  formGroup: FormGroup;

  submitted = false;
  userDetails: any;
  isLoading: boolean;
  constructor(
    private generalService: GeneralService,
    public sharedService: SharedService,
    public headerService: HeaderService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.headerService.setTitle('Profile');
    this.getForm();
    this.GetUserDetails();
    this.formGroup.controls['fullName'].disable();
    this.formGroup.controls['mobile'].disable();
  }

  getForm() {
    this.formGroup = this.fb.group({
      userId: '',
      fullName: '',
      mobile: '',
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  GetUserDetails() {
    this.generalService
      .GetUserDetails(+this.sharedService.getUserId)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.userDetails = response.data;
          if (this.userDetails) {
            this.formGroup
              .get('userId')
              .patchValue(this.sharedService?.getUserId);
            this.formGroup
              .get('fullName')
              .patchValue(this.userDetails.fullName);
            this.formGroup.get('mobile').patchValue(this.userDetails?.mobile);
          }
        }
      });
  }
  fullName: string;
  mobile: string;

  EditUser() {
    console.log(this.formGroup.value);
    this.generalService
      .EditUser(this.formGroup.value)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.formGroup.controls['fullName'].disable();
          this.isShowFullName = false;
          this.formGroup.controls['mobile'].disable();
          this.isShowmobile = false;

          const modalRef = this.modalService.open(ModalMessageComponent);
          modalRef.componentInstance.type = 'success';
          modalRef.componentInstance.message = 'Updated successfully';
          modalRef.componentInstance.routeName = '/profile';
        }
      });
  }
  isShowFullName: boolean = false;
  editfullname() {
    if (this.isShowFullName == false) {
      this.formGroup.controls['fullName'].enable();
      this.isShowFullName = true;
    } else {
      this.formGroup.controls['fullName'].disable();
      this.isShowFullName = false;
    }
  }

  isShowmobile: boolean = false;

  editfmobile() {
    if (this.isShowmobile == false) {
      this.formGroup.controls['mobile'].enable();
      this.isShowmobile = true;
    } else {
      this.formGroup.controls['mobile'].disable();
      this.isShowmobile = false;
    }
  }
}
